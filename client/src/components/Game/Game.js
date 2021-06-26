import React, {useEffect, useState} from 'react';
// import Navbar from '../Navbar/Navbar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '../CharacterCard/CharacterCard'
import './game.css'

const Game = () => {
    const [userState, setUserState] = useState('');
    const [compState, setCompState] = useState('');
    

    
    const compare = (user) => {
        const choices = ["rock", "paper", "scissors"];

        setCompState(choices[Math.floor(Math.random() * 3)])

        if (user === "rock" && compState === "scissors") {
            console.log("rock wins!");
          } else if (user === "rock" && compState === "paper") {
            console.log("paper wins!");
          } else if (user === "scissors" && compState === "paper") {
            console.log("scissors wins!")
          } else if (user === "scissors" && compState === "rock") {
            console.log("rock wins!")
          } else if (user === "paper" && compState === "rock") {
            console.log("paper wins!")
          } else if (user === "paper" && compState === "scissors") {
            console.log("scissors wins!")
          } else {
            console.log("It's a tie!")
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