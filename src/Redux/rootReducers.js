import { combineReducers } from "redux";
import { combineEpics } from "redux-observable";
import { AllEpic } from "./myEpics";
export const rootReducer = combineReducers({});

export const rootEpic = combineEpics(AllEpic);
