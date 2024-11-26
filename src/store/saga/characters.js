import { takeLatest, call, put } from "redux-saga/effects";
import {
  GET_CHARACTERS_FAIL,
  GET_CHARACTERS_REQUEST,
  GET_CHARACTERS_SUCCESS,
  GET_FAVORITES_CHARACTERS_REQUEST,
  GET_FAVORITES_CHARACTERS_SUCCESS,
  GET_MORE_CHARACTERS_REQUEST,
  GET_MORE_CHARACTERS_SUCCESS,
  GET_SINGLE_CHARACTER_FAIL,
  GET_SINGLE_CHARACTER_REQUEST,
  GET_SINGLE_CHARACTER_SUCCESS,
} from "../actions/characters";
import CharactersApi from "../../api/charactersApi";

export default function* watcher() {
  yield takeLatest(GET_CHARACTERS_REQUEST, handleGetCharacters);
  yield takeLatest(GET_MORE_CHARACTERS_REQUEST, handleGetMoreCharacters);
  yield takeLatest(GET_SINGLE_CHARACTER_REQUEST, handleGetSingleCharacters);
  yield takeLatest(GET_FAVORITES_CHARACTERS_REQUEST, handleFavoriteCharacters);
}

function* handleGetCharacters(action) {
  try {
    const { page, search } = action.payload;
    const { data } = yield call(CharactersApi.getAllCharacters, page, search);
    yield put({
      type: GET_CHARACTERS_SUCCESS,
      payload: {
        data: data,
      },
    });
  } catch (e) {
    yield put({
      type: GET_CHARACTERS_FAIL,
      payload: {
        massage: e.massage,
      },
    });
  }
}

function* handleGetMoreCharacters(action) {
  try {
    const { api } = action.payload;
    const { data } = yield call(CharactersApi.getCharacterNextPage, api);
    yield put({
      type: GET_MORE_CHARACTERS_SUCCESS,
      payload: {
        data: data,
      },
    });
  } catch (e) {
    yield put({
      type: GET_CHARACTERS_FAIL,
      payload: {
        massage: e.massage,
      },
    });
  }
}

function* handleGetSingleCharacters(action) {
  try {
    const { id } = action.payload;
    const { data } = yield call(CharactersApi.getSingleCharacter, id);
    yield put({
      type: GET_SINGLE_CHARACTER_SUCCESS,
      payload: {
        data: data,
      },
    });
  } catch (e) {
    yield put({
      type: GET_SINGLE_CHARACTER_FAIL,
      payload: {
        massage: e.massage,
      },
    });
  }
}

function* handleFavoriteCharacters(action) {
  try {
    const { favorites } = action.payload;
    const data = yield call(CharactersApi.getFavorites, favorites);
    yield put({
      type: GET_FAVORITES_CHARACTERS_SUCCESS,
      payload: {
        favorites: data,
      },
    });
  } catch (e) {
    yield put({
      type: GET_SINGLE_CHARACTER_FAIL,
      payload: {
        massage: e.massage,
      },
    });
  }
}
