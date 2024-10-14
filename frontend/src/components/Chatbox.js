import { Box } from "@chakra-ui/layout";
import SingleChat from "./SingleChat";
import { ChatState } from "../Context/ChatProvider";

const Chatbox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = ChatState();

  return (
    <Box
      d={{ base: selectedChat ? "flex" : "none", md: "flex" }}
      alignItems="center"
      flexDir="column"
      p={3}
      bg="rgba(0,0, 0, 0.7)" // Darker semi-transparent background
      w={{ base: "100%", md: "68%" }}
      borderRadius="lg"
      borderWidth="1px"
      borderColor="rgba(255, 255, 255, 0.1)" // Subtle border
      boxShadow="0 4px 20px rgba(0, 0, 0, 0.3)" // Slightly deeper shadow for more depth
      // backdropFilter="blur(15px)" // More pronounced blurring for a glass effect
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Box>
  );
};

export default Chatbox;
