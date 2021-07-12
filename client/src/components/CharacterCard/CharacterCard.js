import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';



export default function MediaCard(props) {

  const useStyles = makeStyles({
    root: {
    // width: "406.5px",
    // height: "698.18px",
    // left: "34.52px",
    // top: "130.41px"
    },
  });
  
  const classes = useStyles()

  return (

    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          id="character"
          component="img"
          image={props.img}
          title="Wandering Adventure"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.name}
          </Typography>
          <Typography>
            {props.health}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.bio}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}