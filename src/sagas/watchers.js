import { takeEvery, all } from "redux-saga/effects";
import {
  ADD_SPACES,
  ADD_SPACE,
  EDIT_SPACE,
  DELETE_SPACE,
  ADD_NOTES,
  ADD_NOTE,
  EDIT_NOTE,
  DELETE_NOTE
} from "../actions/types";
import {
  addSpacesAsync,
  addSpaceAsync,
  editSpaceAsync,
  deleteSpaceAsync
} from "./spaceWorkers";
import {
  addNotesAsync,
  addNoteAsync,
  editNoteAsync,
  deleteNoteAsync
} from "./noteWorkers";

export default function* rootSaga() {
  yield all([spacesSaga(), notesSaga()]);
}

// Space와 관련된 action이 들어올때 처리
function* spacesSaga() {
  yield all([
    addSpacesSaga(),
    addSpaceSaga(),
    editSpaceSaga(),
    deleteSpaceSaga()
  ]);
}

function* addSpacesSaga() {
  yield takeEvery(ADD_SPACES, addSpacesAsync);
}

function* addSpaceSaga() {
  yield takeEvery(ADD_SPACE, addSpaceAsync);
}

function* editSpaceSaga() {
  yield takeEvery(EDIT_SPACE, editSpaceAsync);
}

function* deleteSpaceSaga() {
  yield takeEvery(DELETE_SPACE, deleteSpaceAsync);
}

// Note와 관련된 action이 들어올때 처리
function* notesSaga() {
  yield all([addNotesSaga(), addNoteSaga(), editNoteSaga(), deleteNoteSaga()]);
}

function* addNotesSaga() {
  yield takeEvery(ADD_NOTES, addNotesAsync);
}

function* addNoteSaga() {
  yield takeEvery(ADD_NOTE, addNoteAsync);
}

function* editNoteSaga() {
  yield takeEvery(EDIT_NOTE, editNoteAsync);
}

function* deleteNoteSaga() {
  yield takeEvery(DELETE_NOTE, deleteNoteAsync);
}
