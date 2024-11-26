import {
  CHANGE_CHARACTER_NAME,
  GET_CHARACTERS_REQUEST,
  GET_CHARACTERS_SUCCESS,
  GET_FAVORITES_CHARACTERS_FAIL,
  GET_FAVORITES_CHARACTERS_REQUEST,
  GET_FAVORITES_CHARACTERS_SUCCESS,
  GET_MORE_CHARACTERS_REQUEST,
  GET_MORE_CHARACTERS_SUCCESS,
  GET_SINGLE_CHARACTER_REQUEST,
  GET_SINGLE_CHARACTER_SUCCESS,
  SET_FAVORITES,
} from "../actions/characters";
import Account from "../../services/Account";
import { isEmpty } from "lodash";

const initialState = {
  characters: [],
  status: "",
  page: 1,
  nextPageApi: "",
  singleCharacter: {},
  favorites: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_CHARACTERS_REQUEST: {
      return {
        ...state,
        status: "pending",
      };
    }

    case GET_MORE_CHARACTERS_REQUEST: {
      return {
        ...state,
      };
    }

    case GET_CHARACTERS_SUCCESS: {
      return {
        ...state,
        characters: [...action.payload.data.results],
        nextPageApi: action.payload.data.next,
        status: "success",
        favorites: Account.getFavorites(),
      };
    }

    case GET_MORE_CHARACTERS_SUCCESS: {
      return {
        ...state,
        characters: [...state.characters, ...action.payload.data.results],
        nextPageApi: action.payload.data.next,
      };
    }

    case GET_SINGLE_CHARACTER_REQUEST: {
      return {
        ...state,
        status: "pending",
        singleCharacter: {},
      };
    }

    case GET_SINGLE_CHARACTER_SUCCESS: {
      return {
        ...state,
        status: "success",
        singleCharacter: action.payload.data,
      };
    }

    case SET_FAVORITES: {
      return {
        ...state,
        favorites: action.payload.favorites,
      };
    }

    case GET_FAVORITES_CHARACTERS_REQUEST: {
      return {
        ...state,
        favorites: [],
        status: "pending",
      };
    }

    case GET_FAVORITES_CHARACTERS_SUCCESS: {
      return {
        ...state,
        favorites: action.payload.favorites,
        status: "success",
      };
    }

    case GET_FAVORITES_CHARACTERS_FAIL: {
      return {
        ...state,
        status: "fail",
      };
    }

    case CHANGE_CHARACTER_NAME: {
      const url = action.payload.url;
      if (!isEmpty(state.characters)) {
        const characterIndex = state.characters.findIndex((c) => c.url === url);
        if (characterIndex) {
          state.characters[characterIndex].name = action.payload.name;
        }
      }
      return {
        ...state,
      };
    }

    default: {
      return {
        ...state,
      };
    }
  }
}
