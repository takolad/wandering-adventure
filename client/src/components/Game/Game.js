import React, {useEffect, useState} from 'react';
import Navbar from '../Navbar/Navbar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '../CharacterCard/CharacterCard'
import './game.css'

const Game = () => {
    const [userState, setUserState] = useState('')

    const comChoice = () => {
        let choice = Math.random();

        if (choice <= 0.33) {
            choice = "scissors";
        } else if (choice >= 0.34 ) {
            choice = "paper";
        } else if (choice >= 0.67) {
            choice = "rock";
        }

        return choice;
    }
    
    const compare = (choice1, choice2) => {
        if (choice1 === choice2) {
          return console.log("The result is a tie!");
        }
        
        if (choice1 === "rock") {
          if (choice2 === "scissors") {
            return console.log("rock wins");
          } else {
            if (choice2 === "paper") {
                return console.log("paper wins");
            }
          }
        }

        if (choice1 === "paper") {
          if (choice2 === "rock") {
            return console.log("paper wins");
          } else {
            if (choice2 === "scissors") {
              return "scissors wins";
            }
          }        
        }

        if (choice1 === "scissors") {
            if (choice2 === "paper") {
              return console.log("scissors wins");
            } else {
              if (choice2 === "rock") {
                return console.log("rock wins");
              }
            }
          }
    };
    
    useEffect( () => {
        compare(userState, comChoice())
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