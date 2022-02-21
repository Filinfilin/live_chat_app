import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Avatar, Box, Typography } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  },
  date: {
    fontSize: 11,
    color: "#BECCE2",
    fontWeight: "bold",
    marginBottom: 5,
  },
  text: {
    fontSize: 14,
    color: "#91A3C0",
    letterSpacing: -0.2,
    padding: 8,
    fontWeight: "bold",
  },
  bubble: {
    background: "#F4F6FA",
    borderRadius: "10px 10px 0 10px",
  },
  attachment: {
    borderRadius: 10,
    objectFit: "cover",
    margin: 5,
  },
  avatar: {
    height: 30,
    width: 30,
    marginTop: 6,
  },
}));

const SenderBubble = (props) => {
  const classes = useStyles();
  const { time, text, attachments, user, lastMessage } = props;

  const WITH_COUPLE_ATTACHMENTS = attachments && attachments.length > 1;
  const WITH_ONE_OR_NO_ATTACHMENTS_AND_TEXT =
    (text && !attachments) || (text && attachments && attachments.length <= 1);

  const Text = ({ text }) => {
    return (
      <Box className={classes.bubble}>
        <Typography className={classes.text}>{text}</Typography>
      </Box>
    );
  };

  return (
    <Box className={classes.root}>
      <Typography className={classes.date}>{time}</Typography>
      {text && WITH_COUPLE_ATTACHMENTS && <Text text={text} />}
      <Box className={WITH_COUPLE_ATTACHMENTS ? "" : classes.bubble}>
        {attachments &&
          attachments.map((item, index) => (
            <img
              className={classes.attachment}
              src={item}
              key={index * Math.random()}
              alt="attachment"
              height={attachments.length === 1 ? 200 : 150}
              width={attachments.length === 1 ? 250 : 200}
            />
          ))}
        {WITH_ONE_OR_NO_ATTACHMENTS_AND_TEXT && <Text text={text} />}
      </Box>
      {lastMessage && (
        <Avatar
          alt={user.username}
          src={user.photoUrl}
          className={classes.avatar}
        />
      )}
    </Box>
  );
};

export default SenderBubble;
