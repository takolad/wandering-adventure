import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
// import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
// import { useHistory } from 'react-router-dom';
import './saveselect.css';
import SaveList from '../../components/SaveList';

export default function SaveSelect() {
    // const history = useHistory();
    const useStyles = makeStyles({
        root: {
            maxWidth: 400,
        },
        media: {
            height: 400,
        },
    });
    const classes = useStyles();

    

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
                <Grid item sm={6}>
                    <Card className={classes.root}>
                        <CardContent>
                            <SaveList />

                        </CardContent>

                    </Card>
                </Grid>
                <Grid item sm={2} />
                <Grid item sm={3} />
            </Grid>
        </div>
    );
};