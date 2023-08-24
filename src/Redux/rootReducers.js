import { combineReducers } from "redux";
import { combineEpics } from "redux-observable";
import { AllEpic } from "./myEpics";
import TodoReducer from "./Reducers/TodoReducer";
export const rootReducer = combineReducers({
  TodoReducer,
});

export const rootEpic = combineEpics(AllEpic);
