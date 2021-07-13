/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";

export default {
  // get all characters of specified user
  getCharacters: function (user_id) {
    return axios.get("/api/characters/" + user_id);
  },
  // get single character of specified user
  getCharacter: function (user_id, id) {
    return axios.get("/api/characters", {
      params: { user_id: user_id, id: id },
    });
  },
  createCharacter: function (user_id, characterData) {
    return axios.post("/api/characters", { user_id, characterData });
  },
  // delete character
  deleteCharacter: function (user_id, char_id) {
    return axios.delete("/api/characters/" + char_id, { params: { user_id } });
  },
  // update the character's stats as well as progress in a game (how many and which events seen)
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
  getRandomEvent: function () {
    return axios.get("/api/events/random");
  },
  getSeenEvents: function (char_id) {
    return axios.get("/api/events/" + char_id);
  },
  createGame: function (charID) {
    return axios.post("/api/games", { character_id: charID });
  },
  getActiveGamesByUser: function (user_id) {
    return axios.get("/api/games/active/" + user_id);
  },
  // call with event_id and game_id from state,
  updateGame: function (eventCount, game_id) {
    // pass game id AND event count
    return axios.put("/api/games/" + game_id, { event_count: eventCount });
  }, 
  // call with game id, event count AND status
  updateGame: function (game_id, eventCount, status) {
    return axios.put("/api/games/" + game_id, {
      status: status,
      event_count: eventCount,
    });
  },
};
