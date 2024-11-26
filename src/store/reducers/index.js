import { combineReducers } from "redux";
import account from "./account";
import characters from "./characters";
export default combineReducers({
  account,
  characters,
});
