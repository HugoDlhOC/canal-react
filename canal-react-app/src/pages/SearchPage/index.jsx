import { useEffect, useState } from "react";
import emptyImage from "../../data/images/empty_image.png";

const SearchPage = () => {
  const API_KEY = "ade02ea5f909697eb890e5479757edf0";
  const urlApi = "search/movie";
  const [inputValue, setInputValue] = useState("undefinedundefined"); //%20 = space keyboard key
  const [data, setData] = useState(undefined);

  //fetch data
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/${urlApi}?api_key=${API_KEY}&language=fr&query=${inputValue}`
    )
      .then((promise) => promise.json())
      .then((data) => {
        setData(data.results);
        console.log(data.results);
      });
  }, [inputValue]);

  const handleChange = (e) => {
    setInputValue(e.currentTarget.value);
  };

  console.log(inputValue);
  console.log(data);
  return (
    <div className="search_container">
      <input
        className="search_container__input"
        placeholder="Avatar, Lupin ..."
        onChange={handleChange}
      />
      {data !== undefined && data.length !== 0 ? (
        <section className="search_container__results_container results_container">
          {data.map((item, key) => (
            <img
              className="images_container__image"
              key={key}
              src={
                item.poster_path !== null
                  ? "https://image.tmdb.org/t/p/original/" + item.poster_path
                  : emptyImage
              }
            />
          ))}
        </section>
      ) : (
        ""
      )}
    </div>
  );
};

export default SearchPage;
