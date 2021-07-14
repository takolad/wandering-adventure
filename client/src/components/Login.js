import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const LoginButton = () => {
  const classes = useStyles();
  const { loginWithRedirect } = useAuth0();

  return <Button
    color="primary"
    variant="contained"
    className={classes.root}
    onClick={() => loginWithRedirect()}>Enter
  </Button>;
};

export default LoginButton;