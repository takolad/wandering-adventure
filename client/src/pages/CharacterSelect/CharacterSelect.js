import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import FormField from '../../components/FormField';
import SelectButton from '../../components/SelectButton';
import './characterselect.css';





const useStyles = makeStyles({
    root: {
        maxWidth: 400,
    },
    media: {
        height: 140,
    },
});
export default function CharacterSelect() {
    const classes = useStyles();

    return (
        <div>
            <Grid container spacing={3}>
                <Grid item sm={3} />
                <Grid item sm={3}>
                    <Card className={classes.root}>
                        <CardActionArea>
                            <CardMedia
                                className={classes.media}
                                image="/static/images/cards/contemplative-reptile.jpg"
                                title="Contemplative Reptile"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    Warrior
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    A fierce swordsman on a quest to become the greatest knight in all the kingdom.
                                </Typography>
                            </CardContent>
                            <Container>
                                <FormField />
                                <SelectButton />
                            </Container>
                        </CardActionArea>
                    </Card>
                </Grid>
                <Grid item sm={3}>
                    <Card className={classes.root}>
                        <CardActionArea>
                            <CardMedia
                                className={classes.media}
                                image="/static/images/cards/contemplative-reptile.jpg"
                                title="Contemplative Reptile"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    Mage
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    A cunning mage, setting out on their first quest out of their apprenticeship.
                                </Typography>
                            </CardContent>
                            <Container>
                                <FormField />
                                <SelectButton />
                            </Container>
                        </CardActionArea>
                    </Card>
                </Grid>
                <Grid item sm={3} />
            </Grid>
        </div>
    );
};
