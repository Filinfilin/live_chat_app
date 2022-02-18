import * as React from "react";
import { Grid, IconButton, makeStyles } from "@material-ui/core";
import { CancelRounded } from "@material-ui/icons";

const useStyles = makeStyles(() => ({
  imgPreviewContainer: {
    position: "relative",
  },
  imgPreview: {
    height: 50,
    width: 50,
    objectFit: "cover",
    border: "1px solid #91A3C0",
    borderRadius: 5,
  },
  btnDelete: {
    position: "absolute",
    top: 0,
    right: 0,
  },
}));

const ImagesPreview = (props) => {
  const { convertedImages, removeImage } = props;
  const classes = useStyles();
  return (
    <>
      {convertedImages.length ?
        convertedImages.map((item, index) => (
          <Grid
            item
            className={classes.imgPreviewContainer}
            key={`preview-image-${index}`}
          >
            <img
              className={classes.imgPreview}
              src={item.data}
              alt="img_preview"
              height={50}
              width={50}
            />
            <IconButton
              className={classes.btnDelete}
              color="primary"
              aria-label="upload picture"
              component="span"
              onClick={() => removeImage(index)}
            >
              <CancelRounded color="error" className={classes.btnDelete} />
            </IconButton>
          </Grid>
        )):""}
    </>
  );
};

export default ImagesPreview;
