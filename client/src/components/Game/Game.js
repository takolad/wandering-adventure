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
    const [gameState, setGameState] = useState('');  
    
    const redOptions = ["I try to hit them", "I start dancing like a butterfly", "I try to sting like a Bee"];
    const blueOptions = ["I wave my Turkey leg in the air", "I conjure a clone of myself ", "I use my Rasengan" ];
    const greenOptions = ["I dodge the attack", "I sneaked close and snapped in their ear", ];

    const useStyles = makeStyles({
        root: {
            width: "862px",
            // height: "648px",
            left: "504px",
            top: "158px",
            float: "right",
        },
        text: {
            color: "white",
            
        }
    });

    const classes = useStyles()
    
    const compare = (user) => {
        const choices = ["rock", "paper", "scissors"];

        setCompState(choices[Math.floor(Math.random() * 3)])

        if (user === "rock" && compState === "scissors") {
            console.log("rock wins!");
            setGameState("Rock wins!");
          } else if (user === "rock" && compState === "paper") {
            console.log("paper wins!");
            setGameState("Paper wins!");
          } else if (user === "scissors" && compState === "paper") {
            console.log("scissors wins!");
            setGameState("Scissors wins!");
          } else if (user === "scissors" && compState === "rock") {
            console.log("rock wins!");
            setGameState("Rock wins!");
          } else if (user === "paper" && compState === "rock") {
            console.log("paper wins!");
            setGameState("Paper wins!");
          } else if (user === "paper" && compState === "scissors") {
            console.log("scissors wins!");
            setGameState("Scissors wins!");
          } else {
            console.log("It's a tie!")
            setGameState("It's a tie!");
          }
    };
    

    useEffect( () => {
        if (userState === "") return;
        compare(userState)
        setUserState('')
    }, [userState])

    return (
        <div>
        <Card/>
        <Box component= "div" display="inline"className={classes.root}>
            <Box component= "div" id="mainGame">
                <Typography className={classes.text} variant="h1">
                    {gameState}
                </Typography>
            </Box>
                <Box component= "div">
                    <Button id='red' onClick={ () => setUserState('rock')}>{redOptions[Math.floor(Math.random()*redOptions.length)]}</Button>
                    <Button id='blue' onClick={ () => setUserState('paper')}>{blueOptions[Math.floor(Math.random()*blueOptions.length)]}</Button>
                    <Button id='green' onClick={ () => setUserState('scissors')}>{greenOptions[Math.floor(Math.random()*greenOptions.length)]}</Button>
                </Box>
        </Box>
        </div>
    )
}

export default Game;