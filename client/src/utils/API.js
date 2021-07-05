import axios from "axios";

export default {
  getRandomEvent: function () {
    return axios.get("/api/events/random");
  },
  getCharacters: function (user_id) {
    return axios.get("/api/characters/");
  },
  getCharacter: function (user_id, id) {
    return axios.get("/api/characters/" + id);
  },
  deleteCharacter: function (user_id, id) {
    return axios.delete("/api/characters" + id);
  },
  updateCharacter: function (user_id, characterData) {
    return axios.put("/api/characters", characterData);
  },
};
