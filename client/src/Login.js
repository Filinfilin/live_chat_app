import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Typography,
  Button,
  FormControl,
  TextField,
} from "@material-ui/core";
import { login } from "./store/utils/thunkCreators";
import { makeStyles } from "@material-ui/core/styles";
import LoginSignup from "./components/LoginSignup/loginSignup";

const useStyles = makeStyles((theme) => ({
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
  buttonLogin: {
    height: 54,
    display: "flex",
    borderRadius: 3,
    minWidth: 160,
    margin: '30px auto',
    fontSize: 14,
  },
  formTypography: {
    marginLeft: 8,
  },
}));

const Login = (props) => {
  const { login, user } = props;
  const classes = useStyles();
  if (user.id) {
    return <Redirect to="/home" />;
  }

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;
    await login({ username, password });
  };

  return (
    <LoginSignup type="login">
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
                label="Password"
                aria-label="password"
                type="password"
                name="password"
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
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
    login: (credentials) => {
      dispatch(login(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
