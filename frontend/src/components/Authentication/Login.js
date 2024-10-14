import { Button } from "@chakra-ui/button";
import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  useToast,
  ScaleFade,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { ChatState } from "../../Context/ChatProvider";

const Login = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const history = useHistory();
  const { setUser } = ChatState();

  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      toast({
        title: "Please fill all the fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/user/login",
        { email, password },
        config
      );

      toast({
        title: "Login successful!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });

      setUser(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      history.push("/chats");
    } catch (error) {
      toast({
        title: "Error occurred!",
        description: error.response?.data?.message || "Network error, please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      setLoading(false);
    }
  };

  return (
    <ScaleFade in={true}>
      <VStack
        spacing={{ base: "8px", md: "10px" }}
        width={{ base: "90%", md: "100%" }}
        padding={{ base: "20px", md: "40px" }}
        borderRadius="lg"
        boxShadow="lg"
        bg="linear-gradient(to bottom right, rgba(0, 0, 0, 0.9), rgba(20, 20, 20, 0.9))" // Liquid black gradient background
      >
        {/* Email Input */}
        <FormControl id="email" isRequired>
          <FormLabel
            fontWeight="bold"
            color="white" // White label color for contrast
          >
            Email Address
          </FormLabel>
          <Input
            value={email}
            type="email"
            placeholder="Enter Your Email Address"
            onChange={(e) => setEmail(e.target.value)}
            _focus={{ borderColor: "blue.400", boxShadow: "outline" }}
            transition="all 0.2s ease"
            bg="rgba(255, 255, 255, 0.2)" // Transparent white input background
            color="white" // Input text color
            borderRadius="md" // Rounded corners
          />
        </FormControl>

        {/* Password Input */}
        <FormControl id="password" isRequired>
          <FormLabel
            fontWeight="bold"
            color="white" // White label color for contrast
          >
            Password
          </FormLabel>
          <InputGroup size="md">
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={show ? "text" : "password"}
              placeholder="Enter Password"
              _focus={{ borderColor: "blue.400", boxShadow: "outline" }}
              transition="all 0.2s ease"
              bg="rgba(255, 255, 255, 0.2)" // Transparent white input background
              color="white" // Input text color
              borderRadius="md" // Rounded corners
            />
            <InputRightElement width="4.5rem">
              <Button
                h="1.75rem"
                size="sm"
                onClick={handleClick}
                _hover={{ bg: "blue.500" }}
                transition="all 0.3s ease"
                color="white" // Button text color
                bg="blue.600" // Button background color
                borderRadius="md" // Rounded corners
              >
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>

        {/* Login Button */}
        <Button
          colorScheme="blue"
          width="100%"
          style={{ marginTop: 15 }}
          onClick={submitHandler}
          isLoading={loading}
          _hover={{ bg: "blue.500" }}
          transition="all 0.3s ease-in-out"
          _active={{ transform: "scale(0.98)" }}
          borderRadius="md" // Rounded corners
        >
          Login
        </Button>

        {/* Guest User Credentials Button */}
        <Button
          variant="solid"
          colorScheme="red"
          width="100%"
          onClick={() => {
            setEmail("guest@example.com");
            setPassword("123456");
          }}
          _hover={{ bg: "red.500" }}
          transition="all 0.3s ease-in-out"
          borderRadius="md" // Rounded corners
        >
          Get Guest User Credentials
        </Button>
      </VStack>
    </ScaleFade>
  );
};

export default Login;
