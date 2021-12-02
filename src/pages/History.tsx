import Header from '../components/Header';

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
import { useAuth } from '../contexts/userContext';
import { useHistory } from 'react-router';

export default function History() {
  const [classRooms, setClassRooms] = useState<[ClassroomType] | []>([]);

  const { user, handleSetProfessor, handleClassroom } = useAuth();
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

  async function handleNavigateToClassroomDetail(
    classroom: string,
    professorId: string
  ) {
    handleSetProfessor(professorId);
    history.push(`/details/${classroom}`);
  }

  useEffect(() => {
    getClassrooms();
  }, []);

  return (
    <>
      <Header />
      <Container maxW="container.lg" height="90vh" padding="1rem">
        <Box>
          <Heading as="h2" size="lg" marginTop="1rem">
            Histórico de chamadas
          </Heading>

          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Nome da sala</Th>
                <Th>Alunos presentes</Th>
                <Th>Editar</Th>
              </Tr>
            </Thead>
            <Tbody>
              {classRooms.length > 0 &&
                classRooms.map((classRoom: ClassroomType) => {
                  return (
                    <Tr key={classRoom._id}>
                      <Td>{classRoom.name}</Td>
                      <Td>0</Td>
                      <Td>
                        <Button
                          onClick={() => {
                            handleClassroom(classRoom);

                            if (classRoom._id && classRoom.professor) {
                              handleNavigateToClassroomDetail(
                                classRoom._id,
                                classRoom.professor
                              );
                            }
                          }}
                        >
                          Detalhes
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
