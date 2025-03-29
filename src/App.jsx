import { useCallback, useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Pokedex from "./components/Pokedex";
import Searchbar from "./components/Seachbar";
import { getPokemonData, getPokemons, searchPokemon } from "./api";
import { FavoritesProvider } from "./contexts/FavoritesContext";

const favoriteKey = "f";

function App() {
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [pokemons, setPokemons] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const itensPerPage = 25;
  const fetchPokemons = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getPokemons(itensPerPage, itensPerPage * page);
      const promises = data.results.map(async (pokemon) => {
        return await getPokemonData(pokemon.url);
      });
      const results = await Promise.all(promises);
      setPokemons(results);
      setLoading(false);
      setTotalPages(Math.ceil(data.count / itensPerPage));
      setNotFound(false);
    } catch (error) {
      console.log("fetchPokemons error: ", error);
    }
  }, [page]);

  const loadFavoritePokemons = useCallback(async () => {
    const pokemons = JSON.parse(window.localStorage.getItem(favoriteKey)) || [];
    setFavorites(pokemons);
  }, []);

  useEffect(() => {
    loadFavoritePokemons();
  }, [loadFavoritePokemons]);

  useEffect(() => {
    fetchPokemons();
  }, [fetchPokemons]);

  const updateFavoritePokemons = (name) => {
    const updatedFavorites = [...favorites];
    const favoriteIndex = favorites.indexOf(name);
    if (favoriteIndex >= 0) {
      updatedFavorites.splice(favoriteIndex, 1);
    } else {
      updatedFavorites.push(name);
    }

    window.localStorage.setItem(favoriteKey, JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites);
  };

  const onSearchHandler = async (pokemon) => {
    if (!pokemon) {
      fetchPokemons();
      return;
    }
    setLoading(true);
    setNotFound(false);
    const result = await searchPokemon(pokemon);
    if (!result) {
      setNotFound(true);
    } else {
      setPokemons([result]);
      setPage(0);
      setTotalPages(1);
    }
    setLoading(false);
  };

  return (
    <FavoritesProvider
      value={{
        favoritePokemons: favorites,
        updateFavoritePokemons: updateFavoritePokemons,
      }}
    >
      <div>
        <Navbar />
        <Searchbar onSearch={onSearchHandler} />
        {notFound ? (
          <div className="not-found-text"> Pokemon nao encontrado!</div>
        ) : (
          <Pokedex
            pokemons={pokemons}
            loading={loading}
            page={page}
            setPages={setPage}
            totalPages={totalPages}
          />
        )}
      </div>
    </FavoritesProvider>
  );
}

export default App;
