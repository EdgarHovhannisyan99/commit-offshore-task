export default class Account {
  static setToken = (token, account_type) => {
    localStorage.setItem("token", token);
    localStorage.setItem("account_type", account_type);
  };
  static getToken = () => {
    return localStorage.getItem("token") || "";
  };

  static setAccount = (account) => {
    return localStorage.setItem("account", JSON.stringify(account));
  };

  static getAccount = () => {
    return JSON.parse(localStorage.getItem("account")) || {};
  };

  static logout = () => {
    localStorage.removeItem("token");
    localStorage.clear();
  };

  static getFavorites = () => {
    return JSON.parse(localStorage.getItem("favorites")) || [];
  };

  static setFavorites = (favorites) => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  };
}
