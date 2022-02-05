import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import bgImg from "../img/bgimg.png";
import bgImgGrad from "../img/bg.png";
import conv from "../img/conv.png";
import shape from "../img/Shape.png";
import oval from "../img/oval.png";

const useStyles = makeStyles(() => ({
  bg_image: {
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
  image_quote: {
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
  shape_container: {
    margin: 30,
  },
  shape_ovals: {
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
        className={classes.bg_image}
        src={bgImg}
        sx={{ display: { sm: "none", md: "flex" } }}
      />
      <Box
        component="img"
        className={classes.bg}
        src={bgImgGrad}
        sx={{ display: { sm: "none", md: "flex" } }}
      />
      <Box className={classes.image_quote}>
        <Box className={classes.shape_container}>
          <Box component="img" src={shape} />
          <Box className={classes.shape_ovals}>
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
