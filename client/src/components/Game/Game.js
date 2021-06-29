import React, {useEffect, useState} from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '../CharacterCard/CharacterCard';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import './game.css'

const Game = () => {
    const [userState, setUserState] = useState('');
    const [compState, setCompState] = useState('');
    const [gameState, setGameState] = useState({
        displayText:"",
        faze: "encounter",
        maxEncounters: 1,
        encounterImage:"",
        encounterText:"",
        encounterTitle:"",
        userHealth: 100,
        maxMovement:5,
        currentMovement:2
    });  
    
    const redOptions = ["I try to hit them", "I start dancing like a butterfly", "I try to sting like a Bee"];
    const blueOptions = ["I wave my Turkey leg in the air", "I conjure a clone of myself ", "I use Rasengan"];
    const greenOptions = ["I dodge the attack", "I sneaked close and snapped in their ear", "I drop a smoke bomb"];

    const useStyles = makeStyles({
        root: {
            width: "862px",
            left: "504px",
            top: "158px",
        },
        text: {
            color: "white",
            float: "right",
        }
    });

    const classes = useStyles()
    
    const compare = () => {
        const choices = ["rock", "paper", "scissors"];

        setCompState(choices[Math.floor(Math.random() * 3)])

        if (userState === "rock" && compState === "scissors") {
            console.log("rock wins!");
            setGameState({...gameState, displayText:"You defeated your enemy!", faze:"end"});
          } else if (userState === "rock" && compState === "paper") {
            console.log("paper wins!");
            setGameState({...gameState, displayText:"You've been defeated!", userHealth:0, faze:"end"});
          } else if (userState === "scissors" && compState === "paper") {
            console.log("scissors wins!");
            setGameState({...gameState, displayText:"You defeated your enemy!"});
          } else if (userState === "scissors" && compState === "rock") {
            console.log("rock wins!");
            setGameState({...gameState, text:"You defeated your enemy!"});
          } else if (userState === "paper" && compState === "rock") {
            console.log("paper wins!");
            setGameState({...gameState, text:"You defeated your enemy!"});
          } else if (userState === "paper" && compState === "scissors") {
            console.log("scissors wins!");
            setGameState({...gameState, text:"You defeated your enemy!"});
          } else {
            console.log("It's a tie!")
            setGameState({...gameState, text:"The battle was tuff each of you held their own"});
          }
    };
    

    useEffect( () => {
        if (userState === "") return;
        compare(userState)
        setUserState('')
    }, [userState]);

    useEffect ( () => {

    }, [gameState.faze]);

    return (
        <div>
        <Card/>
        <Box component= "div" display="inline"className={classes.root}>
            <Box component= "div" id="mainGame">
                <Typography className={classes.text} variant="h1">
                    {gameState.text}
                </Typography>
            </Box>
            {gameState.faze === "encounter" ? (
                <Box component= "div">
                <Button id='red' onClick={() => setUserState('rock')}>{redOptions[Math.floor(Math.random()*redOptions.length)]}</Button>
                <Button id='blue' onClick={() => setUserState('paper')}>{blueOptions[Math.floor(Math.random()*blueOptions.length)]}</Button>
                <Button id='green' onClick={() => setUserState('scissors')}>{greenOptions[Math.floor(Math.random()*greenOptions.length)]}</Button>
            </Box>
            ): null }
                
        </Box>
        </div>
    )
}

export default Game;