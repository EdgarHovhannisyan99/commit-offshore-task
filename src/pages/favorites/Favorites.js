import React, { useEffect } from "react";
import Account from "../../services/Account";
import { useDispatch, useSelector } from "react-redux";
import {
  getFavoritesAction,
  setFavorites,
} from "../../store/actions/characters";
import { isEmpty, xor } from "lodash";
import { CircularProgress } from "@mui/material";
import Character from "../../comonents/character/Character";
import { useNavigate } from "react-router-dom";

function Favorites(props) {
  const favorites = useSelector((state) => state.characters.favorites);
  const status = useSelector((state) => state.characters.status);
  const favoriteUrls = Account.getFavorites();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isEmpty(favoriteUrls)) {
      dispatch(getFavoritesAction(favoriteUrls));
    }
  }, []);

  const navigateToPreview = (id) => {
    navigate(`/characters/${id}`);
  };

  const handleLike = (ev, url) => {
    ev.stopPropagation();
    const updatedFavorites = xor(favoriteUrls, [url]);
    Account.setFavorites(updatedFavorites);
    dispatch(setFavorites(updatedFavorites));
    dispatch(getFavoritesAction(updatedFavorites));
  };

  return (
    <div className="character-container">
      <h1>Favorites</h1>
      <div className="character-box-container">
        {status === "pending" ? (
          <CircularProgress />
        ) : (
          !isEmpty(favorites) &&
          favorites.map((character, index) => (
            <Character
              index={index}
              navigateToPreview={navigateToPreview}
              character={character}
              handleLike={handleLike}
              favorites={favoriteUrls}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Favorites;
