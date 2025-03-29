import { useContext } from "react";
import { FavoritesContext } from "../contexts/FavoritesContext";
const Navbar = () => {
  const { favoritePokemons } = useContext(FavoritesContext);
  const logoImg =
    "https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png";
  return (
    <nav>
      <div>
        <img alt="pokeapi-logo" src={logoImg} className="navbar-img" />
      </div>
      <div>{favoritePokemons.length}❤️</div>
    </nav>
  );
};

export default Navbar;
