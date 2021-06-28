import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';



export default function MediaCard() {

  const useStyles = makeStyles({
    root: {
    width: "406.5px",
    height: "698.18px",
    left: "34.52px",
    top: "130.41px"
    },
  });
  
  const classes = useStyles()

  return (

    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          id="character"
          component="img"
          // height="150"
          image="https://i.pinimg.com/474x/d0/90/08/d090082483f4dfe04ace7fdc07e3fe4c.jpg"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Character Name
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Character Bio: From the depths the King of the Centaur's Dvorak has risen. 
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}