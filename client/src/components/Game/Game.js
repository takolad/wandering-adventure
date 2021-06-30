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
    const [displayState, setDisplayState] = useState('');
    const [gameState, setGameState] = useState({
        displayText:"",
        phase: "encounter",
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
            setGameState({...gameState, phase:"end"});
            setDisplayState("You defeated your enemy!");

          } else if (userState === "rock" && compState === "paper") {
            console.log("paper wins!");
            setGameState({...gameState, userHealth:0, phase:"end"});
            setDisplayState("You've been defeated!");

          } else if (userState === "scissors" && compState === "paper") {
            console.log("scissors wins!");
            setGameState({...gameState, phase:"end"});
            setDisplayState("You defeated your enemy!");

          } else if (userState === "scissors" && compState === "rock") {
            console.log("rock wins!");
            setGameState({...gameState, userHealth:0, phase:"end"});
            setDisplayState("You've been defeated!");

          } else if (userState === "paper" && compState === "rock") {
            console.log("paper wins!");
            setGameState({...gameState, phase:"end"});
            setDisplayState("You defeated your enemy!");

          } else if (userState === "paper" && compState === "scissors") {
            console.log("scissors wins!");
            setGameState({...gameState, userHealth:0, phase:"end"});
            setDisplayState("You've been defeated!");

          } else {
            console.log("It's a tie!")
            setGameState({...gameState});
            setDisplayState("Battle was fierce but you each held your own")
          }
    };
    

    useEffect( () => {
        if (userState === "") return;
        compare(userState)
        setUserState('')
    }, [userState]);

    useEffect ( () => {

    }, [gameState.phase]);

    return (
        <div>
        <Card/>
        <Box component= "div" display="inline"className={classes.root}>
            <Box component= "div" id="mainGame">
                <Typography className={classes.text} variant="h1">
                    {displayState}
                </Typography>
            </Box>
            {gameState.phase === "encounter" ? (
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