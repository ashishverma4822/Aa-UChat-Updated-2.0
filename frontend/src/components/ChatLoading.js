import { Stack } from "@chakra-ui/layout";
import { Skeleton } from "@chakra-ui/skeleton";
import { Box } from "@chakra-ui/react";

const ChatLoading = () => {
  return (
    <Stack spacing={4} p={3}> {/* Increased spacing and added padding for overall layout */}
      {Array.from({ length: 12 }).map((_, index) => (
        <Box
          key={index}
          borderRadius="lg"
          bg="rgba(255, 255, 255, 0.1)" // Light transparent background to mimic Instagram's aesthetic
          backdropFilter="blur(15px)" // Increased blur for a glass effect
          boxShadow="0 2px 15px rgba(0, 0, 0, 0.2)" // Subtle shadow for depth
          p={2}
        >
          <Skeleton height="45px" borderRadius="lg" fadeDuration={1} />
        </Box>
      ))}
    </Stack>
  );
};

export default ChatLoading;
