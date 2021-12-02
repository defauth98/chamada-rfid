import React, { useEffect, useState } from 'react';
import {
  Container,
  Button,
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';

import api from '../services/api';
import { ClassroomType } from '../types';
import moment from 'moment';
import Header from '../components/Header';
import { useAuth } from '../contexts/userContext';
import { useHistory } from 'react-router';

export default function Home() {
  const [classRooms, setClassRooms] = useState<[ClassroomType] | []>([]);
  const [inicio, setInicio] = useState(false);
  const [fechar, setFechar] = useState(false);
  const [error, setError] = useState(false);

  async function getClassrooms() {
    const token = localStorage.getItem('token');

    if (token) {
      const response = await api.get('/classrooms', {
        headers: {
          Authorization: token,
        },
      });

      setClassRooms(response.data.data);
    }
  }

  async function handleInitRoom(classroom: string) {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const response = await api.post(
          '/embedded',
          {
            method: '<INIT>',
            classroom,
          },
          {
            headers: {
              Authorization: token,
            },
          }
        );

        if (response.data) {
          setInicio(true);

          setTimeout(() => {
            setInicio(false);
          }, 3000);
        }
      } catch (error) {
        setError(true);

        setTimeout(() => {
          setError(false);
        }, 4000);
      }
    }
  }
  async function handleStopRoom(classroom: string) {
    const token = localStorage.getItem('token');

    try {
      if (token) {
        const response = await api.post(
          '/embedded',
          {
            method: '<CLOSE>',
            classroom,
          },
          {
            headers: {
              Authorization: token,
            },
          }
        );

        if (response.data) {
          setFechar(true);

          setTimeout(() => {
            setFechar(false);
          }, 3000);
        }
      }
    } catch (error) {
      setError(true);

      setTimeout(() => {
        setError(false);
      }, 4000);
    }
  }

  useEffect(() => {
    getClassrooms();
  }, []);

  return (
    <>
      <Header />

      <Container maxW="container.lg" height="80vh" padding="1rem">
        {inicio && (
          <Alert status="success" marginBottom="1rem">
            <AlertIcon />
            Chamada iniciada
          </Alert>
        )}

        {fechar && (
          <Alert status="info" marginBottom="1rem">
            <AlertIcon />
            Chamada fechada
          </Alert>
        )}

        {error && (
          <Alert status="info" marginBottom="1rem">
            <AlertIcon />
            Erro ao conectar com a API
          </Alert>
        )}

        <Box>
          <Heading as="h2" size="lg" marginTop="1rem">
            Sistema de chamadas RFID
          </Heading>

          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Nome da sala</Th>
                <Th>Horário da aula</Th>
                <Th>Quantidade de alunos</Th>
                <Th>Iniciar</Th>
                <Th>Fechar</Th>
              </Tr>
            </Thead>
            <Tbody>
              {classRooms.length > 0 &&
                classRooms.map((classRoom: ClassroomType) => {
                  return (
                    <Tr key={classRoom._id}>
                      <Td>{classRoom.name}</Td>
                      <Td>
                        {moment(classRoom.createdAt).format(
                          'DD/MM/yyyy HH:mm:ss'
                        )}
                      </Td>
                      <Td>0</Td>
                      <Td>
                        <Button
                          onClick={() =>
                            classRoom._id && handleInitRoom(classRoom._id)
                          }
                        >
                          Iniciar
                        </Button>
                      </Td>
                      <Td>
                        <Button
                          onClick={() =>
                            classRoom._id && handleStopRoom(classRoom._id)
                          }
                        >
                          Fechar
                        </Button>
                      </Td>
                    </Tr>
                  );
                })}
            </Tbody>
          </Table>
        </Box>
      </Container>
    </>
  );
}
