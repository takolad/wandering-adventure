import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import './saveselect.css';
import SaveList from '../../components/SaveList';

export default function SaveSelect() {
    const useStyles = makeStyles({
        root: {
            maxWidth: 400,
        },
        media: {
            height: 400,
        },
    });
    const classes = useStyles();


    return (

        <div>
            <Grid container spacing={2}>
                <Grid item xs={1} sm={4} />
                <Grid item  sm={8} xs={12}>
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