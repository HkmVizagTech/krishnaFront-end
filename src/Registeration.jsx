"use client"

import { useState } from "react"
import {
  ChakraProvider,
  Box,
  VStack,
  HStack,
  Heading,
  FormControl,
  FormLabel,
  Input,
  RadioGroup,
  Radio,
  Button,
  Text,
  Image,
  Container,
  Divider,
  useToast,
  FormErrorMessage,
  InputGroup,
  InputLeftAddon,
} from "@chakra-ui/react"
import images from './image.png'
function Registeration() {
  const [formData, setFormData] = useState({
    name: "",
    whatsappNumber: "",
    collegeCompany: "",
    age: "",
    previousVolunteer: "",
    gender: "",
    currentLocality: "",
    serviceAvailability: "",
  })

  const [errors, setErrors] = useState({})
  const toast = useToast()

  const handleInputChange = (field, value) => {
    if (field === "whatsappNumber") {
      value = value.replace(/\D/g, "").slice(0, 10) // Only digits, max 10
    }

    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!/^\d{10}$/.test(formData.whatsappNumber)) {
      newErrors.whatsappNumber = "Enter a valid 10-digit WhatsApp number"
    }
    if (!formData.collegeCompany.trim()) newErrors.collegeCompany = "College/Company name is required"
    if (!formData.age.trim()) newErrors.age = "Age is required"
    if (formData.age && (parseInt(formData.age) <= 10 || parseInt(formData.age) > 120)) {
      newErrors.age = "Please enter a valid age"
    }
    if (!formData.previousVolunteer) newErrors.previousVolunteer = "Please select an option"
    if (!formData.gender) newErrors.gender = "Please select gender"
    if (!formData.currentLocality.trim()) newErrors.currentLocality = "Current locality is required"
    if (!formData.serviceAvailability) newErrors.serviceAvailability = "Please select service availability"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        const dataToSend = {
          ...formData,
          whatsappNumber: `${formData.whatsappNumber}`,
        }

        const response = await fetch("https://krishnabackend-389286764509.asia-south1.run.app/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSend),
        })

        if (!response.ok) {
          throw new Error("Failed to submit")
        }

        toast({
          title: "Registration Successful!",
          description: "Thank you for volunteering for Jagannath Rathayatra.",
          status: "success",
          duration: 5000,
          isClosable: true,
        })

        handleClear()
      } catch (error) {
        toast({
          title: "Submission failed",
          description: error.message || "Something went wrong.",
          status: "error",
          duration: 5000,
          isClosable: true,
        })
      }
    }
  }

  const handleClear = () => {
    setFormData({
      name: "",
      whatsappNumber: "",
      collegeCompany: "",
      age: "",
      previousVolunteer: "",
      gender: "",
      currentLocality: "",
      serviceAvailability: "",
    })
    setErrors({})
  }

  return (
    <ChakraProvider>
      <Box bg="gray.50" minH="100vh" py={8}>
        <Container maxW="2xl">
          <VStack spacing={4} mb={8}>
            <HStack spacing={4} align="center">
              <Image
                src={images}
                alt="Hare Krishna Movement Logo"
                boxSize="80px"
                borderRadius="full"
              />
              <VStack align="start" spacing={1}>
                <Text fontSize="sm" color="gray.600">
                  Hare Krishna Movement - Visakhapatnam
                </Text>
                <Heading size="lg" color="orange.600">
                  Jagannath Rathayatra
                </Heading>
                <Text fontSize="md" fontWeight="semibold" color="gray.700">
                  Volunteer Service Registration
                </Text>
              </VStack>
            </HStack>
            <Divider />
          </VStack>

          <Box bg="white" p={8} borderRadius="lg" shadow="md">
            <VStack spacing={6} align="stretch">
              <Heading size="md" color="gray.700" mb={4}>
                Jagannath rathayatra Volunteers Service Registration
              </Heading>

              <Text fontSize="xs" color="red.500">
                * indicates required question
              </Text>

              <FormControl isRequired isInvalid={errors.name}>
                <FormLabel>Name *</FormLabel>
                <Input
                  placeholder="Your answer"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                />
                <FormErrorMessage>{errors.name}</FormErrorMessage>
              </FormControl>

              <FormControl isRequired isInvalid={errors.whatsappNumber}>
                <FormLabel>WhatsApp Number *</FormLabel>
                <InputGroup>
                  <InputLeftAddon children="+91" />
                  <Input
                    placeholder="10-digit number"
                    type="tel"
                    value={formData.whatsappNumber}
                    onChange={(e) => handleInputChange("whatsappNumber", e.target.value)}
                    maxLength={10}
                  />
                </InputGroup>
                <FormErrorMessage>{errors.whatsappNumber}</FormErrorMessage>
              </FormControl>

              <FormControl isRequired isInvalid={errors.collegeCompany}>
                <FormLabel>College / Company Name *</FormLabel>
                <Input
                  placeholder="Your answer"
                  value={formData.collegeCompany}
                  onChange={(e) => handleInputChange("collegeCompany", e.target.value)}
                />
                <FormErrorMessage>{errors.collegeCompany}</FormErrorMessage>
              </FormControl>

              <FormControl isRequired isInvalid={errors.age}>
                <FormLabel>Age *</FormLabel>
                <Input
                  type="number"
                  placeholder="Your answer"
                  value={formData.age}
                  onChange={(e) => handleInputChange("age", e.target.value)}
                />
                <FormErrorMessage>{errors.age}</FormErrorMessage>
              </FormControl>

              <FormControl isRequired isInvalid={errors.previousVolunteer}>
                <FormLabel>Previously done any Volunteer service for Hare Krishna Movement Visakhapatnam? *</FormLabel>
                <RadioGroup
                  value={formData.previousVolunteer}
                  onChange={(value) => handleInputChange("previousVolunteer", value)}
                >
                  <VStack align="start" spacing={2}>
                    <Radio value="yes">Yes</Radio>
                    <Radio value="no">No (This is 1st Time)</Radio>
                  </VStack>
                </RadioGroup>
                <FormErrorMessage>{errors.previousVolunteer}</FormErrorMessage>
              </FormControl>

              <FormControl isRequired isInvalid={errors.gender}>
                <FormLabel>Gender *</FormLabel>
                <RadioGroup
                  value={formData.gender}
                  onChange={(value) => handleInputChange("gender", value)}
                >
                  <VStack align="start" spacing={2}>
                    <Radio value="male">Male</Radio>
                    <Radio value="female">Female</Radio>
                  </VStack>
                </RadioGroup>
                <FormErrorMessage>{errors.gender}</FormErrorMessage>
              </FormControl>

              <FormControl isRequired isInvalid={errors.currentLocality}>
                <FormLabel>Your Current Locality *</FormLabel>
                <Input
                  placeholder="Your answer"
                  value={formData.currentLocality}
                  onChange={(e) => handleInputChange("currentLocality", e.target.value)}
                />
                <FormErrorMessage>{errors.currentLocality}</FormErrorMessage>
              </FormControl>

              <FormControl isRequired isInvalid={errors.serviceAvailability}>
                <FormLabel>Service Availability (according to you will allocate services to you) *</FormLabel>
                <RadioGroup
                  value={formData.serviceAvailability}
                  onChange={(value) => handleInputChange("serviceAvailability", value)}
                >
                  <VStack align="start" spacing={2}>
                    <Radio value="6am-9am">6am to 9am (Full Day)</Radio>
                    <Radio value="9am-6pm">9am to 6pm (Half Day)</Radio>
                    <Radio value="6pm-9pm">6pm to 9pm (Half Day)</Radio>
                  </VStack>
                </RadioGroup>
                <FormErrorMessage>{errors.serviceAvailability}</FormErrorMessage>
              </FormControl>

              <HStack spacing={4} pt={4}>
                <Button colorScheme="blue" onClick={handleSubmit} size="md">
                  Submit
                </Button>
                <Button variant="outline" onClick={handleClear} size="md">
                  Clear form
                </Button>
              </HStack>

              <Text fontSize="xs" color="gray.500" pt={4}>
                Never submit passwords through Google Forms.
              </Text>
            </VStack>
          </Box>
        </Container>
      </Box>
    </ChakraProvider>
  )
}

export default Registeration
