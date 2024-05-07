'use client';

import * as React from 'react';
import RouterLink from 'next/link';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Controller, useForm } from 'react-hook-form';
import { z as zod } from 'zod';
import { styled } from '@mui/material/styles';

//import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import { paths } from '@/paths';
import { authClient } from '@/lib/auth/client';
import { useUser } from '@/hooks/use-user';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { TextField } from '@mui/material';

const schema = zod.object({
  firstName: zod.string().min(1, { message: 'İlk isim zorunlu bir alan' }),
  lastName: zod.string().min(1, { message: 'Soy isim zorunlu bir alan' }),
  email: zod.string().min(1, { message: 'E-posta adresi zorunlu bir alan' }).email(),
  password: zod.string().min(6, { message: 'Şifrenizin uzunluğu en az 6 olmalıdır' }),
  terms: zod.boolean().refine((value) => value, 'Aydınlatma metnini kabul etmelisiniz'),
  // document: zod.any().optional(), // Considering file upload is optional
});

type Values = zod.infer<typeof schema>;

const defaultValues: Values = { firstName: '', lastName: '', email: '', password: '', terms: false } satisfies Values;

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export function SignUpForm(): React.JSX.Element {
  const router = useRouter();

  const { checkSession } = useUser();

  const [isPending, setIsPending] = React.useState<boolean>(false);
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);

  const [fileName, setFileName] = React.useState<string | null>(null);

  const [tabIndex, setTabIndex] = React.useState(0);

  const {
    control,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm<Values>({ defaultValues, resolver: zodResolver(schema) });

  const onSubmit = React.useCallback(
    async (values: Values): Promise<void> => {
      setIsPending(true);

      const { error } = await authClient.signUp(values);

      console.log("signed up");

      if (error) {
        setError('root', { type: 'server', message: error });
        setIsPending(false);
        return;
      }

      if (tabIndex === 1) {
        const { error: upload_error } = await authClient.uploadDieticianFile(selectedFile!, values.email);
        if (upload_error) {
          setError('root', { type: 'server', message: upload_error });
          setIsPending(false);
          return;
        }
      }

      // Refresh the auth state
      // await checkSession?.();

      // UserProvider, for this case, will not refresh the router
      // After refresh, GuestGuard will handle the redirect
      router.push('/auth/sign-in');
    },
    [checkSession, router, setError, tabIndex, selectedFile]
  );

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <Stack spacing={3}>
      <Stack spacing={1}>
        <Typography variant="h4">Hesap aç</Typography>
        <Typography color="text.secondary" variant="body2">
          Hesabım var.{' '}
          <Link component={RouterLink} href={paths.auth.signIn} underline="hover" variant="subtitle2">
            Oturum Aç
          </Link>
        </Typography>
      </Stack>

      <Tabs value={tabIndex} onChange={handleTabChange} aria-label="sign-up form tabs">
        <Tab label="DANIŞAN" />
        <Tab label="DİYETİSYEN" />
      </Tabs>

      {/* You can now conditionally render form sections based on the selected tab */}
      {tabIndex === 0 && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <Controller
              control={control}
              name="firstName"
              render={({ field }) => (
                <FormControl error={Boolean(errors.firstName)}>
                  <InputLabel>İlk isim</InputLabel>
                  <OutlinedInput {...field} label="İlk isim" />
                  {errors.firstName ? <FormHelperText>{errors.firstName.message}</FormHelperText> : null}
                </FormControl>
              )}
            />
            <Controller
              control={control}
              name="lastName"
              render={({ field }) => (
                <FormControl error={Boolean(errors.firstName)}>
                  <InputLabel>Soy isim</InputLabel>
                  <OutlinedInput {...field} label="Soy isim" />
                  {errors.firstName ? <FormHelperText>{errors.firstName.message}</FormHelperText> : null}
                </FormControl>
              )}
            />
            <Controller
              control={control}
              name="email"
              render={({ field }) => (
                <FormControl error={Boolean(errors.email)}>
                  <InputLabel>E-posta adresi</InputLabel>
                  <OutlinedInput {...field} label="E-posta adresi" type="email" />
                  {errors.email ? <FormHelperText>{errors.email.message}</FormHelperText> : null}
                </FormControl>
              )}
            />
            <Controller
              control={control}
              name="password"
              render={({ field }) => (
                <FormControl error={Boolean(errors.password)}>
                  <InputLabel>Şifre</InputLabel>
                  <OutlinedInput {...field} label="Şifre" type="password" />
                  {errors.password ? <FormHelperText>{errors.password.message}</FormHelperText> : null}
                </FormControl>
              )}
            />
            <Controller
              control={control}
              name="terms"
              render={({ field }) => (
                <div>
                  <FormControlLabel
                    control={<Checkbox {...field} />}
                    label={
                      <React.Fragment>
                        <Link>Aydınlatma metnini</Link> okudum ve kabul ediyorum.
                      </React.Fragment>
                    }
                  />
                  {errors.terms ? <FormHelperText error>{errors.terms.message}</FormHelperText> : null}
                </div>
              )}
            />
            {errors.root ? <Alert color="error">{errors.root.message}</Alert> : null}
            <Button disabled={isPending} type="submit" color="warning" variant="contained">
              Hesap Aç
            </Button>
          </Stack>
        </form>
      )}
      {tabIndex === 1 && (
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Dietitian Tab Content */}
          <Stack spacing={2}>
            <Controller
              control={control}
              name="firstName"
              render={({ field }) => (
                <FormControl error={Boolean(errors.firstName)}>
                  <InputLabel>İlk isim</InputLabel>
                  <OutlinedInput {...field} label="İlk isim" />
                  {errors.firstName ? <FormHelperText>{errors.firstName.message}</FormHelperText> : null}
                </FormControl>
              )}
            />
            <Controller
              control={control}
              name="lastName"
              render={({ field }) => (
                <FormControl error={Boolean(errors.firstName)}>
                  <InputLabel>Soy isim</InputLabel>
                  <OutlinedInput {...field} label="Soy isim" />
                  {errors.firstName ? <FormHelperText>{errors.firstName.message}</FormHelperText> : null}
                </FormControl>
              )}
            />
            <Controller
              control={control}
              name="email"
              render={({ field }) => (
                <FormControl error={Boolean(errors.email)}>
                  <InputLabel>E-posta adresi</InputLabel>
                  <OutlinedInput {...field} label="E-posta adresi" type="email" />
                  {errors.email ? <FormHelperText>{errors.email.message}</FormHelperText> : null}
                </FormControl>
              )}
            />
            <Controller
              control={control}
              name="password"
              render={({ field }) => (
                <FormControl error={Boolean(errors.password)}>
                  <InputLabel>Şifre</InputLabel>
                  <OutlinedInput {...field} label="Şifre" type="password" />
                  {errors.password ? <FormHelperText>{errors.password.message}</FormHelperText> : null}
                </FormControl>
              )}
            />
            <Controller
              control={control}
              name="terms"
              render={({ field }) => (
                <div>
                  <FormControlLabel
                    control={<Checkbox {...field} />}
                    label={
                      <React.Fragment>
                        <Link>Aydınlatma metnini</Link> okudum ve kabul ediyorum.
                      </React.Fragment>
                    }
                  />
                  {errors.terms ? <FormHelperText error>{errors.terms.message}</FormHelperText> : null}
                </div>
              )}
            />
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              // startIcon={<CloudUploadIcon />}
            >
              Diploma yükle
              <VisuallyHiddenInput
                type="file"
                hidden
                onChange={(event: any) => {
                  if (event.target.files) {
                    console.log(event.target.files[0]);
                    setSelectedFile(event.target.files[0]);
                    const fileSizeInMB = (event.target.files[0].size / (1024*1024)).toFixed(2);
                    setFileName(event.target.files[0].name + ' (' + fileSizeInMB + ' MB)');
                  }
                }}
              />
            </Button>
            {fileName && (
              <TextField
                disabled
                variant="outlined"
                margin="normal"
                fullWidth
                value={fileName}
              />
            )}
            {errors.root ? <Alert color="error">{errors.root.message}</Alert> : null}
            <Button disabled={isPending} type="submit" color="warning" variant="contained">
              Hesap aç
            </Button>
          </Stack>
        </form>
      )}
      {/* <Alert color="warning">Created users are not persisted</Alert> */}
    </Stack>
  );
}
