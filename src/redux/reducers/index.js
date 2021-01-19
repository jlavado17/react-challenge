import riskSelectorReducer from "./riskSelector";
import { combineReducers } from "redux";

export default combineReducers({ selectedRisk: riskSelectorReducer});