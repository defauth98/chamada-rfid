import React, { useState } from 'react';
import {
  Container,
  Input,
  Button,
  Box,
  Text,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';

import Header from '../components/Header';
import api from '../services/api';
import { useAuth } from '../contexts/userContext';
import { useHistory } from 'react-router';

export default function Create() {
  const [roomName, setRooName] = useState('');
  const [status, setStatus] = useState(false);

  const history = useHistory();

  const { user } = useAuth();

  async function handleCreateRoom() {
    const token = localStorage.getItem('token');

    if (token) {
      const reponse = await api.post(
        '/classrooms',
        {
          professor: user?._id,
          name: roomName,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (reponse.data) {
        setStatus(true);
        history.push('/home');
      }
    }
  }

  return (
    <>
      <Header />
      {status && (
        <Alert status="success">
          <AlertIcon />
          Sala criada
        </Alert>
      )}
      <Container
        maxW="container.lg"
        height="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Box>
          <Text textAlign="center" fontSize="1.5rem" marginBottom="1rem">
            Criar uma sala
          </Text>
          <Input
            placeholder="Nome da sala"
            marginBottom="1rem"
            value={roomName}
            onChange={(event) => setRooName(event.target.value)}
          />
          <Button width="100%" onClick={handleCreateRoom}>
            Criar sala
          </Button>
        </Box>
      </Container>
    </>
  );
}
