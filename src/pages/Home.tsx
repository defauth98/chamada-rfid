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
} from '@chakra-ui/react';
import api from '../services/api';
import { ClassroomType } from '../types';
import moment from 'moment';
import Header from '../components/Header';
import { useAuth } from '../contexts/userContext';
import { useHistory } from 'react-router';

export default function Home() {
  const [classRooms, setClassRooms] = useState<[ClassroomType] | []>([]);

  const { user, handleClassroom } = useAuth();
  const history = useHistory();

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

      console.log({ response });
    }
  }
  async function handleStopRoom(classroom: string) {
    const token = localStorage.getItem('token');

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

      console.log({ response });
    }
  }

  useEffect(() => {
    getClassrooms();
  }, []);

  return (
    <>
      <Header />
      <Container maxW="container.lg" height="100vh">
        <Box>
          <Heading as="h2" size="xl" marginTop="1rem">
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
