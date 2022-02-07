import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Typography,
  Button,
  FormControl,
  TextField,
} from "@material-ui/core";
import { login } from "./store/utils/thunkCreators";
import LoginRegistrationSideImage from "./components/loginRegistrationSideImage";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  imageContainer: {
    height: "100%",
    overflow: "hidden",
    position: "relative",
  },
  loginContainer: {
    height: "100vh",
  },
  buttonRegister: {
    height: 54,
    boxShadow: "1px 1px 3px #bdbdbd",
    minWidth: 140,
    marginLeft: 30,
  },
  formContainerHeader: {
    display: "flex",
    margin: "0 45px 0 auto",
    paddingTop: 30,
    alignItems: "first baseline",
  },
  form: {
    [theme.breakpoints.up('xs')]: {
      width: "80%",
    },
    [theme.breakpoints.up('sm')]: {
      width: "60%",
    },
  },
  buttonLogin: {
    height: 54,
    display: "flex",
    borderRadius: 3,
    minWidth: 160,
    marginTop: 30,
    fontSize: 14,
  },
  formTypography: {
    marginLeft: 8,
  },
}));

const Login = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const { user, login } = props;

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    await login({ username, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <Grid container justify="center" className={classes.loginContainer}>
      <Grid className={classes.imageContainer} md={5} height={100}>
        <LoginRegistrationSideImage />
      </Grid>
      <Grid lg={7} md={7} container justify="center" height={100}>
        <Grid
          container
          item
          className={classes.formContainerHeader}
          justify="flex-end"
        >
          <Typography className={classes.typography} color="secondary">
          Don't have an account?
          </Typography>
          <Button
            className={classes.buttonRegister}
            onClick={() => history.push("/register")}
            color="primary"
          >
            Create account
          </Button>
        </Grid>
        <form className={classes.form} onSubmit={handleLogin}>
          <Grid container spacing={2}>
            <Typography variant="h4" className={classes.formTypography}>
              Welcome back!
            </Typography>
            <Grid item xs={12}>
              <FormControl required fullWidth>
                <TextField
                  aria-label="username"
                  label="Username"
                  name="username"
                  type="text"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl required fullWidth>
                <TextField
                  label="password"
                  aria-label="password"
                  type="password"
                  name="password"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} justify="center">
              <Button
                className={classes.buttonLogin}
                type="submit"
                variant="contained"
                size="large"
                color="primary"
              >
                Login
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (credentials) => {
      dispatch(login(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
