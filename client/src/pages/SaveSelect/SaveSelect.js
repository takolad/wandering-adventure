import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
// import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { useAuth0 } from '@auth0/auth0-react'
// import { useHistory } from 'react-router-dom';
import API from '../../utils/API'
import './saveselect.css';

export default function SaveSelect() {
    // const history = useHistory();
    const { user } = useAuth0();

    const userId = user.sub.split("|")[1];

    const useStyles = makeStyles({
        root: {
            maxWidth: 400,
        },
        media: {
            height: 400,
        },
    });
    const classes = useStyles();

    const [charState, setCharState] = useState({
        character: [] 

    })
    // do use effect inside use effect api call to get characters, charState.character.map
    // async function selectSave() {
    //     const characterArray = await API.getCharacters(userId);
    //     return characterArray;

    // }
    // const characters = selectSave();
    // console.log(characters);
    return (

        <div>
            <Grid container spacing={2}>
                <Grid item sm={2} />
                <Grid item sm={3}>
                    <Card className={classes.root}>
                        <CardContent>
                            <div>
                                {charState.character.map(char => {
                                    return (
                                        <div key={char.id}></div>
                                    )
                                })}
                            </div>

                        </CardContent>

                    </Card>
                </Grid>
                <Grid item sm={2} />
                <Grid item sm={3} />
                <Grid item sm={2} />
            </Grid>
        </div>
    );
};