import { Avatar } from "@chakra-ui/avatar";
import { Tooltip } from "@chakra-ui/tooltip";
import ScrollableFeed from "react-scrollable-feed";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../config/ChatLogics";
import { ChatState } from "../Context/ChatProvider";

const ScrollableChat = ({ messages }) => {
  const { user } = ChatState();

  return (
    <ScrollableFeed>
      {messages &&
        messages.map((m, i) => (
          <div style={{ display: "flex" }} key={m._id}>
            {(isSameSender(messages, m, i, user._id) ||
              isLastMessage(messages, i, user._id)) && (
              <Tooltip label={m.sender.name} placement="bottom-start" hasArrow>
                <Avatar
                  mt="7px"
                  mr={1}
                  size="sm"
                  cursor="pointer"
                  name={m.sender.name}
                  src={m.sender.pic}
                  borderWidth="2px"
                  borderColor={m.sender._id === user._id ? "#007AFF" : "#FF2D55"} // Different border colors for user and others
                />
              </Tooltip>
            )}
            <span
              style={{
                backgroundColor: `${
                  m.sender._id === user._id ? "#1B1B1B" : "#2C2C2C"
                }`, // Darker background for the user's messages
                color: m.sender._id === user._id ? "#FFFFFF" : "#D1D1D1", // Light text color for contrast
                marginLeft: isSameSenderMargin(messages, m, i, user._id),
                marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
                borderRadius: "20px",
                padding: "10px 15px",
                maxWidth: "75%",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)", // Enhanced shadow for depth
                transition: "background-color 0.3s, transform 0.2s", // Smooth transitions
                "&:hover": {
                  backgroundColor: m.sender._id === user._id ? "#2D2D2D" : "#353535", // Lighter on hover
                  transform: "scale(1.02)", // Scale effect on hover
                },
              }}
            >
              {m.content}
            </span>
          </div>
        ))}
    </ScrollableFeed>
  );
};

export default ScrollableChat;
