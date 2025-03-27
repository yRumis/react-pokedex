import { useState } from "react";
import { searchPokemon } from "../api";

const Searchbar = () => {
  const [search, setSearch] = useState("pikachu");
  const [pokemon, setPokemon] = useState();

  const onChangeHandler = (e) => {
    setSearch(e.target.value);
  };

  const onSearchHandler = async (pokemon) => {
    const result = await searchPokemon(pokemon);
    setPokemon(result);
    console.log("search: ", result);
  };

  const onButtonClickHandler = () => {
    onSearchHandler(search);
  };

  return (
    <section className="searchbar-container">
      <div className="searchbar">
        <input
          placeholder="Buscar pokemon"
          onChange={onChangeHandler}
          value={search}
        />

        <div className="searchbar-btn">
          <button onClick={onButtonClickHandler}>Buscar</button>
        </div>
      </div>
      {pokemon ? (
        <div>
          <div>Nome: {pokemon.name}</div>
          <div>Peso: {pokemon.weight}</div>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        </div>
      ) : null}
    </section>
  );
};

export default Searchbar;
