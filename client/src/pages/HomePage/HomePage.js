
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import StartButton from "../../components/StartButton";
import ContinueButton from "../../components/ContinueButton";
import { useAuth0 } from "@auth0/auth0-react";
import "./homepage.css";
import ParticleBackground from "../../Particles";


const useStyles = makeStyles((theme) => ({
  root: {
    display: "block",
    flexWrap: "wrap",
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: "25ch",
  },
}));

export default function HomePage() {
  const classes = useStyles();
  const { user } = useAuth0();
  const userId = user.sub.split("|")[1];
  console.log("userId: ", userId);
  return (
    <Grid container justify="center" alignItems="center">
      <Grid item sm={2} />
      <Grid item sm={6}>
        <Card>
          <Container>
            <div className={classes.root}>
              <div id="center">
                <h2>
                  Hi {user.given_name || user.nickname || user.name}! Make a
                  selection.
                </h2>
                <Container>
                  <StartButton />
                  <br />
                  <ContinueButton />
                </Container>
              </div>
            </div>
          </Container>
        </Card>
        <ParticleBackground />
      </Grid>
      <Grid item sm={2} />
    </Grid>
  );
}
