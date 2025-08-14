import React from 'react';
import image12 from './component/image.png';
import {
  Box,
  Text,
  Container,
  Heading,
  Image,
  Flex,
  VStack,
} from '@chakra-ui/react';
import { CalendarIcon, TimeIcon } from '@chakra-ui/icons';

const RegistrationClosed = () => {
  return (
    <Box minH="100vh" bg="gray.50" py={8}>
      <Container maxW="2xl" px={4}>
        {/* Header */}
        <Flex
          direction="row"
          align="center"
          justify="center"
          gap={6}
          mb={8}
          textAlign="left"
          flexWrap="wrap"
        >
          <Box
            boxSize={{ base: '120px', md: '200px' }}
            overflow="hidden"
            shadow="md"
            border="2px solid #ccc"
            flexShrink={0}
            bg="white"
          >
            <Image
              src={image12}
              alt="Krishna Pulse Logo"
              objectFit="contain"
              width="100%"
              height="100%"
            />
          </Box>

          <Box>
            <Heading
              fontSize={{ base: '2xl', md: '3xl' }}
              color="black"
              fontWeight="bold"
              align="center"
            >
              AU PRE-JANMASTHAMI FESTIVAL
            </Heading>
            <Text
              fontSize={{ base: 'md', md: 'lg' }}
              color="gray.700"
              fontWeight="semibold"
              mt={2}
              textAlign={{ base: 'center' }}
            >
              A Fest of Fun, Faith & Freedom
            </Text>
          </Box>
        </Flex>

        {/* Features */}
        <Flex spacing={6} mb={8} justify="center" gap={8} wrap="wrap">
          <VStack>
            <Box
              w={12}
              h={12}
              bg="gold.100"
              borderRadius="full"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <CalendarIcon color="gold.600" boxSize={6} />
            </Box>
            <Text fontSize="sm" fontWeight="medium">
              Cultural Events
            </Text>
          </VStack>
          <VStack>
            <Box
              w={12}
              h={12}
              bg="teal.100"
              borderRadius="full"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Text fontSize="2xl">👥</Text>
            </Box>
            <Text fontSize="sm" fontWeight="medium">
              Youth Connect
            </Text>
          </VStack>
          <VStack>
            <Box
              w={12}
              h={12}
              bg="orange.100"
              borderRadius="full"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <TimeIcon color="orange.600" boxSize={6} />
            </Box>
            <Text fontSize="sm" fontWeight="medium">
              Evening
            </Text>
          </VStack>
        </Flex>

        {/* Registration Closed Message */}
        <Box
          bg="red.50"
          border="1px solid"
          borderColor="red.300"
          borderRadius="lg"
          p={6}
          textAlign="center"
          boxShadow="md"
        >
          <Heading size="md" color="red.600" mb={2}>
            Registrations Closed
          </Heading>
          <Text color="gray.700">
            Thank you for your interest. Registrations for AU Pre-Janmasthami Festival are now closed.
          </Text>
        </Box>
      </Container>
    </Box>
  );
};

export default RegistrationClosed;
