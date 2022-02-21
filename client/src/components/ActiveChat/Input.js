import React, { useRef, useState } from "react";
import {
  FormControl,
  FilledInput,
  Box,
  Grid,
  IconButton,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { postMessage } from "../../store/utils/thunkCreators";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import {
  uploadImage,
  convertToBase64,
} from "../../store/utils/convertUploadImages";
import { CircularProgress } from "@material-ui/core";
import ImagesPreview from "./imagePreview";

const useStyles = makeStyles(() => ({
  root: {
    justifySelf: "flex-end",
    marginTop: 25,
  },
  input: {
    height: 70,
    backgroundColor: "#F4F6FA",
    borderRadius: 8,
    marginBottom: 20,
  },
  chooseFile: {
    display: "none",
  },
}));

const Input = (props) => {
  const classes = useStyles();
  const [text, setText] = useState("");
  const [convertedImages, setConvertedImages] = useState([]);
  const { postMessage, otherUser, conversationId, user } = props;
  const [imagesToSend, setImagesToSend] = useState([]);
  const [uploading, setUploading] = useState(false);
  const textInput = useRef();

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (uploading) return;
    setUploading(true);
    // add sender user info if posting to a brand new convo, so that the other user will have access to username, profile pic, etc.
    let fileUrl;
    if (imagesToSend.length) {
      fileUrl = await uploadImage(imagesToSend);
    }
    if (event.target.text.value || imagesToSend.length) {
      const reqBody = {
        text: event.target.text.value,
        recipientId: otherUser.id,
        conversationId,
        sender: conversationId ? null : user,
        attachments: fileUrl || null,
      };
      await postMessage(reqBody);
      uploadImagePreview([]);
      setText("");
    }
    setUploading(false);
  };

  function uploadImagePreview(images) {
    let files = [...images];
    setImagesToSend(files);
    convertImages(files);
    textInput.current.focus();
  }

  async function convertImages(imagesToSend) {
    let images = await Promise.all(
      imagesToSend.map((f) => {
        return convertToBase64(f);
      })
    );
    setConvertedImages(images);
  }

  const removeImage = (key) => {
    const newImagesToSend = imagesToSend.filter((item, index) => index !== key);
    uploadImagePreview(newImagesToSend);
  };



  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <ImagesPreview
          removeImage={removeImage}
          convertedImages={convertedImages}
        />
      </Grid>
      <FormControl fullWidth hiddenLabel>
        <FilledInput
          endAdornment={
            uploading ? (
              <Box sx={{ display: "flex" }}>
                <CircularProgress />
              </Box>
            ) : (
              <Box className="image-upload">
                <input
                  multiple
                  id="file-input"
                  type="file"
                  accept="image/*"
                  key="image_download"
                  style={{ display: "none" }}
                  onChange={(e) => uploadImagePreview(e.target.files)}
                />
                <label htmlFor="file-input">
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                  >
                    <AttachFileIcon />
                  </IconButton>
                </label>
              </Box>
            )
          }
          classes={{ root: classes.input }}
          disableUnderline
          placeholder="Type something..."
          inputRef={textInput}
          value={text}
          name="text"
          onChange={handleChange}
        />
      </FormControl>
    </form>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    postMessage: (message) => {
      dispatch(postMessage(message));
    },
  };
};

export default connect(null, mapDispatchToProps)(Input);
