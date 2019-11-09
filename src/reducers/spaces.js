import {
  ADD_SPACES_ASYNC,
  ADD_SPACE_ASYNC,
  EDIT_SPACE_ASYNC,
  DELETE_SPACE_ASYNC,
  SELECT_SPACE
} from "../actions/types";

export default function spaces(state = [], action) {
  switch (action.type) {
    case ADD_SPACES_ASYNC:
      return action.spaces;
    case ADD_SPACE_ASYNC:
      // PREVIOUS CODE: return { ...action.space, current: true };
      return [...state, { ...action.space, current: false }];
    case EDIT_SPACE_ASYNC:
      return state.map(space => {
        return space.id === action.space.id
          ? {
              ...space,
              name: action.space.name,
              updatedAt: action.space.updatedAt
            }
          : space;
      });
    case DELETE_SPACE_ASYNC:
      return state.filter(space => space.id !== action.id);
    case SELECT_SPACE:
      return state.map(space => {
        if (space.id === action.id) {
          // 새로운 current space를 지정해준다
          return { ...space, current: true };
        } else if (space.current) {
          // 예전의 current space를 deselect
          return { ...space, current: false };
        } else {
          return space;
        }
        // PREVIOUS CODE: return space.id  === action.id ? { ...space, current: true } : space;
      });
    default:
      return state;
  }
}
