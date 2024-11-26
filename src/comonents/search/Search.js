import React, { useState } from "react";
import { InputBase, List, ListItem, CircularProgress } from "@mui/material";
import { useDispatch } from "react-redux";
import { getCharacters } from "../../store/actions/characters";
import SearchIcon from "@mui/icons-material/Search";
import { debounce, isEmpty } from "lodash";
import "./search.scss";
import CharactersApi from "../../api/charactersApi";

function Search(props) {
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(false);
  const dispatch = useDispatch();

  const fetchSuggestions = debounce(async (query) => {
    if (query.trim() === "") {
      setSuggestions([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const response = await CharactersApi.getSuggestions(query);
      setSuggestions(response.data.results);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    } finally {
      setLoading(false);
    }
  }, 300);

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearch(query);
    fetchSuggestions(query);
    if (!focused) {
      setFocused(true);
    }
    if (e.target.value === "") {
      setSuggestions([]);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    dispatch(getCharacters(1, search));
  };

  const handleSuggestionClick = (character) => {
    setSearch(character.name);
    setFocused(false);
    dispatch(getCharacters(1, character.name));
  };

  const handleInputFocus = () => {
    setFocused(true);
  };

  const handleBlur = (e) => {
    setTimeout(() => {
      setFocused(false);
    }, 150);
  };

  return (
    <div className="autocomplete-search" style={{ position: "relative" }}>
      <form
        onSubmit={handleSearchSubmit}
        style={{ display: "flex", alignItems: "center" }}
        className="search-form"
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search characters..."
          inputProps={{ "aria-label": "search" }}
          className="search-input"
          value={search}
          onFocus={handleInputFocus}
          onBlur={handleBlur}
          onChange={handleInputChange}
        />
        <button type="submit" style={{ border: "none", background: "none" }}>
          <SearchIcon cursor={"pointer"} />
        </button>
      </form>

      {focused && !isEmpty(suggestions) && (
        <List
          className="autocomplete-dropdown"
          style={{ position: "absolute", top: "100%", left: 0, right: 0 }}
        >
          {loading ? (
            <CircularProgress size={24} />
          ) : (
            suggestions.map((character, index) => (
              <ListItem
                key={index}
                className="autocomplete-item"
                onMouseDown={(e) => e.preventDefault()} // Prevent blur when clicking
                onClick={() => handleSuggestionClick(character)}
                style={{
                  cursor: "pointer",
                  padding: "8px 16px",
                  borderBottom: "1px solid #ddd",
                }}
              >
                {character.name}
              </ListItem>
            ))
          )}
        </List>
      )}
    </div>
  );
}

export default Search;
