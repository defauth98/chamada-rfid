import { Container, Box } from '@chakra-ui/layout';
import { Link } from 'react-router-dom';
import { Text } from '@chakra-ui/react';

import React from 'react';
import { Button } from '@chakra-ui/button';
import { useAuth } from '../contexts/userContext';

export default function Header() {
  const { user, handleLogout } = useAuth();

  return (
    <Container bg="blue" maxW="container.4xl">
      <Container
        maxW="container.lg"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        height="6vh"
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          width="15%"
        >
          <Link to="/home">
            <Text color="white">Home</Text>
          </Link>
          <Link to="/History">
            <Text color="white">Histórico</Text>
          </Link>
        </Box>

        <Button onClick={handleLogout}>Sair</Button>
      </Container>
    </Container>
  );
}
