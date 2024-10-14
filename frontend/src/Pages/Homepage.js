import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Spinner,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";
import { FaUserAlt, FaSignInAlt } from "react-icons/fa"; // Importing icons

function Homepage() {
  const history = useHistory();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) {
      history.push("/chats");
    } else {
      setLoading(false);
    }
  }, [history]);

  if (loading) {
    return (
      <Container maxW="xl" centerContent>
        <Spinner size="xl" color="teal.400" />
      </Container>
    );
  }

  return (
    <Container maxW="xl" centerContent>
      <Box
        d="flex"
        justifyContent="center"
        p={3}
        bg="rgba(20, 20, 20, 0.9)" // Dark background
        w="100%"
        m="40px 0 0 0"
        borderRadius="lg"
        boxShadow="lg" // Added shadow
      >
        <Text fontSize="3xl" fontFamily="Arial, sans-serif" color="#ffffff">
          Aa-UChat
        </Text>
      </Box>
      <Box
        bg="rgba(20, 20, 20, 0.8)" // Dark background for tab container
        w="100%"
        p={4}
        borderRadius="lg"
        borderWidth="1px"
        boxShadow="lg" // Added shadow
      >
        <Tabs isFitted variant="soft-rounded">
          <TabList mb="1em">
            <Tab
              aria-label="Login Tab"
              _hover={{ bg: "rgba(255, 255, 255, 0.1)" }} // Light hover effect
              _selected={{ bg: "rgba(0, 204, 255, 0.3)" }} // Selected tab color
              color="#ffffff" // Text color for tabs
            >
              <FaSignInAlt style={{ marginRight: '8px', color: "#00ccff" }} />
              Login
            </Tab>
            <Tab
              aria-label="Sign Up Tab"
              _hover={{ bg: "rgba(255, 255, 255, 0.1)" }} // Light hover effect
              _selected={{ bg: "rgba(0, 204, 255, 0.3)" }} // Selected tab color
              color="#ffffff" // Text color for tabs
            >
              <FaUserAlt style={{ marginRight: '8px', color: "#00ccff" }} />
              Sign Up
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
}

export default Homepage;
