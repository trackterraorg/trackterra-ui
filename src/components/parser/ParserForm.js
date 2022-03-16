import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import { AccAddress } from '@terra-money/terra.js';
import { useNavigate } from 'react-router-dom';
// material
import { Box, Stack, TextField, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import _ from 'lodash';
import useAxios from 'axios-hooks';
import { apiOptions } from '../../utils/apiSettings';
import Loading from '../Loading';
import ParsingStatus from '../../common/parsing-status.enum';
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
  const navigate = useNavigate();
  const ParserSchema = Yup.object().shape({
    address: Yup.string()
      .required('Account address is required!')
      .test('is-terra-account', 'Please enter a valid terra account', (value) =>
        AccAddress.validate(value)
      )
  });

  const [{ data, loading, error }, parseWallet] = useAxios(
    apiOptions({
      method: 'PUT',
      timeout: 600000
    }),
    { manual: true }
  );
  const [parsingStatus, setParsingStatus] = useState(ParsingStatus.Idle);
  const [parsingMsg, setParsingMsg] = useState('');

  useEffect(() => {
    if (data) {
      setParsingStatus(parseInt(data.status, 10));
      setParsingMsg(data.msg);
    }
  }, [data]);

  const formik = useFormik({
    initialValues: {
      address: ''
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
      const { address } = formik.values;
      if (address) {
        setParsingStatus(() => ParsingStatus.Parsing);
        setParsingMsg(() => 'Parsing txs, please wait ....');
        parseWallet({ url: `/wallets/parse/${address}` });
      }
    }
  };

  const parseNewAccount = () => {
    setParsingStatus(ParsingStatus.Idle);
    formik.resetForm();
  };

  const goToDashBoard = () => {
    const { address } = formik.values;
    navigate(`/account/${address}/dashboard`, { replace: true });
  };

  const loadingForm = <Loading msg={parsingMsg} />;

  if (loading || parsingStatus === ParsingStatus.Parsing) return loadingForm;
  if (error) return `Submission error! ${error.message}`;

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
          Parsing completed
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

  return (
    (parsingStatus === ParsingStatus.Idle && parsingForm) ||
    (parsingStatus === ParsingStatus.Done && successForm) ||
    (parsingStatus === ParsingStatus.Fail && failForm)
  );
}
