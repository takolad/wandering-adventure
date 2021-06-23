import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import './nav.css'



const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    
    },
    title: {
        flexGrow: 1,
    },
    color: {
        backgroundColor: '#000000'
    }
}));


const style = createMuiTheme();

style.typography.h3 = {
    fontSize: '1.5rem',
    '@media (min-width:600px)': {
        fontSize: '2rem',
    },
    [style.breakpoints.up('md')]: {
        fontSize: '2.5rem',
    },
    fontFamily: "MedievalSharp",
   
    
};


export default function NavBar() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static" classes={{root: classes.color}}>

                <Toolbar>
                    <ThemeProvider theme={style}>
                        <Typography variant="h3" className={classes.title}>
                            Wandering Adventure
                        </Typography>
                    </ThemeProvider>
                </Toolbar>

            </AppBar>
        </div>
    );
}
