import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';



export default function MediaCard() {

  return (
    <Card>
      <CardActionArea>
        <CardMedia
          id="character"
          component="img"
          height="150"
          image="./Jiraiya.jpg"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Character Name
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            From the depths the King of the Centaur's Dvorak has risen. 
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}