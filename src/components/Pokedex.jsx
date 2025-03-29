import { Pagination } from "./Pagination";
import { Pokemon } from "./Pokemon";

const Pokedex = (props) => {
  const { pokemons, loading, setPages, page, totalPages } = props;

  const onLeftClickHandler = () => {
    if (page > 0) {
      setPages(page - 1);
    }
  };

  const onRightClickHandler = () => {
    if (page + 1 !== totalPages) {
      setPages(page + 1);
    }
  };
  return (
    <section>
      <div className="pokedex-header">
        <h1>Pokedex</h1>
        <Pagination
          page={page + 1}
          totalPages={totalPages}
          onLeftClick={onLeftClickHandler}
          onRightClick={onRightClickHandler}
        />
      </div>
      {loading ? (
        <div>Carrengando, aguenta um pouco...</div>
      ) : (
        <div className="pokedex-grid">
          {pokemons?.map((pokemon, index) => {
            return <Pokemon pokemon={pokemon} key={index} />;
          })}
        </div>
      )}
    </section>
  );
};

export default Pokedex;
