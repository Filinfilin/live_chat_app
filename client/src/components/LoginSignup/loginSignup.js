import React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Button } from "@material-ui/core";
import LoginRegistrationSideImage from "./loginRegistrationSideImage";

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    height: "100vh",
  },
  buttonLogin: {
    height: 54,
    boxShadow: "1px 1px 3px #bdbdbd",
    minWidth: 140,
    marginLeft: 30,
  },
  formContainer: {
    height: "100%",
  },
  formContainerHeader: {
    minHeight: '30%',
    display: "flex",
    justifyContent: "flex-end",
    margin: "0 45px 0 45px",
    paddingTop: 30,
    alignItems: "first baseline",
  },
  imageContainer: {
    overflow: "hidden",
    position: "relative",
    [theme.breakpoints.down("sm")]: {
      position: 'absolute'
    },
  },
}));

const LoginSignup = ({ children, type }) => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Grid container className={classes.mainContainer} justifyContent="center">
      <Grid item className={classes.imageContainer} lg={5} md={5}>
        <LoginRegistrationSideImage />
      </Grid>
      <Grid
        item
        lg={7}
        md={7}
        height={100}
        width={100}
      >
        <Grid
          item
          className={classes.formContainerHeader}
        >
          <Typography color="secondary">
            {type === "login"
              ? "Don't have an account?"
              : "Already have an account?"}
          </Typography>
          <Button
            className={classes.buttonLogin}
            onClick={() =>
              history.push(`${type === "login" ? "/register" : "/login"}`)
            }
            color="primary"
          >
            {type === "login" ? "Create account" : "Login"}
          </Button>
        </Grid>
        {children}
      </Grid>
    </Grid>
  );
};

export default LoginSignup;
