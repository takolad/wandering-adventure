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
          image="https://c10.patreonusercontent.com/3/eyJxIjoxMDAsIndlYnAiOjB9/patreon-media/p/post/52645893/8eb208ae2c2642428f70195a31095da5/1.png?token-time=1625788800&token-hash=wD3C3iyQIVP6oCbboNKu0hPtjhipAxFZUvB-VDpem9c%3D"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Character Name
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
            across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}