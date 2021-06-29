import axios from 'axios';

export default {
  getUser: (user_id) => axios.get('/api', user_id),
  getCharacter: (id) => axios.get('/api', id),
  deleteCharacter: (characterData) => axios.delete('/api', characterData),
};