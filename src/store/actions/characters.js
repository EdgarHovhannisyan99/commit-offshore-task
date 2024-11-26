export const GET_CHARACTERS_REQUEST = "GET_CHARACTERS_REQUEST";
export const GET_CHARACTERS_SUCCESS = "GET_CHARACTERS_SUCCESS";
export const GET_CHARACTERS_FAIL = "GET_CHARACTERS_FAIL";

export function getCharacters(page, search) {
  return {
    type: GET_CHARACTERS_REQUEST,
    payload: { page, search },
  };
}

export const GET_MORE_CHARACTERS_REQUEST = "GET_MORE_CHARACTERS_REQUEST";
export const GET_MORE_CHARACTERS_SUCCESS = "GET_MORE_CHARACTERS_SUCCESS";

export function getMoreCharacters(api) {
  return {
    type: GET_MORE_CHARACTERS_REQUEST,
    payload: { api },
  };
}

export const GET_SINGLE_CHARACTER_REQUEST = "GET_SINGLE_CHARACTER_REQUEST";
export const GET_SINGLE_CHARACTER_SUCCESS = "GET_SINGLE_CHARACTER_SUCCESS";
export const GET_SINGLE_CHARACTER_FAIL = "GET_SINGLE_CHARACTER_FAIL";

export function getSingleCharacter(id) {
  return {
    type: GET_SINGLE_CHARACTER_REQUEST,
    payload: { id },
  };
}

export const SET_FAVORITES = "SET_FAVORITES";

export function setFavorites(favorites) {
  return {
    type: SET_FAVORITES,
    payload: { favorites },
  };
}

export const GET_FAVORITES_CHARACTERS_REQUEST =
  "GET_FAVORITES_CHARACTERS_REQUEST";
export const GET_FAVORITES_CHARACTERS_SUCCESS =
  "GET_FAVORITES_CHARACTERS_SUCCESS";
export const GET_FAVORITES_CHARACTERS_FAIL = "GET_FAVORITES_CHARACTERS_FAIL";

export function getFavoritesAction(favorites) {
  return {
    type: GET_FAVORITES_CHARACTERS_REQUEST,
    payload: { favorites },
  };
}

export const CHANGE_CHARACTER_NAME = "CHANGE_CHARACTER_NAME";

export function changeChartName(url, name) {
  return {
    type: CHANGE_CHARACTER_NAME,
    payload: {
      name,
      url,
    },
  };
}
