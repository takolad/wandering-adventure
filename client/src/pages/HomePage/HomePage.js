
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import StartButton from "../../components/StartButton";
import ContinueButton from "../../components/ContinueButton";
import { useAuth0 } from "@auth0/auth0-react";
import "./homepage.css";
import ParticleBackground from "../../Particles";
import API from '../../utils/API'



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

  const [chState, setChState] = useState('')
  

  useEffect(() => {
    console.log(userId)
    API.getCharacters(userId)
      .then(res => {
        setChState('true')
        console.log(res.data)
      }
      )

      .catch(err => console.log(err))

  }, [])

  return (
    <Grid container justify="center" alignItems="center">
      <Grid item sm={3} />
      <Grid item sm={6}>
        <Card id='cardo'>
          <Container>
            <div className={classes.root}>
              <div id="center">
                <h2>
                  Hi {user.given_name || user.nickname || user.name}!<br/>
                   Make a selection.
                </h2>
                <Container>
                  <StartButton />
                  <br />
                  {chState === 'true' ? (
                    <ContinueButton />
                    ) : null}
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
