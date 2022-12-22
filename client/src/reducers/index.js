import { combineReducers } from "redux"

import AuthReducer from "./AuthReducer"
import GameReducer from "./GameReducer"

export const reducers = combineReducers({AuthReducer, GameReducer})