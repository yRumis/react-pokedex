import { useState } from "react";

const Searchbar = (props) => {
  const [search, setSearch] = useState("pikachu");
  const { onSearch } = props;

  const onChangeHandler = (e) => {
    setSearch(e.target.value);
    if (e.target.value.length === 0) {
      onSearch(undefined);
    }
  };

  const onButtonClickHandler = () => {
    onSearch(search);
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
    </section>
  );
};

export default Searchbar;
