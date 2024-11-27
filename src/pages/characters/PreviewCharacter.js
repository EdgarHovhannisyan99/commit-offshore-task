import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  changeChartName,
  getSingleCharacter,
  setFavorites,
} from "../../store/actions/characters";
import { Button, CircularProgress, Fab, Input } from "@mui/material";
import { isEmpty, xor } from "lodash";
import CharactersApi from "../../api/charactersApi";
import { IoArrowBack } from "react-icons/io5";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Account from "../../services/Account";
import { toast } from "react-toastify";

function PreviewCharacter(props) {
  const character = useSelector((store) => store.characters.singleCharacter);
  const loadingStatus = useSelector((store) => store.characters.status);
  const favorites = useSelector((state) => state.characters.favorites);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [homeWorld, setHomeWorld] = useState("");
  const [films, setFilms] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    dispatch(getSingleCharacter(id));
    return () => {
      setHomeWorld("");
      setFilms([]);
      setVehicles([]);
    };
  }, []);

  useEffect(() => {
    if (!isEmpty(character)) {
      setName(character.name);
      if (character.homeworld) {
        CharactersApi.getCharacterHomeWorld(character.homeworld).then((res) => {
          if (res) {
            setHomeWorld(res.data.name);
          }
        });
      }
      if (!isEmpty(character.films)) {
        getFilms(character.films).then((res) => {
          setFilms(res.map((response) => response.data.title));
        });
      }
      if (!isEmpty(character.vehicles)) {
        getVehicles(character.vehicles).then((res) => {
          setVehicles(res.map((response) => response.data.name));
        });
      }
    }
  }, [character]);

  const getFilms = async (films) => {
    return await Promise.all(
      films.map((url) => CharactersApi.getCharacterFilm(url)),
    ).then((res) => {
      return res;
    });
  };

  const getVehicles = async (films) => {
    return await Promise.all(
      films.map((url) => CharactersApi.getCharacterVehicles(url)),
    ).then((res) => {
      return res;
    });
  };

  const goBack = () => {
    navigate(-1);
  };

  const handleLike = (ev, url) => {
    ev.stopPropagation();
    const storageFavorites = Account.getFavorites();
    const updatedFavorites = xor(storageFavorites, [url]);
    Account.setFavorites(updatedFavorites);
    dispatch(setFavorites(updatedFavorites));
  };

  const handleSave = (ev) => {
    ev.preventDefault();
    dispatch(changeChartName(character.url, name));
    toast.success("Successfully Saved (But only in local redux store 🙂)", {
      autoClose: 4500,
    });
  };

  return (
    <div className="preview-character-container">
      {loadingStatus === "pending" ? (
        <CircularProgress />
      ) : (
        !isEmpty(character) && (
          <>
            <div className="preview-character-content">
              <div
                onClick={(ev) => handleLike(ev, character.url)}
                className="favorite-icon"
              >
                <Fab size="small">
                  {!isEmpty(favorites) && favorites.includes(character.url) ? (
                    <FavoriteIcon fill={"blue"} size="10" />
                  ) : (
                    <FavoriteBorder fill={"blue"} size="10" />
                  )}
                </Fab>
              </div>
              <div className="preview-character-img">
                <img
                  src={
                    character.gender === "male"
                      ? "/images/male.jpg"
                      : "/images/female.png"
                  }
                  alt=""
                />
              </div>
              <div className="preview-info">
                  <form onSubmit={handleSave}>
                    <Input
                        value={name}
                      onChange={(ev) => setName(ev.target.value)}
                    />
                    <Button type="submit" disabled={!name} variant="contained">
                      Save
                    </Button>
                  </form>
                <p>
                  <b>Birth Year</b> : {character.birth_year} <br />
                  <b>Height</b> : {character.height} <br />
                  <b>Mass</b> : {character.mass} <br />
                  <b>Hair color</b> : {character.hair_color} <br />
                  <b>Eye color</b> : {character.eye_color} <br />
                  <b>homeWorld </b>: {homeWorld} <br />
                  <b>Films:</b>{" "}
                  {films.length
                    ? films.map((film, index) => (
                        <span key={index}>
                          {film}
                          {index < films.length - 1 && ", "}{" "}
                        </span>
                      ))
                    : "n/a"}{" "}
                  <br />
                  <b>Vehicles:</b>{" "}
                  {vehicles.length
                    ? vehicles.map((vehicles, index) => (
                        <span key={index}>
                          {vehicles}
                          {index < vehicles.length - 1 && ", "}{" "}
                        </span>
                      ))
                    : "n/a"}
                </p>
              </div>
            </div>
            <div className="go-back">
              <IoArrowBack onClick={goBack} cursor={"pointer"} />{" "}
              <span onClick={goBack}>
                <b>Go Back</b>
              </span>
            </div>
          </>
        )
      )}
    </div>
  );
}

export default PreviewCharacter;
