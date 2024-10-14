import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  FormControl,
  Input,
  useToast,
  Box,
  useColorModeValue,
  Spinner,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { ChatState } from "../../Context/ChatProvider";
import UserBadgeItem from "../userAvatar/UserBadgeItem";
import UserListItem from "../userAvatar/UserListItem";

const GroupChatModal = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [groupChatName, setGroupChatName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const { user, chats, setChats } = ChatState();

  const handleGroup = (userToAdd) => {
    if (selectedUsers.includes(userToAdd)) {
      toast({
        title: "User already added",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    setSelectedUsers([...selectedUsers, userToAdd]);
  };

  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) {
      setSearchResult([]);
      return;
    }
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(`/api/user?search=${query}`, config); // use query instead of search
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      setLoading(false); // Ensure loading is set to false on error
      toast({
        title: "Error Occurred!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  const handleDelete = (delUser) => {
    setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
  };

  const handleSubmit = async () => {
    if (!groupChatName || selectedUsers.length === 0) {
      toast({
        title: "Please fill all the fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(
        `/api/chat/group`,
        {
          name: groupChatName,
          users: JSON.stringify(selectedUsers.map((u) => u._id)),
        },
        config
      );
      setChats([data, ...chats]);
      onClose();
      toast({
        title: "New Group Chat Created!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    } catch (error) {
      toast({
        title: "Failed to Create the Chat!",
        description: error.response.data.message || "An unexpected error occurred.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  // Use Chakra's color mode values for background, text, and input colors
  const modalContentBg = useColorModeValue("#1A202C", "#2D3748"); // Dark background
  const modalHeaderColor = useColorModeValue("white", "white"); // Header text color
  const inputBgColor = useColorModeValue("#2D3748", "#4A5568"); // Input background
  const inputBorderColor = useColorModeValue("#4A5568", "#A0AEC0"); // Input border color
  const buttonBg = useColorModeValue("blue.500", "blue.300"); // Button background

  return (
    <>
      <span onClick={onOpen}>{children}</span>

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent borderRadius="15px" bg={modalContentBg} shadow="lg">
          <ModalHeader
            fontSize="30px"
            fontFamily="Arial, sans-serif"
            d="flex"
            justifyContent="center"
            color={modalHeaderColor}
          >
            Create Group Chat
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody d="flex" flexDir="column" alignItems="center">
            <FormControl>
              <Input
                placeholder="Chat Name"
                mb={3}
                borderRadius="20px"
                bg={inputBgColor}
                borderColor={inputBorderColor}
                color="white"
                onChange={(e) => setGroupChatName(e.target.value)}
                _focus={{
                  borderColor: "#007bff",
                  boxShadow: "0 0 0 1px #007bff",
                }}
              />
            </FormControl>
            <FormControl>
              <Input
                placeholder="Add Users (e.g. John, Piyush, Jane)"
                mb={1}
                borderRadius="20px"
                bg={inputBgColor}
                borderColor={inputBorderColor}
                color="white"
                onChange={(e) => handleSearch(e.target.value)}
                value={search} // Controlled input value
                _focus={{
                  borderColor: "#007bff",
                  boxShadow: "0 0 0 1px #007bff",
                }}
              />
            </FormControl>
            <Box w="100%" d="flex" flexWrap="wrap" mb={2}>
              {selectedUsers.map((u) => (
                <UserBadgeItem
                  key={u._id}
                  user={u}
                  handleFunction={() => handleDelete(u)}
                />
              ))}
            </Box>
            {loading ? (
              <Spinner size="lg" /> // Show spinner instead of "Loading..."
            ) : searchResult.length > 0 ? (
              searchResult.slice(0, 4).map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => handleGroup(user)}
                />
              ))
            ) : (
              search && (
                <Text color="white" textAlign="center">
                  No users found
                </Text> // Message when no users are found
              )
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={handleSubmit}
              bg={buttonBg}
              color="white"
              borderRadius="20px"
              px={6}
            >
              Create Chat
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GroupChatModal;
