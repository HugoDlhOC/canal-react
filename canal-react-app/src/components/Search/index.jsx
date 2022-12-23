import { useContext, useEffect, useState } from "react";
import { apiFunction } from "../../services/callsApi";
import CanalHomeContext from "../../context/CanalHomeContext";
import Image from "../Image";
import Modal from "../Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const Search = () => {
  const API_KEY = "ade02ea5f909697eb890e5479757edf0";
  const [typeOfSearch, setTypeOfSearch] = useState("movie");
  const urlApi = `search/${typeOfSearch}`;
  const [counter, setCounter] = useState(1);
  const [inputValue, setInputValue] = useState("avengers"); //%20 = space keyboard key
  const [startSearch, setStartSearch] = useState(0);
  const optionalParameterUrlApi = `&language=fr&query=${inputValue}&page=${counter}`;

  const canalContext = useContext(CanalHomeContext);

  //fetch data
  useEffect(() => {
    apiFunction(urlApi, API_KEY, optionalParameterUrlApi).then((response) => {
      canalContext.setData(response.results);
      console.log(response);
      if (response.total_pages !== 0) {
        canalContext.setTotalPagesResult(response.total_pages);
      } else {
        canalContext.setTotalPagesResult(response.total_pages + 1);
      }
    });
  }, [startSearch, counter]);

  const handleChange = (e) => {
    setInputValue(e.currentTarget.value);
  };

  //change page
  const handleChangePage = (position) => {
    if (position === "next") {
      setCounter((value) => value + 1);
    } else if (position === "previous") {
      setCounter((value) => value - 1);
    }
  };

  const handleStartSearch = (valueTypeOfSearch) => {
    setStartSearch((value) => value + 1);
    switch (valueTypeOfSearch) {
      case "movie":
        setTypeOfSearch("movie");
        break;
      case "tv":
        setTypeOfSearch("tv");
        break;
      case "person":
        setTypeOfSearch("person");
        break;
      default:
        setTypeOfSearch("multi");
    }
    canalContext.setTypeOfData(valueTypeOfSearch);
    console.log(canalContext.data);
  };

  //modal
  if (canalContext.modalIsOpen) {
    document.body.classList.add("active_modal");
  } else {
    document.body.classList.remove("active_modal");
  }

  return (
    <div className="search_container">
      <input
        className="search_container__input"
        placeholder="Avatar, Lupin ..."
        onChange={handleChange}
      />
      <button
        className="search_container__button"
        onClick={() => handleStartSearch("multi")}
      >
        Rechercher
      </button>
      <button
        className="search_container__button"
        onClick={() => handleStartSearch("movie")}
      >
        Rechercher un film
      </button>
      <button
        className="search_container__button"
        onClick={() => handleStartSearch("tv")}
      >
        Rechercher une série TV
      </button>
      <button
        className="search_container__button"
        onClick={() => handleStartSearch("person")}
      >
        Rechercher une personne
      </button>

      {canalContext.data !== undefined && canalContext.data.length !== 0 ? (
        <section className="search_container__results_container results_container">
          {canalContext.data.map((item, key) => (
            <div key={key}>
              <Image item={item} />
            </div>
          ))}
        </section>
      ) : (
        ""
      )}

      {canalContext.modalIsOpen && ( //if modal is true, we display the modal
        <Modal />
      )}
      <div className="search_container__search_navigation search_navigation">
        <button
          className={
            counter > 1
              ? "search_navigation__previous_page"
              : "search_navigation__previous_page display_none"
          }
          onClick={() => handleChangePage("previous")}
        >
          <FontAwesomeIcon icon={faArrowLeft} size="2xl" />
        </button>
        <span>
          Page {counter} sur {canalContext.totalPagesResult}
        </span>
        <button
          className={
            counter < canalContext.totalPagesResult
              ? "search_navigation__previous_page"
              : "search_navigation__previous_page display_none"
          }
          onClick={() => handleChangePage("next")}
        >
          <FontAwesomeIcon icon={faArrowRight} size="2xl" />
        </button>
      </div>
    </div>
  );
};

export default Search;
