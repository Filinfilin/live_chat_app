import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Typography,
  Button,
  FormControl,
  TextField,
  FormHelperText,
} from "@material-ui/core";
import { register } from "./store/utils/thunkCreators";
import LoginRegistrationSideImage from "./components/loginRegistrationSideImage";

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
    display: "flex",
    margin: "0 45px 0 auto",
    paddingTop: 30,
    alignItems: "first baseline",
  },
  imageContainer: {
    height: "100%",
    overflow: "hidden",
    position: "relative",
  },
  buttonCreate: {
    height: 54,
    display: "flex",
    borderRadius: 3,
    minWidth: 160,
    marginTop: 30,
    fontSize: 14,
  },
  form: {
    [theme.breakpoints.up('xs')]: {
      width: "80%",
    },
    [theme.breakpoints.up('sm')]: {
      width: "60%",
    },
  },
  formTypography: {
    marginLeft: 8,
  },
}));

const Login = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const { user, register } = props;
  const [formErrorMessage, setFormErrorMessage] = useState({});

  const handleRegister = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    if (password !== confirmPassword) {
      setFormErrorMessage({ confirmPassword: "Passwords must match" });
      return;
    }

    await register({ username, email, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }
  return (
    <Grid className={classes.mainContainer} container>
      <Grid className={classes.imageContainer} lg={5} md={5} height={100}>
        <LoginRegistrationSideImage />
      </Grid>
      <Grid
        item
        className={classes.formContainer}
        lg={7}
        md={7}
        container
        justify="center"
        height={100}
      >
        <Grid
          className={classes.formContainerHeader}
          container
          justify="flex-end"
        >
          <Typography item color="secondary">
            Already have an account?
          </Typography>
          <Button
            className={classes.buttonLogin}
            onClick={() => history.push("/login")}
            color="primary"
          >
            Login
          </Button>
        </Grid>
        <form className={classes.form} onSubmit={handleRegister}>
          <Grid container spacing={2}>
            <Typography variant="h4" className={classes.formTypography}>
              {" "}
              Create an account.
            </Typography>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <TextField
                  aria-label="username"
                  label="Username"
                  name="username"
                  type="text"
                  variant="standard"
                  required
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <TextField
                  label="E-mail address"
                  aria-label="e-mail address"
                  type="email"
                  name="email"
                  variant="standard"
                  required
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl error={!!formErrorMessage.confirmPassword} fullWidth>
                <TextField
                  aria-label="password"
                  label="Password"
                  type="password"
                  inputProps={{ minLength: 6 }}
                  name="password"
                  required
                  variant="standard"
                />
                <FormHelperText>
                  {formErrorMessage.confirmPassword}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl error={!!formErrorMessage.confirmPassword} fullWidth>
                <TextField
                  label="Confirm Password"
                  aria-label="confirm password"
                  type="password"
                  inputProps={{ minLength: 6 }}
                  name="confirmPassword"
                  variant="standard"
                  required
                />
                <FormHelperText>
                  {formErrorMessage.confirmPassword}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid container md={12} justify="center">
              <Button
                className={classes.buttonCreate}
                type="submit"
                variant="contained"
                size="large"
                color="primary"
              >
                Create
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
    register: (credentials) => {
      dispatch(register(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
