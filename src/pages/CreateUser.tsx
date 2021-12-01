import React, { useState } from 'react';
import {
  Container,
  Input,
  Button,
  Box,
  Text,
  Alert,
  AlertIcon,
  Select,
} from '@chakra-ui/react';

import Header from '../components/Header';
import api from '../services/api';
import { useHistory } from 'react-router';

export default function CreateUser() {
  const [ra, setRa] = useState('');
  const [rfid, setRfid] = useState('');
  const [major, setMajor] = useState('COMPUTACAO');
  const [role, setRole] = useState('PROFESSOR');
  const [status, setStatus] = useState(false);

  const history = useHistory();

  async function handleCreateUser() {
    const token = localStorage.getItem('token');

    if (token) {
      const reponse = await api.post(
        '/users',
        {
          major,
          ra,
          role,
          rfid,
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
        height="70vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Box>
          <Text textAlign="center" fontSize="1.5rem" marginBottom="1rem">
            Criar usuário
          </Text>
          RA
          <Input
            placeholder="RA"
            marginBottom="1rem"
            value={ra}
            onChange={(event) => setRa(event.target.value)}
          />
          RFID
          <Input
            placeholder="RFID"
            marginBottom="1rem"
            value={rfid}
            onChange={(event) => setRfid(event.target.value)}
          />
          Major
          <Select
            marginBottom="1rem"
            value={major}
            onChange={(event) => setMajor(event.target.value)}
          >
            <option value="COMPUTACAO">COMPUTAÇÃO</option>
            <option value="CIVIL">CIVIL</option>
            <option value="QUIMICA">QUÍMICA</option>
            <option value="PROFESSOR">PROFESSOR</option>
          </Select>
          Role
          <Select
            marginBottom="1rem"
            value={role}
            onChange={(event) => setRole(event.target.value)}
          >
            <option value="ROFESSOR">PROFESSOR</option>
            <option value="EMBEDDED">EMBEDDED</option>
            <option value="STUDENT">STUDENT</option>
          </Select>
          <Button width="100%" onClick={handleCreateUser}>
            Criar usuário
          </Button>
        </Box>
      </Container>
    </>
  );
}
