import React from 'react';
import Navbar from '../Navbar/Navbar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

const Game = () => {

    return (
        <div>
        <Navbar/>
        <Box>
            <Button>Play</Button>
            <Button>Play</Button>
            <Button>Play</Button>
        </Box>
        </div>
    )
}

export default Game;