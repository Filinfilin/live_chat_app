import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import bgImg from "../img/bgimg.png";
import bgImgGrad from "../img/bg.png";
import conv from "../img/conv.png";
import shape from "../img/Shape.png";
import oval from "../img/oval.png";

const useStyles = makeStyles(() => ({
  bgImage: {
    width: "100%",
    position: "absolute",
    minHeight: "100%",
    minWidth: "100%",
    objectFit: "cover",
  },
  bg: {
    position: "absolute",
    left: 0,
    width: "100%",
    height: "inherit",
  },
  imageQuote: {
    textAlign: "center",
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    left: 0,
    right: 0,
    margin: "auto",
    width: "fit-content",
    height: "100%",
    transform: "translate(0%, 32%)",
  },
  shapeContainer: {
    margin: 30,
  },
  shapeOvals: {
    position: "absolute",
    top: 55,
    left: "44%",
  },
  oval: {
    height: 5,
    width: 5,
    margin: 3,
  },
}));

const LoginRegistrationSideImage = (props) => {
  const classes = useStyles();
  return (
    <>
      <Box
        component="img"
        className={classes.bgImage}
        src={bgImg}
        sx={{ display: { sm: "none", md: "flex" } }}
      />
      <Box
        component="img"
        className={classes.bg}
        src={bgImgGrad}
        sx={{ display: { sm: "none", md: "flex" } }}
      />
      <Box className={classes.imageQuote}>
        <Box className={classes.shapeContainer}>
          <Box component="img" src={shape} />
          <Box className={classes.shapeOvals}>
            <Box component="img" src={oval} className={classes.oval} />
            <Box component="img" src={oval} className={classes.oval} />
            <Box component="img" src={oval} className={classes.oval} />
          </Box>
        </Box>
        <Box component="img" src={conv} />
      </Box>
    </>
  );
};

export default LoginRegistrationSideImage;
