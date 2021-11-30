import React, { useEffect, useState } from 'react';
import {
  Container,
  Input,
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

export default function Home() {
  const [classRooms, setClassRooms] = useState<[ClassroomType] | []>([]);

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

  // function initializeClassroom(id: string) {
  //   console.log(id);
  // }

  useEffect(() => {
    getClassrooms();
  }, []);

  useEffect(() => {
    console.log({ classRooms });
  }, [classRooms]);

  return (
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
            </Tr>
          </Thead>
          <Tbody>
            {classRooms.length > 0 &&
              classRooms.map((classRoom: ClassroomType) => {
                console.log(classRoom);

                return (
                  <Tr>
                    <Td>{classRoom.name}</Td>
                    <Td>
                      {moment(classRoom.createdAt).format(
                        'DD-MM-yyyy HH:mm:ss'
                      )}
                    </Td>
                    <Td>0</Td>
                    <Td>
                      <Button>Iniciar</Button>
                    </Td>
                  </Tr>
                );
              })}
          </Tbody>
        </Table>
      </Box>
    </Container>
  );
}
