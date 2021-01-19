import { SET_RISK } from "./actionTypes";

export const setRisk = selectedRiskLevel => ({
  type: SET_RISK,
  payload: selectedRiskLevel 
});