import emptyImage from "../../data/images/empty_image.png";
import { useContext, useEffect } from "react";
import CanalContext from "../../context/CanalHomeContext";

const Image = ({ item }) => {
  //if we know already the type of data (movie, tv), we can add this particularity before
  const canalContext = useContext(CanalContext);

  let srcImage;

  //good url for movie or acting
  if (item.poster_path === null || item.poster_path === undefined) {
    srcImage = emptyImage;
  } else {
    srcImage = "https://image.tmdb.org/t/p/w780" + item.poster_path;
  }
  if (srcImage === emptyImage) {
    if (item.profile_path === null || item.profile_path === undefined) {
      srcImage = emptyImage;
    } else {
      srcImage = "https://image.tmdb.org/t/p/original" + item.profile_path;
    }
  }

  console.log(item);

  const changeContentModal = (content) => {
    console.log(content);
    console.log(canalContext.typeOfData);

    let item;

    //if typeOfData is person adapt the content
    if (canalContext.typeOfData === "person") {
      item = {
        name: "",
        knownFor: "",
        backgroundImage: "",
      };

      item.name = content.name;

      item.knownFor = content.known_for;

      if (content.profile_path !== null) {
        item.backgroundImage =
          "https://image.tmdb.org/t/p/original" + content.profile_path;
      } else {
        item.backgroundImage = emptyImage;
      }
    } else {
      item = {
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
      } else if (content.original_title === undefined) {
        item.title = content.name;
      } else if (content.name === undefined) {
        item.title = content.original_title;
      }

      item.description = content.overview;
      if (content.backdrop_path !== null) {
        item.backgroundImage =
          "https://image.tmdb.org/t/p/w780" + content.backdrop_path;
      } else {
        item.backgroundImage = emptyImage;
      }

      item.vote = content.vote_average;
    }

    canalContext.setContentModal(item);
  };

  const toggleModal = (itemCard) => {
    canalContext.setModalIsOpen((modal) => !modal);
    changeContentModal(itemCard);

    if (canalContext.typeOfData === "multi")
      canalContext.setTypeOfData(itemCard.media_type);
  };

  return (
    <div>
      <img
        className="images_container__image"
        onClick={() => {
          toggleModal(item);
        }}
        src={srcImage}
      />
    </div>
  );
};

export default Image;