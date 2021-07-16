import React, { createContext, useReducer, useContext } from "react";

const StoreContext = createContext();
const { Provider } = StoreContext;

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_CURRENT_CHAR":
      return {
        ...state,
        currentCharacter: action.char,
      };

    case "UPDATE_CHARS":
      return {
        ...state,
        characters: [...action.chars],
      };

    case "UPDATE_CURRENT_CHAR":
      return {
        ...state,
        currentCharacter: action.char,
      };

    case "ADD_CHAR":
      return {
        ...state,
        characters: [action.char, ...state.chars],
      };

    case "REMOVE_CHAR":
      return {
        ...state,
        characters: state.characters.filter((char) => {
          return char.id !== action.id;
        }),
      };

    case "SET_USER_ID":
      return {
        ...state,
        userID: action.userID,
      };

    default:
      return state;
  }
};

const StoreProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useReducer(reducer, {
    characters: [],
    currentCharacter: {
      id: 0,
      name: "",
      class: "",
      bio: "",
      stamina: 0,
      mana: 0,
    },
    userID: "",
  });

  return <Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = () => {
  return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };
