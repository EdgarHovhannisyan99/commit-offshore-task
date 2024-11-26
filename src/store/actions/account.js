export const SET_ACCOUNT = "SET_ACCOUNT";

export function setAccount(account) {
  return {
    type: SET_ACCOUNT,
    payload: { account },
  };
}

export const LOG_OUT = "LOG_OUT";

export function logOut() {
  return {
    type: LOG_OUT,
  };
}
