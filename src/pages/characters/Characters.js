import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  getCharacters,
  getMoreCharacters,
  setFavorites,
} from "../../store/actions/characters";
import Character from "../../comonents/character/Character";
import "./characters.scss";
import { useNavigate } from "react-router-dom";
import Account from "../../services/Account";
import { xor } from "lodash";
import Search from "../../comonents/search/Search";
import { CircularProgress } from "@mui/material";

function Characters() {
  const page = useSelector((state) => state.characters.page);
  const characters = useSelector((state) => state.characters.characters);
  const nextPageApi = useSelector((state) => state.characters.nextPageApi);
  const favorites = useSelector((state) => state.characters.favorites);
  const status = useSelector((state) => state.characters.status);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchCharacters = () => {
    if (nextPageApi) {
      dispatch(getMoreCharacters(nextPageApi));
    }
  };

  useEffect(() => {
    dispatch(getCharacters(page));
  }, []);

 const navigateToPreview = (url) => {
    const parts = url.split('/')
    const id = parts[parts.length - 2]
    navigate(`/characters/${id}`);
  };

  const handleLike = (ev, url) => {
    ev.stopPropagation();
    const updatedFavorites = xor(favorites, [url]);
    Account.setFavorites(updatedFavorites);
    dispatch(setFavorites(updatedFavorites));
  };

  return (
    <div className="character-container">
      <h1>Star Wars Characters</h1>
      <Search />
      {status === "pending" ? (
        <CircularProgress />
      ) : (
        <InfiniteScroll
          dataLength={characters?.length || 0}
          next={fetchCharacters}
          hasMore={!!nextPageApi}
          loader={<h4 className={"loading"}>Loading...</h4>}
        >
          <div className="character-box-container">
            {characters?.map((character, index) => (
              <Character
                index={index}
                navigateToPreview={navigateToPreview}
                character={character}
                handleLike={handleLike}
                favorites={favorites}
              />
            ))}
          </div>
        </InfiniteScroll>
      )}
    </div>
  );
}

export default Characters;
