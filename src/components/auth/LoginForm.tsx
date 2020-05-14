import { Box, Button, Input, Stack, Text } from '@chakra-ui/core';
import { useState } from 'react';
import { useLogin } from '../../graphql/users/users.hooks';
import { GoogleAuthButton } from './GoogleAuthButton';
import { PasswordInput } from '@lib';

export const LoginForm: React.FC<{
  onSuccessfulLogin?: () => void;
}> = ({ onSuccessfulLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error } = useLogin();
  return (
    <Stack spacing={6} textAlign="center">
      <Text fontSize="xl">Using Third Parties</Text>
      <Stack spacing={2} textAlign="center" onClick={(e) => e.stopPropagation()}>
        <GoogleAuthButton
          buttonText="Login with Google"
          onSuccessfulLogin={() => {
            if (onSuccessfulLogin) onSuccessfulLogin();
          }}
          onFailedLogin={() => console.error('')}
          onFailure={() => {}}
        />
      </Stack>
      <Stack spacing={2}>
        <Text fontSize="xl">With Email and Password</Text>
        <Input
          placeholder="Email"
          size="md"
          variant="flushed"
          value={email}
          onChange={(e: any) => setEmail(e.target.value)} // TODO Why event type not inferred ?
        />
        <PasswordInput value={password} onChange={(e: any) => setPassword(e.target.value)} />
      </Stack>
      <Button
        size="lg"
        variant="solid"
        onClick={async () => {
          await login({ variables: { email, password } });
          if (onSuccessfulLogin) onSuccessfulLogin();
        }}
      >
        Login
      </Button>
      {!!error && (
        <Box color="red.500" fontSize="xl">
          Invalid credentials
        </Box>
      )}
    </Stack>
  );
};
