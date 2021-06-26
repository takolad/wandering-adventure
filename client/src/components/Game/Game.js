import React, {useEffect, useState} from 'react';
// import Navbar from '../Navbar/Navbar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '../CharacterCard/CharacterCard'
import './game.css'

const Game = () => {
    const [userState, setUserState] = useState('');
    const [compState, setCompState] = useState('');

    const comChoice = () => {
        const choices = ["rock", "paper", "scissors"];

        setCompState(choices[Math.floor(Math.random() * 3)])        
    }

    useEffect(() => {
        comChoice()
    }, [userState])
    
    const compare = (user, comp) => {
        if (user === "rock" && comp === "scissors") {
            console.log("rock wins!");
          } else if (user === "rock" && comp === "paper") {
            console.log("paper wins!");
          } else if (user === "scissors" && comp === "paper") {
            console.log("scissors wins!")
          } else if (user === "scissors" && comp === "rock") {
            console.log("rock wins!")
          } else if (user === "paper" && comp === "rock") {
            console.log("paper wins!")
          } else if (user === "paper" && comp === "scissors") {
            console.log("scissors wins!")
          } else {
            console.log("It's a tie!")
          }
    };
    
    useEffect( () => {
        compare(userState, compState)
    }, [userState])

    return (
        <div>
        <Card/>
        <Box>
            <Box>
            <Button id='Btn' onClick={ () => setUserState('rock')}>Rock</Button>
            <Button id='Btn' onClick={ () => setUserState('paper')}>Paper</Button>
            <Button id='Btn' onClick={ () => setUserState('scissors')}>Scissors</Button>
            </Box>
        </Box>
        </div>
    )
}

export default Game;