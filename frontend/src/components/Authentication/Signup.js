import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router";

const Signup = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();
  const history = useHistory();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [password, setPassword] = useState("");
  const [pic, setPic] = useState("");
  const [picLoading, setPicLoading] = useState(false);

  const submitHandler = async () => {
    setPicLoading(true);
    if (!name || !email || !password || !confirmpassword) {
      toast({
        title: "Please Fill all the Fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      return;
    }
    if (password !== confirmpassword) {
      toast({
        title: "Passwords Do Not Match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      return;
    }
    console.log(name, email, password, pic);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user",
        { name, email, password, pic },
        config
      );
      console.log(data);
      toast({
        title: "Registration Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setPicLoading(false);
      history.push("/chats");
    } catch (error) {
      toast({
        title: "Error Occurred!",
        description: error.response?.data.message || "Network error, please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
    }
  };

  const postDetails = (pics) => {
    setPicLoading(true);
    if (!pics) {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      return;
    }
    console.log(pics);
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chat-app");
      data.append("cloud_name", "piyushproj");
      fetch("https://api.cloudinary.com/v1_1/piyushproj/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          console.log(data.url.toString());
          setPicLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setPicLoading(false);
        });
    } else {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
    }
  };

  return (
    <VStack
      spacing="5px"
      padding="20px"
      borderRadius="lg"
      boxShadow="lg"
      bg="rgba(0, 0, 0, 0.8)" // Dark background for the container
    >
      <FormControl id="first-name" isRequired>
        <FormLabel color="white">Name</FormLabel>
        <Input
          placeholder="Enter Your Name"
          onChange={(e) => setName(e.target.value)}
          bg="rgba(255, 255, 255, 0.1)" // Lighter transparent background
          color="white"
          _placeholder={{ color: "rgba(255, 255, 255, 0.7)" }} // Lighter placeholder color
          borderColor="rgba(255, 255, 255, 0.5)" // Border color
          _hover={{ borderColor: "blue.400" }} // Hover effect
        />
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel color="white">Email Address</FormLabel>
        <Input
          type="email"
          placeholder="Enter Your Email Address"
          onChange={(e) => setEmail(e.target.value)}
          bg="rgba(255, 255, 255, 0.1)"
          color="white"
          _placeholder={{ color: "rgba(255, 255, 255, 0.7)" }}
          borderColor="rgba(255, 255, 255, 0.5)"
          _hover={{ borderColor: "blue.400" }}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel color="white">Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
            bg="rgba(255, 255, 255, 0.1)"
            color="white"
            _placeholder={{ color: "rgba(255, 255, 255, 0.7)" }}
            borderColor="rgba(255, 255, 255, 0.5)"
            _hover={{ borderColor: "blue.400" }}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick} color="white" bg="blue.600" _hover={{ bg: "blue.500" }}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="confirmpassword" isRequired>
        <FormLabel color="white">Confirm Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            placeholder="Confirm Password"
            onChange={(e) => setConfirmpassword(e.target.value)}
            bg="rgba(255, 255, 255, 0.1)"
            color="white"
            _placeholder={{ color: "rgba(255, 255, 255, 0.7)" }}
            borderColor="rgba(255, 255, 255, 0.5)"
            _hover={{ borderColor: "blue.400" }}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick} color="white" bg="blue.600" _hover={{ bg: "blue.500" }}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="pic">
        <FormLabel color="white">Upload your Picture</FormLabel>
        <Input
          type="file"
          p={1.5}
          accept="image/*"
          onChange={(e) => postDetails(e.target.files[0])}
          bg="rgba(255, 255, 255, 0.1)"
          color="white"
        />
      </FormControl>
      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={picLoading}
        _hover={{ bg: "blue.500" }} // Hover effect for the button
      >
        Sign Up
      </Button>
    </VStack>
  );
};

export default Signup;
