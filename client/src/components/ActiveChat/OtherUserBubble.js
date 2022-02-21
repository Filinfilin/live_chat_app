import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography, Avatar } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
  },
  avatar: {
    height: 30,
    width: 30,
    marginRight: 11,
    marginTop: 6,
  },
  usernameDate: {
    fontSize: 11,
    color: "#BECCE2",
    fontWeight: "bold",
    marginBottom: 5,
  },
  bubble: {
    margin: 5,
    backgroundImage: "linear-gradient(225deg, #6CC1FF 0%, #3A8DFF 100%)",
    borderRadius: "0 10px 10px 10px",
  },
  text: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FFFFFF",
    letterSpacing: -0.2,
    padding: 8,
  },
  attachment: {
    borderRadius: 10,
    objectFit: "cover",
    margin: 5,
  },
}));
const OtherUserBubble = (props) => {
  const classes = useStyles();
  const { text, time, otherUser, attachments } = props;

  const WITH_COUPLE_ATTACHMENTS = attachments && attachments.length > 1;
  const WITH_ONE_OR_NO_ATTACHMENTS_AND_TEXT =
    (text && !attachments) || (text && attachments && attachments.length <= 1);

  const Text = ({ text, withStyling }) => {
    return (
      <Box className={withStyling ? classes.bubble : ""}>
        <Typography className={classes.text}>{text}</Typography>
      </Box>
    );
  };

  return (
    <Box className={classes.root}>
      <Avatar
        alt={otherUser.username}
        src={otherUser.photoUrl}
        className={classes.avatar}
      />
      <Box>
        <Typography className={classes.usernameDate}>
          {otherUser.username} {time}
        </Typography>
        {text && WITH_COUPLE_ATTACHMENTS && <Text text={text} withStyling />}
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
          {WITH_ONE_OR_NO_ATTACHMENTS_AND_TEXT && (
            <Text text={text} withStyling={false} />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default OtherUserBubble;
