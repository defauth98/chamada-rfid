import React, { useEffect, useState } from 'react';
import { Container, Input, Button, Box } from '@chakra-ui/react';
import api from '../services/api';
import { useHistory } from 'react-router';
import { useAuth } from '../contexts/userContext';
import Loading from '../components/Loading';

export default function Login() {
  const [ra, setRa] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();
  const { handleLogin, user, loading } = useAuth();

  useEffect(() => {
    if (user && user._id) {
      history.push('/home');
    }
  }, [user]);

  if (loading)
    return (
      <Container
        maxW="container.lg"
        height="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Loading type="balls" color="#000" />;
      </Container>
    );

  return (
    <Container
      maxW="container.lg"
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDir="column"
    >
      <Box
        w="40%"
        h="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDir="column"
      >
        <Input
          placeholder="ra"
          marginBottom="0.5rem"
          value={ra}
          onChange={(event) => setRa(event.target.value)}
        />
        <Input
          placeholder="password"
          marginBottom="0.5rem"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          type="password"
        />
        <Button width="100%" onClick={() => handleLogin(ra, password)}>
          Login
        </Button>
      </Box>
    </Container>
  );
}
