import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faStar,
  faClose,
} from "@fortawesome/free-solid-svg-icons";
import emptyImage from "../../data/images/empty_image.png";

const Gallery = ({ urlApi, optionalParameterUrlApi, galleryTitle }) => {
  const [data, setData] = useState(undefined);
  const [dataLength, setDataLength] = useState(undefined);
  const itemsRef = useRef();
  const [previousDistanceCount, setPreviousDistanceCount] = useState(0); //counter previous elements
  const [nextDistanceCount, setNextDistanceCount] = useState(0); //counter next elements
  const [directionType, setDirectionType] = useState(""); //define type of click : previous or next
  const [clickCount, setClickCount] = useState(0); //counter global for one click to previous and next elements
  const [modal, setModal] = useState(false);
  const [modalContent, setModalContent] = useState(undefined);

  //api key
  const API_KEY = "ade02ea5f909697eb890e5479757edf0";
  let optionalParameterUrlApiCopy;

  if (optionalParameterUrlApi === undefined) optionalParameterUrlApiCopy = "";
  else optionalParameterUrlApiCopy = optionalParameterUrlApi;
  //fetch data
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/${urlApi}?api_key=${API_KEY}${optionalParameterUrlApiCopy}`
    )
      .then((promise) => promise.json())
      .then((data) => {
        setData(data.results);
        setDataLength(data.results.length);
      });
  }, []);

  const WIDTH_IMAGE = 210;

  //define MAX_TRANSLATE_X : total translate space
  const MAX_TRANSLATE_X = dataLength * WIDTH_IMAGE - 3 * WIDTH_IMAGE;

  useEffect(() => {
    if (directionType === "next" && nextDistanceCount > -MAX_TRANSLATE_X) {
      setNextDistanceCount(
        (nextDistanceCount) => nextDistanceCount - WIDTH_IMAGE
      );
      setPreviousDistanceCount(() => nextDistanceCount - WIDTH_IMAGE);
    } else if (directionType === "previous" && previousDistanceCount <= 0) {
      setPreviousDistanceCount(
        (previousDistanceCount) => previousDistanceCount + WIDTH_IMAGE
      );
      setNextDistanceCount(() => previousDistanceCount + WIDTH_IMAGE);
    }
  }, [directionType, clickCount]); //impact for directionType and clickCount

  useEffect(() => {
    if (directionType === "next" && nextDistanceCount > -MAX_TRANSLATE_X) {
      itemsRef.current.style.transform = `translate(${nextDistanceCount}px)`;
    } else if (directionType === "previous" && previousDistanceCount <= 0) {
      itemsRef.current.style.transform = `translate(${previousDistanceCount}px)`;
    }
  }, [previousDistanceCount, nextDistanceCount]); //impact for previousDistanceCount and nextDistanceCount

  //modal
  const toggleModal = () => {
    setModal(!modal);
  };

  const changeContentModal = (content) => {
    let item = {
      title: "",
      description: "",
      backgroundImage: "",
      vote: "",
    };
    console.log(content);
    if (content.media_type !== undefined) {
      if (content.media_type === "movie") {
        item.title = content.original_title;
      }
      if (content.media_type === "tv") {
        item.title = content.name;
      }
    } else if (
      content.media_type === undefined &&
      content.original_title === undefined
    ) {
      item.title = content.name;
    } else if (content.media_type === undefined && content.name === undefined) {
      item.title = content.original_title;
    }

    item.description = content.overview;
    if (content.backdrop_path !== null) {
      item.backgroundImage =
        "https://image.tmdb.org/t/p/original/" + content.backdrop_path;
    } else {
      item.backgroundImage = emptyImage;
    }

    item.vote = content.vote_average;
    setModalContent(item);
  };

  if (modal) {
    document.body.classList.add("active_modal");
  } else {
    document.body.classList.remove("active_modal");
  }

  if (data !== undefined) {
    return (
      <div className="gallery">
        <p className="gallery__gallery_title">{galleryTitle}</p>
        <nav className={"gallery__gallery_navigation gallery_navigation"}>
          <FontAwesomeIcon
            icon={faArrowLeft}
            className={
              nextDistanceCount < 0
                ? "gallery_navigation__previous_icon"
                : "gallery_navigation__previous_icon hidden"
            }
            onClick={() => {
              setDirectionType("previous");
              setClickCount((count) => count + 1);
            }}
            size="xl"
          />
          <FontAwesomeIcon
            icon={faArrowRight}
            className={
              nextDistanceCount > -MAX_TRANSLATE_X + WIDTH_IMAGE
                ? "gallery_navigation__next_icon"
                : "gallery_navigation__next_icon hidden"
            }
            onClick={() => {
              setDirectionType("next");
              setClickCount((count) => count + 1);
            }}
            size="xl"
          />
        </nav>

        <div
          className="gallery__images_container images_container"
          ref={itemsRef}
        >
          {data.map((item, key) => (
            <img
              className="images_container__image"
              onClick={() => {
                toggleModal();
                changeContentModal(item);
              }}
              key={key}
              src={
                item.poster_path !== null
                  ? "https://image.tmdb.org/t/p/original/" + item.poster_path
                  : emptyImage
              }
            />
          ))}
        </div>
        {modal && ( //if modal is true, we display the modal
          <div className="gallery__modal modal">
            <div className="modal__overlay" onClick={toggleModal}></div>
            <div className="modal__modal_content modal_content">
              <img
                src={modalContent.backgroundImage}
                className="modal_content__image"
              />
              <p className="modal_content__title">{modalContent.title}</p>
              <div className={"modal_content__vote_container vote_container"}>
                <span className="vote_container__value">
                  {modalContent.vote}
                </span>
                <FontAwesomeIcon
                  icon={faStar}
                  size={"xl"}
                  color={"yellow"}
                  className="vote_container__icon"
                />
              </div>
              <p className="modal_content__description">
                {modalContent.description}
              </p>

              <button
                className="modal_content__close_button"
                onClick={toggleModal}
              >
                <FontAwesomeIcon icon={faClose} size={"2xl"} color={"white"} />
              </button>
            </div>
          </div>
        )}
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default Gallery;
