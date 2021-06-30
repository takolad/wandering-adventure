import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import StartButton from '../components/StartButton';
import ContinueButton from '../components/ContinueButton';


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

export default function UserPage() {
    const classes = useStyles();
    return (

        <Grid
            container
            justify="center"
            alignItems="center"
        >
            <Grid item xs={6}>
                <Card>
                    <Container>
                        <div className={classes.root}>
                            <div>
                                <h2>Hi User!  Make a selection.</h2>
                                <Container>
                                    <StartButton />
                                    <ContinueButton />
                                </Container>
                            </div>
                        </div>
                    </Container>
                </Card>
            </Grid>

        </Grid>

    );
}
