import { useEffect, useRef, useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Image from "../Image";
import CanalContext from "../../context/CanalHomeContext";
import Modal from "../Modal";
import { apiFunction } from "../../services/callsApi";

const Gallery = ({
  urlApi,
  optionalParameterUrlApi,
  galleryTitle,
  typeOfData,
  idGalleryLoader,
}) => {
  const itemsRef = useRef();
  const [previousDistanceCount, setPreviousDistanceCount] = useState(0); //counter previous elements
  const [nextDistanceCount, setNextDistanceCount] = useState(0); //counter next elements
  const [directionType, setDirectionType] = useState(""); //define type of click : previous or next
  const [clickCount, setClickCount] = useState(0); //counter global for one click to previous and next elements
  const [loaderGallery, setLoaderGallery] = useState(false);

  const canalContext = useContext(CanalContext);

  //control typeOfData
  useEffect(() => {
    if (typeOfData !== undefined) {
      canalContext.setTypeOfData(typeOfData);
    }
  }, []);

  //api key
  const API_KEY = "ade02ea5f909697eb890e5479757edf0";
  let optionalParameterUrlApiCopy;
  const DATA_LENGTH = 200; //number of element display (20 elements for real, but 200 for give more space)

  if (optionalParameterUrlApi === undefined) optionalParameterUrlApiCopy = "";
  else optionalParameterUrlApiCopy = optionalParameterUrlApi;

  //fetch data
  useEffect(() => {
    apiFunction(urlApi, API_KEY, optionalParameterUrlApiCopy).then(
      (response) => {
        canalContext.setData(response.results);
        setLoaderGallery(true);
      }
    );
  }, []);

  const WIDTH_IMAGE = 200;
  //define MAX_TRANSLATE_X : total translate space
  const MAX_TRANSLATE_X = DATA_LENGTH * WIDTH_IMAGE - 3 * WIDTH_IMAGE;

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

  if (canalContext.modalIsOpen) {
    document.body.classList.add("active_modal");
  } else {
    document.body.classList.remove("active_modal");
  }

  if (loaderGallery === true) {
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
          {canalContext.data.map((item, key) => (
            <div key={key}>
              <Image item={item} />
            </div>
          ))}
        </div>
        {canalContext.modalIsOpen && ( //if modal is true, we display the modal
          <Modal />
        )}
      </div>
    );
  } else {
    return (
      <div>
        <p>Chargement ...</p>
      </div>
    );
  }
};

export default Gallery;
