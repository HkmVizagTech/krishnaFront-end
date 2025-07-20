import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Spinner,
  Text,
  Button,
  Flex,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Layout from "./component/Layout";

const AttendanceList = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const res = await axios.get("https://krishnapulsebackend-389286764509.asia-south1.run.app/api/attendance-list");
        setCandidates(res.data);
      } catch (err) {
        console.error("Error fetching attendance list:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, []);

  return (
    <Layout>
    <Box maxW="6xl" mx="auto" mt={10} p={5}>
      <Flex justify="space-between" align="center" mb={6}>
        <Heading size="lg">✅ Attendance List</Heading>
        <Button colorScheme="blue" onClick={() => navigate(-1)}>
          Go Back
        </Button>
      </Flex>

      {loading ? (
        <Spinner size="xl" />
      ) : candidates.length === 0 ? (
        <Text>No attendees marked yet.</Text>
      ) : (
        <Table variant="simple" size="md">
          <Thead bg="gray.100">
            <Tr>
              <Th>Name</Th>
              <Th>Gender</Th>
              <Th>College</Th>
              <Th>WhatsApp Number</Th>
              <Th>Payment Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {candidates.map((candidate) => (
              <Tr key={candidate._id}>
                <Td>{candidate.name}</Td>
                <Td>{candidate.gender}</Td>
                <Td>{candidate.college}</Td>
                <Td>{candidate.whatsappNumber}</Td>
                <Td>{candidate.paymentStatus}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </Box>
    </Layout>
  );
};

export default AttendanceList;
