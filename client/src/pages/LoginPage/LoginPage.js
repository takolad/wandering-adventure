import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
// import ParticlesBg from 'particles-bg';
import LoginButton from '../../components/Login';
import { useAuth0 } from '@auth0/auth0-react';
import { useHistory } from 'react-router-dom';
import './loginpage.css';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
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
            <Grid item s={2} />
            <Grid item s={6}>
                <Card id='cardbox'>
                    <Container>
                        <div className={classes.root}>
                            <div id='login'>
                                <h2>Welcome to Wandering Adventure!</h2>
                                <h3>Click below to enter the Tavern of the Wanderer.</h3>

                                <Container>
                                    <LoginButton />

                                </Container>
                            </div>
                        </div>
                    </Container>
                </Card>
            </Grid>
            <Grid item s={2} />



        </Grid>

    );
}
