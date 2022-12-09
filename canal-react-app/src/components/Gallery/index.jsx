import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const Gallery = ({ urlApi, optionalParameterUrlApi, galleryTitle }) => {
  const [data, setData] = useState(undefined);
  const [dataLength, setDataLength] = useState(undefined);
  const itemsRef = useRef();
  const [previousDistanceCount, setPreviousDistanceCount] = useState(0); //counter previous elements
  const [nextDistanceCount, setNextDistanceCount] = useState(0); //counter next elements
  const [directionType, setDirectionType] = useState(""); //define type of click : previous or next
  const [clickCount, setClickCount] = useState(0); //counter global for one click to previous and next elements

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
              key={key}
              src={"https://image.tmdb.org/t/p/original/" + item.poster_path}
            />
          ))}
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default Gallery;
