import React, { useEffect, useState } from "react";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Card from "../CharacterCard/CharacterCard";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { useAuth0 } from "@auth0/auth0-react";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import warrior from "../../pages/CharacterSelect/warrior.jpeg";
import "./game.css";

const Game = (props) => {
  const [userState, setUserState] = useState({
    id: "",
    attack: "",
    name: "",
    health: 100,
    stamina: 0,
    mana: 0,
    img: "https://via.placeholder.com/150x200?text=Loading...",
    bio: "Loading...",
  });
  const [compState, setCompState] = useState("");
  const [enemyState, setEnemyState] = useState({
    name: "The Island",
    health: 1,
    stamina: 100,
    mana: 100,
    bio: "Tread carefully, you dont know who or what will attack you",
    img: "https://i.pinimg.com/originals/55/15/8c/55158c9f1515b9f7afb257b312cc4e48.jpg",
  });
  const [displayState, setDisplayState] = useState({
    title: "",
    text: "",
    userEffect: "",
    enemyEffect: "",
  });
  const [gameState, setGameState] = useState({
    phase: "exploring",
    encounters: 0,
    seenEncounters: [],
    currentEventID: 0,
    maxMovement: 7,
    currentMovement: 0,
    gameID: 0,
    currHealth: 100,
  });

  const { user } = useAuth0();
  const USERID = user.sub.split("|")[1];

  // Array for the battle options
  const redOptions = [
    "Throw a mean right hook",
    "Start dancing like a butterfly",
    "Sting them like a Bee",
    "Bite them in the ear",
    "German Suplex",
    "Round house kick",
    "You activated my trap card!",
  ];
  const blueOptions = [
    "I wave my Turkey leg in the air",
    "Shadow Clone Jutsu!",
    "Rasengan!",
    "I choose you Pickahu, lightning bolt",
    "Expecto Patronum!",
    "I summon Baby Dragon!",
  ];
  const greenOptions = [
    "Dodge and strike",
    "Sneak in close and snapped in their ear",
    "Drop a smoke bomb",
    "Run at them naked",
    "Throw shuriken at their feet",
    "Ultra Instinct",
    "Kamehameha!",
    "Wingardium Leviosa!",
  ];

  // Arrays for directions
  const rightText = [
    "You go right, and walk over a dead body",
    "You walk past by a creepy pitch black cave, you can feel a dark aura from it",
    "You find a tree fallen over after a storm, you crawl under it",
    "You stumbled open large steps, once you're on top, you slip and fall down",
    "You're walking along the road and you see a volcano erupt",
  ];
  const forwardText = [
    "You walk by two old men playing chess on the side of road",
    "You find a raging river, you build a raft and sail down the river",
    "You look ahead and see the most beautiful sight",
    "You trip over a stone, you  look at it and it says 'Goodluck'",
    "You get lost in thought and your foot falls through  the ground. You take a closer look and you catch a whiff of death. You keep moving.",
  ];
  const leftText = [
    "You walk by a merchant, selling clothes. They yell to get your attention, you keep looking forward",
    "You cross paths with an odd looking traveler with a staff, you steady your hand ready for attack. They give you a nod and keep moving",
    "You take a breath, as you sit you see a bear cub playing with their mother through the brush",
    "As you're eating dinner, you hear a noise. You grab your weapon.... you're blinded by light and see beautiful stag",
    "You gradually start to get cold, you see a heard of buffalo pass you by. They run around you, you stand in place",
  ];

  // Material UI Styling
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    text: {
      color: "white",
    },
  }));

  const classes = useStyles();

  // Handles the clicks for exploring
  const exploringClick = (display) => {
    setDisplayState({ ...displayState, text: display });
    setGameState({
      ...gameState,
      currentMovement: gameState.currentMovement + 1,
    });
  };

  // Handles click for the confirmation button/ Set up encounter
  const confirmClick = async () => {
    let flag = true;
    let event;

    do {
      event = await API.getRandomEvent();
      // console.log("seen: ", gameState.seenEncounters);
      // console.log("drawn: ", event.data.id);
      if (!gameState.seenEncounters.includes(event.data.id)) {
        flag = false;
      }
    } while (flag || gameState.seenEncounters.length > 19);

    gameState.seenEncounters.push(event.data.id);
    setDisplayState({
      ...displayState,
      text: event.data.text,
      title: event.data.title,
    });
    setEnemyState({
      ...enemyState,
      name: event.data.npc.name,
      health: event.data.npc.health,
      bio: event.data.npc.bio,
      img: event.data.imageUrl,
    });
    if (event.data.type === "Combat") {
      setGameState({
        ...gameState,
        currentEventID: event.data.id,
        phase: "encounter",
      });
    } else if (event.data.type === "Noncombat") {
      setGameState({ ...gameState, phase: "NPC" });
    }
    console.log("GS seenEnc :" + gameState.seenEncounters);
  };

  // Restarts the game
  const restartGame = () => {
    // get saved stats
    getCharInfo(userState.id); // loads to last state
    setDisplayState({
      ...displayState,
      text: "You awake from your sleep, all of your memories come rushing back to you, you know what you must do...",
      title: "",
    });
    setGameState({
      ...gameState,
      currentMovement: gameState.currentMovement - 7,
    });
    setEnemyState({
      ...enemyState,
      name: "The Island",
      health: 1,
      stamina: 100,
      mana: 100,
      bio: "Tread carefully, you dont know who or what will attack you",
      img: "https://i.pinimg.com/originals/55/15/8c/55158c9f1515b9f7afb257b312cc4e48.jpg",
    });
  };

  // This for the non Combat events
  const npcEvent = () => {
    const healthBelow90 = gameState.currHealth <= 90;
    setDisplayState({
      ...displayState,
      text: "You continue on your adventure",
      title: "",
    });
    setUserState({
      ...userState,
      health: healthBelow90 ? userState.health + 10 : 100,
    });
    setGameState({
      ...gameState,
      currHealth: healthBelow90 ? gameState.currHealth + 10 : 100,
      phase: "exploring",
      maxMovement:
        gameState.currentMovement + Math.floor(Math.random() * (8 - 3) + 1) + 3,
    });
    setEnemyState({
      ...enemyState,
      health: 100,
      bio: "Explore the world!",
      name: "The World",
      img: "https://i.pinimg.com/originals/55/15/8c/55158c9f1515b9f7afb257b312cc4e48.jpg",
    });
  };

  // The battle between Comp and User
  const battle = () => {
    const choices = ["rock", "paper", "scissors"];
    let crit = false;
    console.log("users attack: ", userState.attack);

    setCompState(choices[Math.floor(Math.random() * 3)]);
    const randomDamage = Math.floor(Math.random() * (25 - 10 + 1)) + 10;
    if (randomDamage > 15) {
      crit = true;
    }

    if (userState.attack === "rock" && compState === "scissors") {
      setDisplayState({
        ...displayState,
        text: crit
          ? `You crit the enemy for ${randomDamage} damage!`
          : "You drew blood!",
        enemyEffect: `- ${randomDamage}`,
      });
      setEnemyState({
        ...enemyState,
        health: enemyState.health - randomDamage,
      });
    } else if (userState.attack === "rock" && compState === "paper") {
      setDisplayState({
        ...displayState,
        text: "Your Enemy was too fast for you and struck you",
        userEffect: "-10",
      });
      setGameState({ ...gameState, currHealth: gameState.currHealth - 10 });
      // takeDamage();
    } else if (userState.attack === "scissors" && compState === "paper") {
      setDisplayState({
        ...displayState,
        text: crit
          ? `You crit the enemy for ${randomDamage} damage!`
          : "You outsmarted your enemy!",
        enemyEffect: `- ${randomDamage}`,
      });
      setEnemyState({
        ...enemyState,
        health: enemyState.health - randomDamage,
      });
    } else if (userState.attack === "scissors" && compState === "rock") {
      setDisplayState({
        ...displayState,
        text: "Your were too slow this time",
        userEffect: "-10",
      });
      setGameState({ ...gameState, currHealth: gameState.currHealth - 10 });
      // takeDamage();
    } else if (userState.attack === "paper" && compState === "rock") {
      setDisplayState({
        ...displayState,
        text: crit
          ? `You crit the enemy for ${randomDamage} damage!`
          : "Your attack makes contact!",
        enemyEffect: randomDamage,
      });
      setEnemyState({
        ...enemyState,
        health: enemyState.health - randomDamage,
      });
    } else if (userState.attack === "paper" && compState === "scissors") {
      setDisplayState({
        ...displayState,
        text: "You've been hit",
        userEffect: "-10",
      });
      setGameState({ ...gameState, currHealth: gameState.currHealth - 10 });
      // takeDamage();
    } else {
      setDisplayState({
        ...displayState,
        text: "Your strikes clashes with that of the enemy, the battle continues!",
      });
    }
  };

  // this doesn't work
  function takeDamage() {
    const dmg = 10;
    setUserState({
      ...userState,
      health: userState.health - dmg,
    });
    console.log("user took damage");
  }

  // Start of the game
  useEffect(() => {
    console.log("userEffect ran, reset to DB");
    const { gameId, userId, charId } = props.match.params;
    getCharInfo(charId); // bookmark
    API.getSeenEvents(charId)
      .then((res) => {
        // console.log("getSeenE res:", res.data);
        if (res.data.length > 0) {
          res.data.map((event) => {
            return gameState.seenEncounters.push(event.id);
          });
        } else {
          return;
        }
      })
      .catch((err) => console.log(err));
    setDisplayState({
      ...displayState,
      text: `You suddenly find yourself on an island, you cant remember anything. A voice in your head speaks, \"You will be tested by ${
        4 - gameState.encounters
      } enemies\". You can feel this to be true in your bones. You decide that forward is the way out...`,
      title: "Who are you?",
    });
    if (gameState.seenEncounters.length > 0) {
      console.log("GS seenEnc", gameState.seenEncounters);
    } else {
      console.log("no GS seenEnc");
    }
  }, []);

  // Helps with battle
  useEffect(() => {
    if (userState.attack === "") return;
    battle();
    setUserState({ ...userState, attack: "" });
  }, [userState.attack]);

  // Health check
  useEffect(() => {
    console.log("health check: ", gameState.currHealth);
    if (gameState.currHealth <= 0) {
      setDisplayState({
        ...displayState,
        text: "You've been defeated! Better luck next time!",
      });
      setGameState({ ...gameState, phase: "end" });
    } else if (enemyState.health <= 0) {
      setDisplayState({
        ...displayState,
        text: "You defeated your enemy! What direction do you want to go?",
        title: "",
      });
      setGameState({
        ...gameState,
        encounters: gameState.encounters + 1,
        phase: "exploring",
        maxMovement:
          gameState.currentMovement +
          Math.floor(Math.random() * (8 - 3) + 1) +
          3,
      });
      setEnemyState({
        ...enemyState,
        health: 100,
        name: "The World",
        bio: "Explore the world",
        img: "https://i.pinimg.com/originals/55/15/8c/55158c9f1515b9f7afb257b312cc4e48.jpg",
      });
      //API call to save game progress
      const characterData = {
        id: userState.id,
        health: gameState.currHealth >= 0 ? gameState.currHealth : 0,
        stamina: userState.stamina ? userState.stamina : 0,
        mana: userState.mana ? userState.mana : 0,
        game: {
          id: gameState.gameID,
        },
      };
      updateCharacterAndGame(characterData);
    }
  }, [gameState.currHealth, enemyState.health]);

  // Checks user for encounter
  useEffect(() => {
    if (gameState.currentMovement === gameState.maxMovement) {
      setGameState({ ...gameState, phase: "confirm" });
      setDisplayState({
        ...displayState,
        text: "You've stumbled on to an event!",
      });
    }
  }, [gameState.currentMovement]);

  // update the character and game in DB
  function updateCharacterAndGame(charData) {
    console.log("update DB called");
    try {
      API.updateCharacter(USERID, charData, gameState.currentEventID);
      if (gameState.encounters < 4) {
        API.updateGame(gameState.gameID, gameState.encounters + 1);
      } else {
        // completed game save
        API.updateGameFull(
          gameState.gameID,
          gameState.encounters + 1,
          "Inactive"
        );
      }
    } catch (err) {
      console.log(err);
    }
  }

  function getCharInfo(charId) {
    API.getCharacter(USERID, charId).then((res) => {
      let lowHealth = false;
      if (res.data.health <= 30) {
        lowHealth = true;
      }
      console.log("API call for char");
      console.log("HERE!", res.data);
      if (res.data.class === "Mage") {
        console.log("setting MAGE stats from DB");
        setUserState({
          ...userState,
          id: res.data.id,
          name: res.data.name,
          health: lowHealth ? res.data.health + 20 : res.data.health,
          mana: res.data.mana,
          img: "https://live.staticflickr.com/65535/51296892783_ff5dc2707f_w.jpg",
          bio: "A cunning mage, setting out on their first quest out of their apprenticeship.",
        });
      } else if (res.data.class === "Warrior") {
        console.log("setting Warrior stats from DB");
        setUserState({
          ...userState,
          id: res.data.id,
          name: res.data.name,
          health: lowHealth ? res.data.health + 20 : res.data.health,
          stamina: res.data.stamina,
          img: warrior,
          bio: "A fierce swordsman on a quest to become the greatest knight.",
        });
      } else {
        setUserState({
          ...userState,
          charName: "Character Not Found",
          bio: "",
        });
      }
      setGameState({
        ...gameState,
        currHealth: lowHealth ? res.data.health + 20 : res.data.health,
        encounters: res.data.game.event_count,
        gameID: res.data.game.id,
        phase: "exploring",
      });
    });
  }

  // Boss Fight and Ending Scene
  useEffect(() => {
    //Boss Fight
    if (gameState.encounters === 4) {
      setGameState({
        ...gameState,
        phase: "encounter",
      });
      setDisplayState({
        ...displayState,
        title: "Where am I!?",
        text: "You are suddenly teleported infront of a Dark Mage. You recognize the jewel on his staff, it's the Legendary Fox Fire. The Dark Mage is Dragorim the Black!",
      });
      setEnemyState({
        ...enemyState,
        name: "Dragorim the Black",
        health: 100,
        stamina: 100,
        mana: 100,
        bio: "The most notorious mage known for human sacrificing to draw more power. He draws all his power from the Fox Fire.",
        img: "https://i.redd.it/z8juypra2ce31.jpg",
      });
    }
    //Ending Scene
    if (gameState.encounters === 5) {
      setGameState({
        ...gameState,
        phase: "end",
      });
      setDisplayState({
        ...displayState,
        title: "I need a drink",
        text: `You defeated, Dragorim! You grab and smash the Fox Fire to pieces. You are suddenly teleported outside of a tavern. All of your memories come back, you remember you were here with your companions. As you walk in you are being called to a table by your companions calling, \"Hurry up ${userState.name}, it is your turn!\"`,
      });
      setEnemyState({
        ...enemyState,
        name: "The Winking Skeever",
        health: 100,
        stamina: 100,
        mana: 100,
        bio: "The regular meeting spot for your group, Rebels of Fortune.",
        img: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/d297121a-919b-4f18-9163-78f08879b333/d7exfcc-8877ab0e-31c7-4be8-b5cf-2a44e2b65631.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2QyOTcxMjFhLTkxOWItNGYxOC05MTYzLTc4ZjA4ODc5YjMzM1wvZDdleGZjYy04ODc3YWIwZS0zMWM3LTRiZTgtYjVjZi0yYTQ0ZTJiNjU2MzEuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.9uNrg5ItCE1-SV_LEmovKxPrpf_AOZuP9MRLxL3Yzq4",
      });
      //API call to set game to inactive (complete?)
      const characterData = {
        id: userState.id,
        health: gameState.currHealth,
        stamina: userState.stamina ? userState.stamina : 0,
        mana: userState.mana ? userState.mana : 0,
        game: {
          id: gameState.gameID,
        },
      };
      updateCharacterAndGame(characterData);
      // CAMEL
    }
  }, [gameState.encounters]);

  // console.log("currMov:", gameState.currentMovement);
  // console.log("maxMov:", gameState.maxMovement);
  console.log("gameState 500: ", gameState);
  console.log("userState 501: ", userState);
  console.log("enemyState 502: ", enemyState);

  return (
    <Grid container>
      <Grid item xs={3}>
        <Card
          name={userState.name}
          health={gameState.currHealth}
          img={userState.img}
          bio={userState.bio}
        />
      </Grid>
      <Grid item xs={6} justifycontent="space-between">
        <Grid container id="gameSub">
          <Grid item xs={12}>
            <Typography id="text" variant="h3">
              {displayState.title}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography id="text" className={classes.text} variant="h4">
              {displayState.text}
            </Typography>
          </Grid>

          <Grid item className="buttons" xs={12}>
            {/* Battle Phase */}
            {gameState.phase === "encounter" ? (
              <>
                <Box component="div" id="mainGame">
                  <div className={classes.root}></div>
                </Box>
                <Box component="div" id="container">
                  <Button
                    id="red"
                    onClick={() =>
                      setUserState({ ...userState, attack: "rock" })
                    }
                  >
                    {redOptions[Math.floor(Math.random() * redOptions.length)]}
                  </Button>
                  <Button
                    id="blue"
                    onClick={() =>
                      setUserState({ ...userState, attack: "paper" })
                    }
                  >
                    {
                      blueOptions[
                        Math.floor(Math.random() * blueOptions.length)
                      ]
                    }
                  </Button>
                  <Button
                    id="green"
                    onClick={() =>
                      setUserState({ ...userState, attack: "scissors" })
                    }
                  >
                    {
                      greenOptions[
                        Math.floor(Math.random() * greenOptions.length)
                      ]
                    }
                  </Button>
                </Box>
              </>
            ) : null}
            {gameState.phase === "exploring" ? (
              <Box component="div" id="container">
                <Button
                  id="red"
                  onClick={() =>
                    exploringClick(
                      leftText[Math.floor(Math.random() * leftText.length)]
                    )
                  }
                >
                  Left
                </Button>
                <Button
                  id="blue"
                  onClick={() =>
                    exploringClick(
                      forwardText[
                        Math.floor(Math.random() * forwardText.length)
                      ]
                    )
                  }
                >
                  Forward
                </Button>
                <Button
                  id="green"
                  onClick={() =>
                    exploringClick(
                      rightText[Math.floor(Math.random() * rightText.length)]
                    )
                  }
                >
                  Right
                </Button>
              </Box>
            ) : null}
            {gameState.phase === "confirm" ? (
              <Box component="div" id="container">
                <Button id="red" onClick={() => confirmClick()}>
                  Investigate
                </Button>
              </Box>
            ) : null}
            {gameState.phase === "NPC" ? (
              <>
                <Box component="div" id="mainGame">
                  <div className={classes.root}>
                    {/* <Grid container spacing={3}>
                        <Grid item xs={6}>
                          <Paper>{displayState.userEffect}</Paper>
                        </Grid>
                        <Grid item xs={6}>
                          <Paper>{displayState.enemyEffect}</Paper>
                        </Grid>
                      </Grid> */}
                  </div>
                </Box>
                <Box component="div" id="container">
                  <Button id="green" onClick={() => npcEvent()}>
                    Continue
                  </Button>
                </Box>
              </>
            ) : null}
            {gameState.phase === "end" ? (
              <Box component="div" id="container">
                <Button id="red" onClick={() => restartGame()}>
                  Try Again
                </Button>

                <Link to="/">
                  <Button id="blue">Main Menu</Button>
                </Link>
              </Box>
            ) : null}
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={3}>
        <Card
          name={enemyState.name}
          health={enemyState.health}
          bio={enemyState.bio}
          img={enemyState.img}
        />
      </Grid>
    </Grid>
  );
};

export default Game;
