import { LOG_OUT, SET_ACCOUNT } from "../actions/account";
import Account from "../../services/Account";

const initialState = {
  account: {},
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_ACCOUNT: {
      return {
        ...state,
        account: action.payload.account,
      };
    }
    case LOG_OUT: {
      Account.logout();
      return {
        ...state,
        account: {},
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
}
