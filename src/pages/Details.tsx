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
import { FrequencyType, UserType } from '../types';
import moment from 'moment';
import { useAuth } from '../contexts/userContext';
import { useHistory } from 'react-router';
import Loading from '../components/Loading';

export default function Detail() {
  const [frequencys, setFrequencys] = useState<FrequencyType[] | []>([]);
  const [loading, setLoading] = useState(false);

  const { user, classRoom } = useAuth();
  const history = useHistory();

  async function getFrequency() {
    setLoading(true);
    const token = localStorage.getItem('token');

    if (token) {
      const response = await api.get('/frequency', {
        headers: {
          Authorization: token,
        },
      });

      const usersResponse = response?.data?.data.map(
        async (frequency: FrequencyType) => {
          const currentUser = (await api.get(`/users/${frequency.user}`, {
            headers: {
              Authorization: token,
            },
          })) as any;

          return {
            ...frequency,
            userInfo: currentUser.data as UserType,
          } as FrequencyType;
        }
      ) as Promise<FrequencyType>[];

      const users = await Promise.all(usersResponse);

      setLoading(false);

      if (users) {
        setFrequencys(users);
      }
    }
  }

  useEffect(() => {
    getFrequency();
  }, []);

  return (
    <>
      <Header />
      <Container maxW="container.lg" height="100vh">
        <Box>
          <Heading as="h2" size="xl" marginTop="1rem">
            {classRoom?.name}
          </Heading>

          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Nome</Th>
                <Th>RA</Th>
                <Th>Data do registro</Th>
              </Tr>
            </Thead>
            <Tbody>
              {loading && (
                <Box margin="0 auto">
                  <Loading type="bars" color="black" />
                </Box>
              )}

              {frequencys.length > 0 &&
                frequencys.map((frequency: FrequencyType) => {
                  console.log(frequency);

                  return (
                    <Tr key={frequency._id}>
                      <Td>
                        {frequency?.userInfo?.name || frequency?.userInfo?.ra}
                      </Td>
                      <Td>{frequency?.userInfo?.ra}</Td>
                      <Td>
                        {moment(frequency.createdAt).format('DD/MM/yyyy HH:mm')}
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
