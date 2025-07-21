import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Icon,
  Image,
  Link,
  Stack,
  Text,
  VStack,
  Spinner,
  HStack,
  SimpleGrid,
} from '@chakra-ui/react';
import {
  CheckCircle,
  Calendar,
  MapPin,
  Phone,
  Mail,
  ArrowLeft,
  Download,
  Share2,
} from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import krishnaPulseLogo from './component/image.png';

export default function ThankYouPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [status, setStatus] = useState('loading'); // 'loading', 'success', 'invalid', 'error'
  const [candidate, setCandidate] = useState(null);

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const res = await axios.get(
          `https://krishnabackend-389286764509.asia-south1.run.app/api/verify-payment/${id}`
        );
        if (res.data.success) {
          setCandidate(res.data.candidate);
          setStatus('success');
        } else {
          setStatus('invalid');
        }
      } catch (err) {
        setStatus('error');
      }
    };

    if (id) verifyPayment();
  }, [id]);

  if (status === 'loading') {
    return (
      <Center minH="100vh" bg="gray.50">
        <Spinner size="xl" color="teal.500" />
      </Center>
    );
  }

  if (status === 'invalid' || status === 'error') {
    return (
      <Box textAlign="center" mt={20} p={6}>
        <VStack spacing={4}>
          <Heading
            size="lg"
            color={status === 'invalid' ? 'red.500' : 'orange.500'}
          >
            {status === 'invalid' ? 'Invalid Payment' : 'Server Error'}
          </Heading>
          <Text>
            {status === 'invalid'
              ? "This payment ID is not valid or doesn't match any registration."
              : 'Something went wrong while verifying your payment. Please try again later.'}
          </Text>
          <Button colorScheme="teal" onClick={() => navigate('/')}>
            Go Back to Home
          </Button>
        </VStack>
      </Box>
    );
  }

  return (
    <Box
      minH="100vh"
      bgGradient="linear(to-br, orange.100, yellow.100)"
      py={8}
      px={4}
    >
      <Box maxW="2xl" mx="auto">
        <Flex
          align="center"
          justify="center"
          gap={4}
          mb={8}
          direction="row" // Always row
          textAlign="left" // Always left-aligned
          flexWrap="wrap" // Optional: Wrap text below image if very narrow screen
        >
          {/* Left: Logo with tick icon */}
          <Box position="relative" minW="96px">
            <Image
              src={krishnaPulseLogo}
              alt="krishna janmashtami festival"
              boxSize="96px"
           
              shadow="lg"
            />
            <Center
              position="absolute"
              top="-2"
              right="-2"
              bg="green.500"
              rounded="full"
              p={1}
            >
              <Icon as={CheckCircle} w={6} h={6} color="white" />
            </Center>
          </Box>

          {/* Right: Title and subtitle */}
          <Box ml={2}>
            <Heading
              size="lg"
              color="black"
              fontWeight="bold"
              lineHeight="short"
              textAlign={'center'}
            >
              AU PRE-JANMASTHAMI FESTIVAL
            </Heading>
            <Text fontSize="md" fontWeight="semibold" textAlign={'center'} mt={2} color="gray.700">
              A Fest of Fun, Faith & Freedom
            </Text>
          </Box>
        </Flex>

        <Box
          bgGradient="linear(to-r, purple.500, pink.500)"
          color="white"
          p={6}
          rounded="lg"
          shadow="xl"
          textAlign="center"
          mb={6}
        >
          <Heading fontSize="2xl" mb={2}>
            🎉 Registration Successful!
          </Heading>
          <Text fontSize="lg" opacity={0.9}>
            Welcome to AU PRE-JANMASTHAMI FESTIVAL-2025
          </Text>
        </Box>

        {candidate && (
          <Box bg="white" p={4} rounded="lg" shadow="md" mb={6}>
            <Text fontWeight="bold" color="purple.600" mb={1}>
              Thank you, {candidate.name}!
            </Text>
            <Text fontSize="sm" color="gray.600">
              We've received your payment of ₹{candidate.paymentAmount}
            </Text>
            <Text fontSize="sm" color="gray.500">
              Payment ID: {candidate.paymentId}
            </Text>
          </Box>
        )}

        <Box bg="white" p={6} rounded="lg" shadow="lg" mb={6}>
          <Stack spacing={6}>
            <Box textAlign="center">
              <Heading size="md" color="purple.600" mb={2}>
                Your Registration is Confirmed!
              </Heading>
            </Box>

            <VStack spacing={4} align="stretch">
              <Flex align="center" gap={3} p={3} bg="purple.50" rounded="lg">
                <Icon as={Calendar} w={5} h={5} color="purple.600" />
                <Box>
                  <Text fontWeight="semibold">Event Date</Text>
                  {/* <Text fontSize="sm" color="gray.600">August 19, 2024 (Janmashtami)</Text>
                   */}
                  <Text fontSize="sm" color="gray.600">
                    August 04, 2025
                  </Text>
                </Box>
              </Flex>

              <Flex align="center" gap={3} p={3} bg="purple.50" rounded="lg">
                <Icon as={MapPin} w={5} h={5} color="purple.600" />
                <Box>
                  <Text fontWeight="semibold">Venue</Text>
                  {/* <Text fontSize="sm" color="gray.600">Main Auditorium, Campus Grounds</Text> */}
                  <Text fontSize="sm" color="gray.600">
                    Andhra University Visakhapatnam
                  </Text>
                </Box>
              </Flex>

              <Flex
                direction="column"
                gap={3}
                p={3}
                bg="purple.50"
                rounded="lg"
              >
                <HStack align="center">
                  <Icon as={Phone} w={5} h={5} color="purple.600" />
                  <Box>
                    <Text fontWeight="semibold">WhatsApp Updates</Text>
                    <Text fontSize="sm" color="gray.600">
                      You'll receive updates & reminders for the event
                    </Text>
                  </Box>
                </HStack>
                <Button
                  as="a"
                  href="https://chat.whatsapp.com/Cv0fpaqDWqt4HHBZ3EoT9b?mode=ac_t" // <-- Replace this with your actual group link
                  target="_blank"
                  rel="noopener noreferrer"
                  bgGradient="linear(to-r, purple.500, pink.500)"
                  variant="solid"
                  size="sm"
                  color={'white'}
                  alignSelf="center"
                  _hover={{  bgGradient:"linear(to-r, purple.500, pink.500)",transform:'scale(1.03)',transition:'all 0.5s ease-out'}}
                >
                  Join WhatsApp Group
                </Button>
              </Flex>
            </VStack>

            {/* <Box
                bgGradient="linear(to-r, yellow.50, orange.50)"
                p={4}
                rounded="lg"
                border="2px solid"
                borderColor="yellow.400"
              >
                <Text fontWeight="semibold" color="purple.600" mb={2}>
                  Next Steps:
                </Text>
                <VStack spacing={1} align="start" fontSize="sm" color="gray.600">
                  <Text>• Save your payment receipt</Text>
                  <Text>• Join our WhatsApp group (link sent separately)</Text>
                  <Text>• Be on time at the venue</Text>
                </VStack>
              </Box> */}

            {/* <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={4}>
              <Button
    variant="outline"
    leftIcon={<Download />}
    onClick={() => window.open(`https://vrc-server-110406681774.asia-south1.run.app/api/download-receipt/${candidate.paymentId}`, '_blank')}
  >
    Download Receipt
  </Button>
                <Button
    variant="outline"
    leftIcon={<Share2 />}
    onClick={() => window.open('https://youthfest.harekrishnavizag.org/', '_blank')}
  >
    Share Registration Link
  </Button>
              </SimpleGrid> */}

            <Box textAlign="center" p={4} bg="gray.100" rounded="lg">
              <Text fontSize="sm" fontWeight="semibold" mb={2}>
                Need Help?
              </Text>
              <HStack justify="center" spacing={4} fontSize="sm">
                <Link
                  href="mailto:Raghunath101k@gmail.com"
                  color="purple.600"
                  display="flex"
                  alignItems="center"
                  gap={1}
                >
                  <Icon as={Mail} w={4} h={4} />
                  Email Support
                </Link>
                <Link
                  href="tel:+919876543210"
                  color="purple.600"
                  display="flex"
                  alignItems="center"
                  gap={1}
                >
                  <Icon as={Phone} w={4} h={4} />
                  Call Us
                </Link>
              </HStack>
            </Box>
          </Stack>
        </Box>

        <Center>
          <Button
            onClick={() => navigate('/')}
            variant="ghost"
            leftIcon={<ArrowLeft />}
          >
            Register Another Participant
          </Button>
        </Center>

        <Box
          textAlign="center"
          mt={8}
          p={4}
          bgGradient="linear(to-r, purple.500, pink.500)"
          color="white"
          rounded="lg"
        >
          <Text fontWeight="semibold" mb={1}>
            🙏 Radhe Krishna! 🙏
          </Text>
          <Text fontSize="sm" opacity={0.9}>
            We're excited to celebrate Janmashtami with you!
          </Text>
        </Box>
      </Box>
    </Box>
  );
}
