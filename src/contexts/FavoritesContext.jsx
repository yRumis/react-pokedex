import React from "react";
export const FavoritesContext = React.createContext({
  favoritePokemons: [],
  updateFavoritePokemons: (id) => null,
});

export const FavoritesProvider = FavoritesContext.Provider;
