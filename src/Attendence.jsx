import React, { useState } from "react";
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import Layout from "./component/Layout";

const Attendence = () => {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const toast = useToast();

  const handleSubmit = async () => {
    setError("");
    const trimmedPhone = phone.trim().replace(/\D/g, "");

    if (!/^\d{10}$/.test(trimmedPhone)) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }

    try {
      const res = await fetch("https://krishnabackend-389286764509.asia-south1.run.app/api/mark-attendance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ whatsappNumber: trimmedPhone }),
      });

      const data = await res.json();

if (res.ok) {
  if (data.status === "already-marked") {
    toast({
      title: "Already Marked",
      description: data.message || "Attendance has already been marked.",
      status: "info",
      duration: 4000,
      isClosable: true,
    });
  } else {
    toast({
      title: "Already Attendance marked!",
      description: `Marked for ${data.name}`,
      status: "success",
      duration: 4000,
      isClosable: true,
    });
    setPhone("");
  }
} else {
  toast({
    title: "Error",
    description: data.message || "Could not mark attendance",
    status: "error",
    duration: 4000,
    isClosable: true,
  });
}

    } catch (err) {
      toast({
        title: "Server error",
        description: err.message || "Something went wrong",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  return (
    // <Layout>
    <Box maxW="400px" mx="auto" mt={20} p={6} borderWidth="1px" borderRadius="lg" boxShadow="md">
      <Heading mb={6} size="md" textAlign="center">Mark Attendance</Heading>

      <FormControl isInvalid={!!error}>
        <FormLabel>Phone Number</FormLabel>
        <Input
          placeholder="Enter 10-digit WhatsApp number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <FormErrorMessage>{error}</FormErrorMessage>
      </FormControl>

      <Button colorScheme="teal" mt={4} width="full" onClick={handleSubmit}>
        Mark Attendance
      </Button>
    </Box>
    // </Layout>
  );
};

export default Attendence;
