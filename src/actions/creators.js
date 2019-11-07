import {
  ADD_SPACES,
  ADD_SPACE,
  EDIT_SPACE,
  DELETE_SPACE,
  SELECT_SPACE,
  SEARCH_SPACE,
  ADD_NOTES,
  ADD_NOTE,
  EDIT_NOTE,
  DELETE_NOTE,
  CHANGE_TIMESTAMP,
  CHANGE_CURRTIME
} from "./types";

// Note: These are all action creators that are called in the component level
// (before fetching). Thus, the format for the addSpaces and addNotes actions
// are different from their async counterparts.
export function addSpaces() {
  return { type: ADD_SPACES };
}

export function addSpace(space) {
  return { type: ADD_SPACE, space };
}

export function editSpace(name, id) {
  return { type: EDIT_SPACE, name, id };
}

export function deleteSpace(id) {
  return { type: DELETE_SPACE, id };
}

export function selectSpace(id) {
  return { type: SELECT_SPACE, id };
}

export function searchSpace(searchTerm) {
  return { type: SEARCH_SPACE, searchTerm };
}

export function addNotes(spaceId) {
  return { type: ADD_NOTES, spaceId };
}

export function addNote(note) {
  return { type: ADD_NOTE, note };
}

export function editNote(note) {
  return { type: EDIT_NOTE, note };
}

export function deleteNote(id) {
  return { type: DELETE_NOTE, id };
}

export function changeTimestamp(time) {
  return { type: CHANGE_TIMESTAMP, time };
}

export function changeCurrTime(time) {
  return { type: CHANGE_CURRTIME, time };
}
