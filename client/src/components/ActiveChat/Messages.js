import React from "react";
import { Box } from "@material-ui/core";
import { SenderBubble, OtherUserBubble } from "../ActiveChat";
import moment from "moment";

const Messages = (props) => {
  const { messages, otherUser, user } = props;
  return (
    <Box>
      {messages.map((message,index) => {
        const time = moment(message.createdAt).format("h:mm");
        return message.senderId === user.id ? (
          <SenderBubble
            key={message.id}
            text={message.text}
            time={time}
            attachments={message.attachments}
            user={user}
            lastMessage={messages.length-1 === index}
          />
        ) : (
          <OtherUserBubble
            key={message.id}
            text={message.text}
            time={time}
            otherUser={otherUser}
            attachments={message.attachments}
          />
        );
      })}
    </Box>
  );
};

export default Messages;
