import React, {useEffect, useState} from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Card from '../CharacterCard/CharacterCard';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import API from '../../utils/API';
import { useHistory } from "react-router-dom";
import './game.css';

const Game = () => {
    const [userState, setUserState] = useState({
        attack:"",
        chrName:""
    });
    const [compState, setCompState] = useState('');
    const [enemyState, setEnemyState] = useState({
        name:"",
        health:100,
        stamina:100,
        mana:100
    });
    const [displayState, setDisplayState] = useState({
        title:"",
        text:"",
        image:"",
        userEffect:"",
        enemyEffect:""
    });
    const [gameState, setGameState] = useState({
        phase: "exploring",
        encounters: 0,
        seenEncounters: [],
        userHealth: 100,
        maxMovement:7,
        currentMovement:0 
    });

    
    // Array for the battle options
    const redOptions = ["I try to hit them", "I start dancing like a butterfly", "I try to sting like a Bee", "Bite them in the ear"];
    const blueOptions = ["I wave my Turkey leg in the air", "I conjure a clone of myself ", "I use Rasengan", "I choose you Pickahu, lightning bolt"];
    const greenOptions = ["I dodge the attack", "I sneaked close and snapped in their ear", "I drop a smoke bomb", "Run at them naked"];

    // Arrays for directions
    const rightText = ["You go right, and walk over a dead body", "You walk a past a pitch black cave", "You step over a log"];
    const forwardText = ["You walk by two old men playing chess", "You cross a river", "You look ahead and see the most beautiful sight"];
    const leftText = ["You walk by a merchant", "You cross paths with an odd looking traveler", "You see a bear cub with their mother"];

    // Material UI Styling
    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
          },
        text: {
            color: "white",
            float: "right",
        },
        paper: {
            // padding: theme.spacing(2),
            textAlign: 'center',
            // color: theme.palette.text.secondary,
          },
    }));

    const classes = useStyles()

    // Handles the clicks for exploring 
    const exploringClick = (display) => {
        setDisplayState({...displayState, text:display}); 
        setGameState({...gameState, currentMovement:gameState.currentMovement+1})
    }
    
    // Handles click for the confirmation button/ Set up encounter
    const confirmClick = async () => {
        let flag = true
        let event; 

        do {
             event = await API.getRandomEvent();

            if (!gameState.seenEncounters.includes(event.id)) {
                flag = false
            }

        } while (flag) 
        
        console.log(event)
                gameState.seenEncounters.push(event.data.id)
                setDisplayState({...displayState, text:event.data.text, title:event.data.title})
                if (event.data.type === "Combat") {
                    setGameState({...gameState, phase:"encounter"})
                    setEnemyState({...enemyState, name:event.data.name})
                } else if (event.data.type === "Noncombat") {
                    setGameState({...gameState, phase:"NPC"})
                }
    }

    // Restarts the game
    const restartGame = () => {
        setGameState({...gameState, phase:"exploring", userHealth:100, currentMovement:0, encounters:0})
        console.log(gameState.userHealth)
        console.log(gameState.phase)
        setDisplayState({...displayState, text:"You awake from your sleep, all of your memories come rushing back to you, you know what you must do...", title:""})
    }

    // Checks the health of players
    const healthCheck = () => {
        if (gameState.userHealth <= 0) {
        setDisplayState({...displayState, text:"You've been defeated! Better luck next time!"});
        setGameState({...gameState, phase:"end"});
    } else if (enemyState.health <= 0) {
        setDisplayState({...displayState, text:"You defeated your Enemy! What direction do you want to go?", title:""});
        setGameState({...gameState, encounters:gameState.encounters +1, phase:"exploring", maxMovement:gameState.currentMovement+Math.floor(Math.random() *10) +3})
        setEnemyState({...enemyState, health:100})
        // API Call to save the current progress
        API.updateGame(gameState)
        console.log(gameState.encounters)
    }}

    // This for the non Combat events
    const npcEvent = () => {
        setDisplayState({...displayState, text:"You continue down your path", title:""})
        setGameState({...gameState, phase:"exploring", userHealth:gameState.userHealth + 10,maxMovement:gameState.currentMovement+Math.floor(Math.random() *10) +3})
    }
    
    // The battle between Comp and User
    const battle = () => {
        const choices = ["rock", "paper", "scissors"];

        setCompState(choices[Math.floor(Math.random() * 3)])

        if (userState.attack === "rock" && compState === "scissors") {
            console.log("User wins");
            setDisplayState({...displayState, text:"You drew blood!", enemyEffect:"-10"});
            setEnemyState({...enemyState, health:enemyState.health -10})
            console.log("User health:" + gameState.userHealth);
            console.log("Enemy health:" + enemyState.health);
            healthCheck()

          } else if (userState.attack === "rock" && compState === "paper") {
            console.log("Comp wins");
            console.log("Enemy health:" + enemyState.health)
            setDisplayState({...displayState, text:"Your Enemy was to fast for you and struck you", userEffect:"-5"})
            setGameState({...gameState, userHealth:gameState.userHealth -5})
            healthCheck()

          } else if (userState.attack === "scissors" && compState === "paper") {
            console.log("User wins");
            setDisplayState({...displayState, text:"You outsmarted your Enemy", enemyEffect:"-10"});
            setEnemyState({...enemyState, health:enemyState.health -10})
            console.log("User health:" + gameState.userHealth);
            console.log("Enemy health:" + enemyState.health);
            healthCheck()

          } else if (userState.attack === "scissors" && compState === "rock") {
            console.log("Comp wins");
            setDisplayState({...displayState, text:"Your were to slow this time", userEffect:"-5"})
            setGameState({...gameState, userHealth:gameState.userHealth -5})
            console.log("User health:" + gameState.userHealth);
            console.log("Enemy health:" + enemyState.health);
            healthCheck()

          } else if (userState.attack === "paper" && compState === "rock") {
            console.log("User wins");
            setDisplayState({...displayState, text:"You hit the Enemy", enemyEffect:"-10"});
            setEnemyState({...enemyState, health:enemyState.health -10})
            console.log("User health:" + gameState.userHealth);
            console.log("Enemy health:" + enemyState.health);
            healthCheck()

          } else if (userState.attack === "paper" && compState === "scissors") {
            console.log("Com wins!");
            setDisplayState({...displayState, text:"You've been hit", userEffect:"-5"});
            setGameState({...gameState, userHealth:gameState.userHealth -5})
            console.log("User health:" + gameState.userHealth);
            console.log("Enemy health:" + enemyState.health);
            healthCheck()

          } else {
            console.log("It's a tie!")
            setDisplayState({...displayState, text:"Battle was fierce but you each held your own"})
            healthCheck()
          }
    };
    
    // Start of the game
    // useEffect( () => {
    //     setDisplayState({...displayState, text:"You awake from your sleep, all of your memories come rushing back to you, you know what you must do..."})
    //     setGameState({...gameState, phase:"exploring"})
    // }, [])

    // Helps with battle
    useEffect( () => {
        if (userState.attack === "") return;
        battle(userState.attack)
        setUserState({...userState, attack:""})
    }, [userState.attack]);

    // Checks user for encounter 
    useEffect ( () => {
        if (gameState.currentMovement === gameState.maxMovement){
            setGameState({...gameState, phase:"confirm"})
            setDisplayState({...displayState, text:"You've stumbled on to an event!"})
        }        
    }, [gameState.currentMovement]);

    const history = useHistory();
    const navigateTo = () => history.push("/")

    console.log(gameState.currentMovement);
    console.log(gameState.maxMovement);

    return (
        <div>
        <Card/>
        <Box component= "div" display="inline"className={classes.root}>
            <Box component= "div" id="mainGame">
                <Box>
                    <Typography id="text" variant="h6">
                        {displayState.title}
                    </Typography>
                </Box>
                <Typography id="text" className={classes.text} variant="h3">
                    {displayState.text}
                </Typography>
                
            </Box>

            {/* Battle Phase */}
            {gameState.phase === "encounter" ? (
                <>
                <Box component= "div" id="mainGame">
                <Box>
                    <Typography id="text" variant="h6">
                        {displayState.title}
                    </Typography>
                </Box>
                <Typography id="text" className={classes.text} variant="h3">
                    {displayState.text}
                </Typography>
                <Typography>
                    {enemyState.name}
                    {enemyState.health}
                </Typography>
                <div className={classes.root}>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <Paper>{displayState.userEffect}</Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper>{displayState.enemyEffect}</Paper>
                    </Grid>
                </Grid>
                </div>
                
                </Box>
                <Box component= "div" id="container">
                    <Button id='red' onClick={() => setUserState({...userState, attack:'rock'})}>{redOptions[Math.floor(Math.random()*redOptions.length)]}</Button>
                    <Button id='blue' onClick={() => setUserState({...userState, attack:'paper'})}>{blueOptions[Math.floor(Math.random()*blueOptions.length)]}</Button>
                    <Button id='green' onClick={() => setUserState({...userState, attack:'scissors'})}>{greenOptions[Math.floor(Math.random()*greenOptions.length)]}</Button>
                </Box>
                </>
            ): null }
            
            {gameState.phase === "exploring" ? (
                <Box component= "div" id="container">
                    <Button id="red" onClick={() => exploringClick(leftText[Math.floor(Math.random()*leftText.length)])}>Left</Button>
                    <Button id="blue" onClick={() => exploringClick(forwardText[Math.floor(Math.random()*forwardText.length)])}>Forward</Button>
                    <Button id="green" onClick={() => exploringClick(rightText[Math.floor(Math.random()*rightText.length)])}>Right</Button>
                </Box>
            ): null }

            {gameState.phase === "confirm" ? (
                <Box component= "div" id="container">
                    <Button id="red" onClick={() => confirmClick()}>Investigate</Button>
                </Box>
            ): null }

            {gameState.phase === "NPC" ? (
                <Box component= "div" id="container">
                    <Button id="green" onClick={() => npcEvent()}>Continue</Button>
                </Box>
            ): null }

            {gameState.phase === "end" ? (
                <Box component= "div" id="container">
                    <Button id="red" onClick={() => restartGame()}>Try Again</Button>
                    
                        <Button id ="blue" onClick={navigateTo}>Main Menu</Button>
                    
                </Box>
            ): null }
                
        </Box>
        </div>
    )
}

export default Game;