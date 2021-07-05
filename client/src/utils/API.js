/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";

export default {
  getRandomEvent: function () {
    return axios.get("/api/events/random");
  },
  getCharacters: function (user_id) {
    return axios.get("/api/characters/" + user_id);
  },
  getCharacter: function (user_id, id) {
    return axios.get("/api/characters", {
      params: { user_id: user_id, id: id },
    });
  },
  deleteCharacter: function (user_id, id) {
    return axios.delete("/api/characters/" + id);
  },
  // update the character's stats as well as progress in a game (how many and which events seen)
  // user_id from auth0
  // characterData & eventID from state
  updateCharacter: function (user_id, characterData, eventID) {
    let eventLogData = {
      event_id: eventID,
      game_id: characterData.game.id,
    };
    const char = axios.put("/api/characters", { user_id, characterData });
    const evnt = axios.post("/api/eventlogs", eventLogData);

    axios
      .all([char, evnt])
      .then(
        axios.spread((...res) => {
          const charResponse = res[0];
          const evntResponse = res[1];
          console.log(charResponse);
          console.log(evntResponse);
          return res.json;
        })
      )
      .catch((err) => console.log(err));
  },
  getEventLog: function (id) {
    return axios.get("/api/eventlogs/:id");
  },
  getGame: function () {},
  // createEventLog: function (event_id, character_id) {
  //   return axios.post("/api/eventlogs", event_id, character_id);
  // },
};
