import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import LoginButton from '../../components/Login';
import { useAuth0 } from '@auth0/auth0-react';
import { useHistory } from 'react-router-dom';
import ParticleBackground from '../../Particles'
import './loginpage.css';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'block',
        flexWrap: 'wrap',
    },
    margin: {
        margin: theme.spacing(1),
    },
    withoutLabel: {
        marginTop: theme.spacing(3),
    },
    textField: {
        width: '25ch',
    },
}));


export default function LoginPage() {
    const { isAuthenticated } = useAuth0();
    const history = useHistory();
    const classes = useStyles();
    if (isAuthenticated) {
        history.push('/userpage')
    }
    return (

        <Grid
            container
            justify="center"
            alignItems="center"
        >
            <Grid item sm={2} />
            <Grid item sm={6}>
                <Card id='cardbox'>
                    
                        <div className={classes.root}>
                            <div id='login'>
                                <h2>
                                    Welcome to Wandering Adventure!
                                </h2>
                                <p>
                                    A fun, immersive text adventure game where you pick your actions.<br />
                                    Enter the tavern to begin your journey and complete the quest!
                                </p>
                                <h3>
                                    Click below to enter the Tavern of the Wanderer.
                                </h3>
                                <Container>
                                    <LoginButton />
                                </Container>
                            </div>
                        </div>
                    
                </Card>
                <ParticleBackground />
            </Grid>
            <Grid item sm={2} />
        </Grid>

    );
}
