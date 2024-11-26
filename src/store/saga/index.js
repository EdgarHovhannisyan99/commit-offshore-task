import { all, fork } from "redux-saga/effects";
import characters from "./characters";
export default function* watchers() {
  yield all([characters].map(fork));
}
