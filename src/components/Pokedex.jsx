import { Pagination } from "./Pagination";
import { Pokemon } from "./Pokemon";

const Pokedex = (props) => {
  const { pokemons, loading, page, totalPages } = props;
  console.log({ pokemons });
  return (
    <section>
      <div className="pokedex-header">
        <h1>Pokedex</h1>
        <Pagination page={page} totalPages={totalPages} />
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
