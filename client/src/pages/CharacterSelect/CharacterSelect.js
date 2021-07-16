import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import FormField from "../../components/FormField";
import SelectButton from "../../components/SelectButton";
import { useAuth0 } from "@auth0/auth0-react";
import { useHistory } from "react-router-dom";
import API from "../../utils/API";
import "./characterselect.css";

export default function CharacterSelect() {
  const history = useHistory();
  const { user } = useAuth0();
  const userId = user.sub.split("|")[1];

  const useStyles = makeStyles({
    root: {
      maxWidth: 400,
    },
    media: {
      height: 400,
    },
  });
  const classes = useStyles();
  const [formField, setFormField] = useState({});
  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormField({ ...formField, [name]: value });
  }
  function formSubmit(event, charClass) {
    event.preventDefault();
    if (formField.warrior && formField.mage) {
      setFormField({ warrior: "", mage: "" });
      return;
    }
    if (formField.warrior) {
      API.createCharacter(userId, {
        name: formField.warrior,
        class: "Warrior",
      }).then((res) => {
        const charId = res.data.id;
        API.createGame(res.data.id).then((res) => {
          history.push(`/character/${charId}/user/${userId}`);
        });
      });
    } else if (formField.mage) {
      API.createCharacter(userId, {
        name: formField.mage,
        class: "Mage",
      }).then((res) => {
        const charId = res.data.id;
        API.createGame(res.data.id).then((res) => {
          history.push(`/character/${charId}/user/${userId}`);
        });
      });
    }
  }

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item sm={2} />
        <Grid item sm={3}>
          <Card className={classes.root}>
            <CardMedia
              className={classes.media}
              image="https://live.staticflickr.com/65535/51297013113_71c5d66e7d_w.jpg"
              title="https://www.deviantart.com/chaosringen/art/Swordman-536325555"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Warrior
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                A fierce swordsman on a quest to become the greatest knight.
              </Typography>
            </CardContent>
            <Container>
              <FormField
                onChange={handleInputChange}
                name="warrior"
                value={formField.name}
              />
            </Container>
          </Card>
        </Grid>
        <Grid item sm={2}>
          <Card className={classes.root}>
            <CardContent>
              <h2>Choose your character and add a custom name!</h2>
            </CardContent>
          </Card>
        </Grid>
        <Grid item sm={3}>
          <Card className={classes.root}>
            <CardMedia
              className={classes.media}
              image="https://live.staticflickr.com/65535/51296892783_ff5dc2707f_w.jpg"
              title="https://www.deviantart.com/gerryarthur/art/Leaena-573272592"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Mage
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                A cunning mage, setting out on their first quest out of their
                apprenticeship.
              </Typography>
            </CardContent>
            <Container>
              <FormField
                onChange={handleInputChange}
                name="mage"
                value={formField.name}
              />
            </Container>
          </Card>
        </Grid>
        <Grid item sm={12} className={classes.textAlignCen}>
          <SelectButton
            disabled={!formField.name}
            onClick={(event) => formSubmit(event, "Warrior")}
          />
        </Grid>
      </Grid>
    </div>
  );
}
