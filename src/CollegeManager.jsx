// CollegeManager.jsx
import React, { useEffect, useState } from 'react';
import {
  Box, Input, Button, VStack, HStack, Text, useToast
} from '@chakra-ui/react';
import axios from 'axios';
import Layout from './component/Layout';

const API_URL = 'https://krishnabackend-389286764509.asia-south1.run.app/college'; // adjust if different

const CollegeManager = () => {
  const [colleges, setColleges] = useState([]);
  const [name, setName] = useState('');
  const [editingId, setEditingId] = useState(null);
  const toast = useToast();

  const fetchColleges = async () => {
    const res = await axios.get(API_URL);
    setColleges(res.data);
  };

  const handleCreateOrUpdate = async () => {
    if (!name) return;

    try {
      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, { name });
        toast({ title: 'College updated.', status: 'success' });
      } else {
        await axios.post(API_URL, { name });
        toast({ title: 'College added.', status: 'success' });
      }

      setName('');
      setEditingId(null);
      fetchColleges();
    } catch (err) {
      toast({ title: 'Error', description: err.response?.data?.error || 'Failed', status: 'error' });
    }
  };

  const handleEdit = (college) => {
    setName(college.name);
    setEditingId(college._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      toast({ title: 'College deleted.', status: 'info' });
      fetchColleges();
    } catch (err) {
      toast({ title: 'Delete failed.', status: 'error' });
    }
  };

  useEffect(() => {
    fetchColleges();
  }, []);

  return (
    <Layout>
    <Box maxW="500px" mx="auto" mt={10} p={5} borderWidth={1} borderRadius="lg">
      <VStack spacing={4}>
        <Input
          placeholder="College Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button colorScheme="blue" onClick={handleCreateOrUpdate}>
          {editingId ? 'Update College' : 'Add College'}
        </Button>

        <Box w="100%" borderTop="1px solid lightgray" pt={4}>
          {colleges.map((college) => (
            <HStack key={college._id} justify="space-between">
              <Text>{college.name}</Text>
              <HStack>
                <Button size="sm" colorScheme="yellow" onClick={() => handleEdit(college)}>
                  Edit
                </Button>
                <Button size="sm" colorScheme="red" onClick={() => handleDelete(college._id)}>
                  Delete
                </Button>
              </HStack>
            </HStack>
          ))}
        </Box>
      </VStack>
    </Box>
    </Layout>
  );
};

export default CollegeManager;
