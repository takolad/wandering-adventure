import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import API from '../utils/API';
import { useAuth0 } from '@auth0/auth0-react'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        maxWidth: 752,
    },
    demo: {
        backgroundColor: theme.palette.background.paper,
    },
    title: {
        margin: theme.spacing(4, 0, 2),
    },
}));

function generate(element) {
    return [0, 1, 2].map((value) =>
        React.cloneElement(element, {
            key: value,
        }),
    );
}

export default function SaveList() {
    const [dense, setDense] = useState(false);
    const [secondary, setSecondary] = useState(false);
    const [charState, setCharState] = useState({
        character: []

    })
    useEffect(() => {
        loadChar()
    }, [])
    function loadChar() {
        API.getCharacters(userId)
            .then(res => setCharState({...charState, character: res.data})
            )
            .catch(err => console.log(err))
    }

    function deleteChar(id) {
        API.deleteCharacter(id)
            .then(res => loadChar())
            .catch(err => console.log(err));
    }
    const classes = useStyles();

    const { user } = useAuth0();
    const userId = user.sub.split("|")[1];

    return (
        <div className={classes.root}>
            <Grid>
                <Grid item xs={6} md={9}>
                    <Typography variant="h6" className={classes.title}>
                        Pick your save game!
                    </Typography>
                    <div className={classes.demo}>
                        <List dense={dense}>
                            {charState.character.map(char => {
                                return (
                                    <ListItem key={char.id}>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <FolderIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={char.name}
                                            secondary={secondary ? 'Secondary text' : null}
                                        />
                                        <ListItemSecondaryAction>
                                            <IconButton edge="end" aria-label="delete" onclick={() => deleteChar(charState.character.id)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    </ListItem>


                                )
                            })}
                        </List>
                    </div>
                </Grid>
            </Grid>
        </div >
    );
}

