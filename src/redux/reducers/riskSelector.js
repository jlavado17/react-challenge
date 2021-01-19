import { SET_RISK } from "../actions/actionTypes";

const initialState = {
  selectedRisk: {
    "risk_level": 0,
    "bonds": 0,
    "large_cap": 0,
    "mid_cap": 0,
    "foreign": 0,
    "small_cap": 0
  }
};

const riskSelector = (state = initialState, action) => {
  switch (action.type) {
    case SET_RISK: {
        return action.payload
    }
    default:
      return state;
  }
}

export default riskSelector;
