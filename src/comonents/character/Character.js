import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Fab } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import { isEmpty } from "lodash";

export default function Character({
  character,
  index,
  navigateToPreview,
  handleLike,
  favorites,
}) {
  return (
    <div
      className="character-box"
      key={index}
      onClick={(ev) => navigateToPreview(index + 1)}
    >
      <div onClick={(ev) => handleLike(ev, character.url)} className="favorite-icon">
        <Fab size="small">
          {!isEmpty(favorites) && favorites.includes(character.url) ? (
            <FavoriteIcon fill={"blue"} size="10" />
          ) : (
            <FavoriteBorder fill={"blue"} size="10" />
          )}
        </Fab>
      </div>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          sx={{ height: 300 }}
          image={
            character.gender === "male"
              ? "/images/male.jpg"
              : "/images/female.png"
          }
          className={"character-image"}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {character.name}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Birth Year : {character.birth_year} <br />
            height : {character.height} <br />
            mass : {character.mass} <br />
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
