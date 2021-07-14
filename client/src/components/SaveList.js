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
import { Link } from 'react-router-dom';
import DeleteIcon from '@material-ui/icons/Delete';
import API from '../utils/API';
import { useAuth0 } from '@auth0/auth0-react'
import Button from '@material-ui/core/Button'
import mage from '../pages/CharacterSelect/mage.jpeg'
import warrior from '../pages/CharacterSelect/warrior.jpeg'

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
        textAlign: 'center'
    },
}));

export default function SaveList() {
    const [dense, setDense] = useState(false);
    const [secondary, setSecondary] = useState(false);
    const [charState, setCharState] = useState({
        character: []

    })
    console.log(charState.character)
    useEffect(() => {
        loadChar()
    }, [])
    function loadChar() {
        API.getCharacters(userId)
            .then(res => {
                setCharState({ ...charState, character: res.data })
                console.log(res.data)
            })
            .catch(err => console.log(err))
    }

    function deleteChar(id, user_id) {
        API.deleteCharacter(user_id, id)
            .then(res => loadChar())
            .catch(err => console.log(err));

    }

    function charID() {
        console.log(charState.character[0].id)
    };

    const classes = useStyles();

    const { user } = useAuth0();
    const userId = user.sub.split("|")[1];

    return (
        <div className={classes.root}>
            <Grid>
                <Grid item xs={12} md={8}>
                    <Typography variant="h6" className={classes.title}>
                        Pick your character to continue!
                    </Typography>
                    <div className={classes.demo}>
                        <List dense={dense}>
                            {charState.character.map(char => {
                                return (
                                    <ListItem key={char.id}>
                                        <Link to={`/game/${char.game.id}/user/${char.user_id}/character/${char.id}`}>
                                            <Button onClick={() => charID()}>
                                                <ListItemAvatar>
                                                    {(char.class === 'Mage' ? <Avatar src={mage} /> : <Avatar src={warrior} />)}
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary={char.name}
                                                    secondary={secondary ? 'Secondary text' : null}
                                                />
                                            </Button>
                                        </Link>
                                        <ListItemSecondaryAction>
                                            <IconButton edge="end" aria-label="delete" onClick={() => deleteChar(char.id, char.user_id)}>
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

