import axios from "axios";

export default {
  getRandomEvent: function () {
    return axios.get("/api/events/random");
  },
  getCharacters: function (user_id) {
    return axios.get("/api/characters/");
  },
  deleteCharacter: function (characterData) {
    return axios.delete("/api/characters", characterData);
  },
  updateCharacter: function (characterData) {
    return axios.put("/api/characters", characterData);
  },
};
