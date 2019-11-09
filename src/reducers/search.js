import { SEARCH_SPACE } from "../actions/types";

export default function searchSpace(state = "", action) {
  switch (action.type) {
    case SEARCH_SPACE:
      return action.searchTerm;

    default:
      return state;
  }
}
