import { ViewIcon } from "@chakra-ui/icons";
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
  IconButton,
  Text,
  Image,
  Box,
} from "@chakra-ui/react";

const ProfileModal = ({ user, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton
          d={{ base: "flex" }}
          icon={<ViewIcon />}
          onClick={onOpen}
          colorScheme="blue"
          variant="outline"
          _hover={{ bg: "blue.600", color: "white" }}
        />
      )}
      <Modal size="lg" onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent bg="#2c2f33" color="white" borderRadius="15px">
          <ModalHeader
            fontSize="40px"
            fontFamily="Arial, sans-serif"
            d="flex"
            justifyContent="center"
            color="#ffffff"
          >
            {user.name}
          </ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody
            d="flex"
            flexDir="column"
            alignItems="center"
            justifyContent="space-between"
            padding={5}
          >
            <Image
              borderRadius="full"
              boxSize="150px"
              src={user.pic}
              alt={user.name}
              borderWidth="2px"
              borderColor="#007bff" // Blue border around the image
              boxShadow="0 4px 15px rgba(0, 0, 0, 0.5)" // Shadow effect
            />
            <Box mt={4}>
              <Text
                fontSize={{ base: "28px", md: "30px" }}
                fontFamily="Arial, sans-serif"
                color="white"
                textAlign="center"
              >
                Email: {user.email}
              </Text>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose} colorScheme="blue" borderRadius="20px">
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileModal;
