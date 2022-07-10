import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import { AccAddress } from '@terra-money/terra.js';
// material
import {
  Box,
  Stack,
  TextField,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText
} from '@mui/material';
import { styled } from '@mui/material/styles';
import useAxios from 'axios-hooks';
import _ from 'lodash';
import { apiOptions } from '../../utils/apiSettings';
import Loading from '../Loading';
import ParsingStatus from '../../common/parsing-status.enum';
import chains from '../../data/chains';
// ----------------------------------------------------------------------
const FormStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));

// ----------------------------------------------------------------------

export default function ParserForm() {
  const ParserSchema = Yup.object().shape({
    chain: Yup.string()
      .required('Chain is required!')
      .test(
        'is-chain-provided',
        'Please select a valid chain',
        (value) => !_.isEmpty(_.find(chains), { value })
      ),
    address: Yup.string()
      .required('Account address is required!')
      .test('is-terra-account', 'Please enter a valid terra account', (value) =>
        AccAddress.validate(value)
      )
  });

  const [{ response, loading, error }, parseWallet] = useAxios(
    apiOptions({
      method: 'PUT',
      timeout: 600000
    }),
    { manual: true }
  );
  const [parsingStatus, setParsingStatus] = useState(ParsingStatus.Idle);
  const [parsingMsg, setParsingMsg] = useState('');

  useEffect(() => {
    if (response) {
      const { data } = response.data;
      setParsingStatus(parseInt(data.status, 10));
      setParsingMsg(data.msg);
    }
  }, [response]);

  const formik = useFormik({
    initialValues: {
      address: '',
      chain: ''
    },
    validationSchema: ParserSchema,
    onSubmit: () => {}
  });

  const { errors, touched, isSubmitting, getFieldProps } = formik;

  const handleSubmitParseWalletForm = () => {
    if (isSubmitting) {
      return;
    }

    formik.handleSubmit();
    if (formik.isValid) {
      const { address, chain } = formik.values;
      if (address && chain) {
        setParsingStatus(() => ParsingStatus.Parsing);
        setParsingMsg(() => 'Parsing txs, please wait ....');
        parseWallet({
          url: `/wallets/parse`,
          params: {
            chain,
            address
          }
        });
      }
    }
  };

  const parseNewAccount = () => {
    setParsingStatus(ParsingStatus.Idle);
    formik.resetForm();
  };

  const goToDashBoard = () => {
    const { address, chain } = formik.values;
    window.location.replace(`/account/${_.lowerCase(chain)}/${address}/dashboard`);
  };

  const loadingForm = <Loading msg={parsingMsg} />;
  const parsingForm = (
    <FormStyle>
      <Box sx={{ mb: 5 }}>
        <Typography variant="h4" gutterBottom>
          Enter your account address
        </Typography>
        <Typography sx={{ color: 'text.secondary' }}>
          Start by entering your account address below
        </Typography>
      </Box>
      <FormikProvider value={formik}>
        <Form
          autoComplete="off"
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmitParseWalletForm();
          }}
        >
          <Stack spacing={3}>
            <TextField
              fullWidth
              type="text"
              autoComplete="address"
              label="Account address"
              {...getFieldProps('address')}
              error={Boolean(touched.address && errors.address)}
              helperText={touched.address && errors.address}
            />

            <FormControl fullWidth error={Boolean(touched.chain && errors.chain)}>
              <InputLabel id="chain-helper-label">Chain</InputLabel>
              <Select
                labelId="chain-helper-label"
                id="demo-simple-select-helper"
                // value={age}
                {...getFieldProps('chain')}
                label="Chain"
              >
                {chains.map((chain) => (
                  <MenuItem key={chain.value} value={chain.label}>
                    {chain.label}
                  </MenuItem>
                ))}
              </Select>
              {Boolean(touched.chain && errors.chain) && (
                <FormHelperText>Chain is required!</FormHelperText>
              )}
            </FormControl>

            <Button color="secondary" fullWidth size="large" type="submit" variant="contained">
              Start parsing
            </Button>
          </Stack>
        </Form>
      </FormikProvider>
    </FormStyle>
  );

  const successForm = (
    <FormStyle>
      <Box sx={{ mb: 5 }}>
        <Typography variant="h4" gutterBottom>
          {parsingStatus === ParsingStatus.Parsing && 'Already Parsing'}
          {parsingStatus === ParsingStatus.Done && 'Parsing Completed'}
        </Typography>
        <Typography sx={{ color: 'text.secondary' }}>{parsingMsg}</Typography>
      </Box>
      <Button fullWidth size="large" type="submit" variant="contained" onClick={goToDashBoard}>
        Go to dashboard
      </Button>
      <Button
        color="info"
        fullWidth
        size="large"
        variant="contained"
        sx={{ mt: 5 }}
        onClick={() => {
          parseNewAccount();
        }}
      >
        Parse another wallet
      </Button>
    </FormStyle>
  );

  const failForm = (
    <FormStyle>
      <Box sx={{ mb: 5 }}>
        <Typography variant="h4" gutterBottom>
          Parsing Failed
        </Typography>
        <Typography sx={{ color: 'red' }}>{parsingMsg}</Typography>
      </Box>
      <Button
        color="info"
        fullWidth
        size="large"
        variant="contained"
        onClick={() => {
          parseNewAccount();
        }}
      >
        Parse another wallet
      </Button>
    </FormStyle>
  );

  const selectForm = () => {
    switch (parsingStatus) {
      case ParsingStatus.Idle:
        return parsingForm;
      case ParsingStatus.Fail:
        return failForm;
      case ParsingStatus.Done:
      case ParsingStatus.Parsing:
        return successForm;
      default:
        return loadingForm;
    }
  };

  if (loading) return loadingForm;
  if (error) return `Submission error! ${error.message}`;
  return selectForm();
}
