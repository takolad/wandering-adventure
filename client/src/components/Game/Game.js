import React, {useEffect, useState} from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '../CharacterCard/CharacterCard';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import API from '../../utils/API'
import './game.css'

const Game = () => {
    const [userState, setUserState] = useState('');
    const [compState, setCompState] = useState('');
    const [displayState, setDisplayState] = useState({
        text:"",
        image:""
    });
    const [gameState, setGameState] = useState({
        phase: "confirm",
        endGameEncounters: 5,
        encounterImage:"",
        encounterText:"",
        encounterTitle:"",
        userHealth: 100,
        maxMovement:7,
        currentMovement:0
    });  
    
    // Array for the battle options
    const redOptions = ["I try to hit them", "I start dancing like a butterfly", "I try to sting like a Bee", "Bite them in the ear"];
    const blueOptions = ["I wave my Turkey leg in the air", "I conjure a clone of myself ", "I use Rasengan", "I choose you Pickahu, lightning bolt"];
    const greenOptions = ["I dodge the attack", "I sneaked close and snapped in their ear", "I drop a smoke bomb", "Run at them naked"];

    // Material UI Styling
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

    // Handles the clicks for exploring 
    const exploringClick = (display) => {
        setDisplayState({...displayState, text:display}); 
        setGameState({...gameState, currentMovement:gameState.currentMovement+1})
    }
    
    // Handles click for the confirmation button
    const confirmClick = () => {
        setGameState({...gameState, phase:"encounter"})
        //API call
        API.getRandomEvent()
            .then((res) => {
                console.log(res.data)
                setDisplayState({...displayState, text:res.data.text})
            })
    }
    
    // The battle between Comp and User
    const battle = () => {
        const choices = ["rock", "paper", "scissors"];

        setCompState(choices[Math.floor(Math.random() * 3)])

        if (userState === "rock" && compState === "scissors") {
            console.log("rock wins!");
            setDisplayState({...displayState, text:"You defeated your Enemy! What direction do you want to go?"});
            setGameState({...gameState, phase:"exploring", maxMovement:gameState.currentMovement+Math.floor(Math.random() *10) +3});

          } else if (userState === "rock" && compState === "paper") {
            console.log("paper wins!");
            setDisplayState({...displayState, text:"You've been defeated! Better luck next time!"});
            setGameState({...gameState, userHealth:0, phase:"end"});

          } else if (userState === "scissors" && compState === "paper") {
            console.log("scissors wins!");
            setDisplayState({...displayState, text:"You defeated your Enemy! What direction do you want to go?"});
            setGameState({...gameState, phase:"exploring", maxMovement:gameState.currentMovement+Math.floor(Math.random() *10) +3});

          } else if (userState === "scissors" && compState === "rock") {
            console.log("rock wins!");
            setDisplayState({...displayState, text:"You've been defeated! Better luck next time!"});
            setGameState({...gameState, userHealth:0, phase:"end"});

          } else if (userState === "paper" && compState === "rock") {
            console.log("paper wins!");
            setDisplayState({...displayState, text:"You defeated your Enemy! What direction do you want to go?"});
            setGameState({...gameState, phase:"exploring", maxMovement:gameState.currentMovement+Math.floor(Math.random() *10) +3});

          } else if (userState === "paper" && compState === "scissors") {
            console.log("scissors wins!");
            setDisplayState({...displayState, text:"You've been defeated! Better luck next time!"});
            setGameState({...gameState, userHealth:0, phase:"end"});

          } else {
            console.log("It's a tie!")
            setDisplayState({...displayState, text:"Battle was fierce but you each held your own"})
          }
    };
    

    useEffect( () => {
        if (userState === "") return;
        battle(userState)
        setUserState('')
    }, [userState]);

    useEffect ( () => {
        if (gameState.currentMovement === gameState.maxMovement){
            setGameState({...gameState, phase:"confirm"})
            setDisplayState({...displayState, text:"You've encountered and enemy!"})
        }        
    }, [gameState.currentMovement]);

    console.log(gameState.currentMovement);
    console.log(gameState.maxMovement);

    return (
        <div>
        <Card/>
        <Box component= "div" display="inline"className={classes.root}>
            <Box component= "div" id="mainGame">
                <Typography id="text" className={classes.text} variant="h1">
                    {displayState.text}
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
                    <Button id="red" onClick={() => exploringClick("You took a left...")}>Left</Button>
                    <Button id="blue" onClick={() => exploringClick("You go forward a couple of steps...")}>Forward</Button>
                    <Button id="green" onClick={() => exploringClick("You take a right...")}>Right</Button>
                </Box>
            ): null }

            {gameState.phase === "confirm" ? (
                <Box component= "div" id="container">
                    <Button id="red" onClick={() => confirmClick()}>Battle</Button>
                </Box>
            ): null }
                
        </Box>
        </div>
    )
}

export default Game;