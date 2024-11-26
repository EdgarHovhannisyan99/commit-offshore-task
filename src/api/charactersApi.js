import axios from "axios";

export default class CharactersApi {
  static async getAllCharacters(page = 1, search = "") {
    return await axios.get(
      `https://swapi.dev/api/people?page=1&search=${search ? search : ""}`,
    );
  }

  static async getCharacterNextPage(api) {
    return await axios.get(api);
  }

  static async getSingleCharacter(id) {
    return await axios.get(`https://swapi.dev/api/people/${id}`);
  }

  static async getCharacterFilm(api) {
    return await axios.get(api);
  }

  static async getCharacterVehicles(api) {
    return await axios.get(api);
  }

  static async getCharacterHomeWorld(api) {
    return await axios.get(api);
  }

  static async getFavorites(favoriteUrls) {
    const characterPromises = favoriteUrls.map((url) =>
      axios.get(url).then((res) => res.data),
    );
    return await Promise.all(characterPromises);
  }

  static async getSuggestions(query) {
    return await axios.get(`https://swapi.dev/api/people?search=${query}`);
  }
}
