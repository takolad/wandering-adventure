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
            setDisplayState("You defeated your enemy! Which way do you want to go?");
            setGameState({...gameState, phase:"exploring"});

          } else if (userState === "rock" && compState === "paper") {
            console.log("paper wins!");
            setDisplayState("You've been defeated!");
            setGameState({...gameState, userHealth:0, phase:"end"});

          } else if (userState === "scissors" && compState === "paper") {
            console.log("scissors wins!");
            setDisplayState("You defeated your enemy! Which way do you want to go?");
            setGameState({...gameState, phase:"exploring"});

          } else if (userState === "scissors" && compState === "rock") {
            console.log("rock wins!");
            setDisplayState("You've been defeated!");
            setGameState({...gameState, userHealth:0, phase:"end"});

          } else if (userState === "paper" && compState === "rock") {
            console.log("paper wins!");
            setDisplayState("You defeated your enemy! Which way do you want to go?");
            setGameState({...gameState, phase:"exploring"});

          } else if (userState === "paper" && compState === "scissors") {
            console.log("scissors wins!");
            setDisplayState("You've been defeated!");
            setGameState({...gameState, userHealth:0, phase:"end"});

          } else {
            console.log("It's a tie!")
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
                <Typography id="text" className={classes.text} variant="h1">
                    {displayState}
                </Typography>
            </Box>
            {gameState.phase === "encounter" ? (
                <Box component= "div" id="container">
                    <Button id='red' onClick={() => setUserState('rock')}>{redOptions[Math.floor(Math.random()*redOptions.length)]}</Button>
                    <Button id='blue' onClick={() => setUserState('paper')}>{blueOptions[Math.floor(Math.random()*blueOptions.length)]}</Button>
                    <Button id='green' onClick={() => setUserState('scissors')}>{greenOptions[Math.floor(Math.random()*greenOptions.length)]}</Button>
                </Box>
            ): null }
            
            {gameState.phase === "exploring" ? (
                <Box component= "div" id="container">
                    <Button id="red" onClick={() => setDisplayState("You take a left...")}>Left</Button>
                    <Button id="blue" onClick={() => setDisplayState("You go forward a couple of steps...")}>Forward</Button>
                    <Button id="green" onClick={() => setDisplayState("You take a right...")}>Right</Button>
                </Box>
            ): null }

                
        </Box>
        </div>
    )
}

export default Game;