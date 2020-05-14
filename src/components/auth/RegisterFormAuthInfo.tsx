import { Button, Divider, FormControl, FormErrorMessage, FormLabel, Input, Stack, Text } from '@chakra-ui/core';
import { useState } from 'react';
import { validateEmail } from '../../util/email.util';
import { PasswordInput } from '../lib/inputs/PasswordInput';
import { GoogleAuthButton } from './GoogleAuthButton';

type GoogleAuthInfo = {
  type: 'google';
  email: string;
  name: string;
  id_token: string;
};

type BasicAuthInfo = {
  type: 'basic';
  email: string;
  password: string;
};

export type RegisterAuthInfo = GoogleAuthInfo | BasicAuthInfo;

interface RegisterFormAuthInfoProps {
  onNext: (info: RegisterAuthInfo) => void;
  onSuccessfulLogin: () => void;
}

export const RegisterFormAuthInfo: React.FC<RegisterFormAuthInfoProps> = ({ onNext, onSuccessfulLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isEmailValid = validateEmail(email);
  const isPasswordValid = password.length >= 6;

  return (
    <Stack spacing={6} textAlign="center">
      <Text fontSize="xl">Using Third Parties</Text>
      <Stack spacing={2} textAlign="center" onClick={(e) => e.stopPropagation()}>
        <GoogleAuthButton
          buttonText="Register with Google"
          onSuccessfulLogin={onSuccessfulLogin}
          onFailedLogin={(googleUser) => {
            const profile = googleUser.getBasicProfile();
            onNext({
              type: 'google',
              id_token: googleUser.getAuthResponse().id_token,
              email: profile.getEmail(),
              name: profile.getName(),
            });
          }}
          onFailure={() => {}}
        />
      </Stack>
      <Text fontSize="xl">Or with email and password</Text>
      <Divider />
      <FormControl isRequired isInvalid={!!email && !isEmailValid}>
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input
          id="email"
          placeholder="example@domain.com"
          size="md"
          variant="flushed"
          value={email}
          onChange={(e: any) => setEmail(e.target.value)} // TODO Why event type not inferred ?
        />
      </FormControl>
      <FormControl isRequired isInvalid={!!password && !isPasswordValid}>
        <FormLabel htmlFor="password">Password</FormLabel>
        <PasswordInput value={password} onChange={(e: any) => setPassword(e.target.value)} />
        <FormErrorMessage>The password must be at least 6 characters long</FormErrorMessage>
      </FormControl>
      <Button
        isDisabled={!password || !isPasswordValid || !email || !isEmailValid}
        size="lg"
        variant="solid"
        onClick={() => {
          onNext({
            type: 'basic',
            email,
            password,
          });
        }}
      >
        Next
      </Button>
    </Stack>
  );
};
