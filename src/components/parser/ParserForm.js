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
import { ConnectWalletButton } from '../wallet';
import { apiOptions } from '../../utils/apiSettings';
import Loading from '../Loading';
import ParsingStatus from '../../common/parsing-status.enum';
import chains from '../../data/chains';
import ErrorMessage from '../ErrorMessage';
import SuccessMessage from '../SuccessMessage';
import InfoMessage from '../InfoMessage';
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

export default function ParserForm() {
  const [{ response, loading, error }, parseWallet] = useAxios(
    apiOptions({
      method: 'PUT',
      timeout: 3600000
    }),
    { manual: true }
  );
  const [parsingStatus, setParsingStatus] = useState(ParsingStatus.Idle);
  const [parsingMsg, setParsingMsg] = useState('Wallet is parsing');

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

    formik.setTouched({
      address: true,
      chain: true
    });

    formik.validateForm().then((result) => {
      if (!_.isEmpty(result)) {
        return;
      }
      const { address: fAddress, chain: fChain } = formik.values;
      setParsingStatus(() => ParsingStatus.Parsing);
      setParsingMsg(() => '');
      if (fChain && fAddress) {
        parseWallet({
          url: `/wallets/parse`,
          params: {
            chain: fChain,
            address: fAddress
          }
        });
      }
    });
  };

  const onUseWallet = (chain, address) => {
    formik.setValues({
      chain,
      address
    });
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
          Start by entering your account address manually
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

            <ConnectWalletButton onUseWallet={onUseWallet} />

            <Button color="secondary" fullWidth size="large" type="submit" variant="contained">
              Start Parsing
            </Button>
          </Stack>
        </Form>
      </FormikProvider>
    </FormStyle>
  );

  const successForm = (
    <FormStyle>
      <SuccessMessage msg={parsingMsg} />
      <Button
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        onClick={goToDashBoard}
        sx={{ mx: 2 }}
      >
        Go to dashboard
      </Button>
      <Button
        color="info"
        fullWidth
        size="large"
        variant="contained"
        sx={{ mx: 2, mt: 5 }}
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

  if (loading) return loadingForm;

  if (error) {
    // cloud flare error
    if (error.response.status === 524) {
      return <InfoMessage msg="Might take longer than expected. Please come back in 5 minutes!" />;
    }

    return <ErrorMessage msg={`Submission error! ${error.message}`} />;
  }

  if (parsingStatus === ParsingStatus.Idle) {
    return parsingForm;
  }

  if (parsingStatus === ParsingStatus.Fail) {
    return failForm;
  }

  if (parsingStatus === ParsingStatus.Done) {
    return successForm;
  }

  return loadingForm;
}
