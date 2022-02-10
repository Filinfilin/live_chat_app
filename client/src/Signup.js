import React, { useState } from "react";
import { Redirect } from "react-router-dom";
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
import LoginSignup from "./components/LoginSignup/loginSignup";

const useStyles = makeStyles((theme) => ({
  buttonCreate: {
    height: 54,
    display: "flex",
    borderRadius: 3,
    minWidth: 160,
    margin: '30px auto 0',
    fontSize: 14,
  },
  form: {
    [theme.breakpoints.up("xs")]: {
      width: "80%",
      margin: "auto"
    },
    [theme.breakpoints.up("sm")]: {
      width: "60%",
      margin: "auto"
    },
  },
  formTypography: {
    marginLeft: 8,
  },
}));

const Login = (props) => {
  const classes = useStyles();
  const { register, user } = props;
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
    <LoginSignup type="signup">
      <form className={classes.form} onSubmit={handleRegister}>
        <Grid container spacing={2}>
          <Typography variant="h4" className={classes.formTypography}>
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
          <Grid item xs={12} >
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
    </LoginSignup>
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
