import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faStar } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import CanalContext from "../../context/CanalHomeContext";

const Modal = () => {
  const canalContext = useContext(CanalContext);
  console.log(canalContext.contentModal);

  return (
    <div className="gallery__modal modal">
      <div
        className="modal__overlay"
        onClick={(modal) => canalContext.setModalIsOpen(!modal)}
      ></div>
      <div className="modal__modal_content modal_content">
        <img
          src={canalContext.contentModal.backgroundImage}
          className="modal_content__image"
          alt={
            canalContext.contentModal.title !== undefined
              ? "poster " + canalContext.contentModal.title
              : "poster " + canalContext.contentModal.name
          }
        />
        <p className="modal_content__title">
          {canalContext.typeOfData === "person"
            ? canalContext.contentModal.name
            : canalContext.contentModal.title}
        </p>
        {canalContext.typeOfData === "person" ? (
          ""
        ) : (
          <div className={"modal_content__vote_container vote_container"}>
            <span className="vote_container__value">
              {canalContext.contentModal.vote}
            </span>
            <FontAwesomeIcon
              icon={faStar}
              size={"xl"}
              color={"yellow"}
              className="vote_container__icon"
            />
          </div>
        )}

        {canalContext.typeOfData === "person" ? (
          ""
        ) : (
          <p className="modal_content__description">
            {canalContext.contentModal.description}
          </p>
        )}

        {canalContext.typeOfData === "person" ? (
          <div>
            <p>Films/séries jouées :</p>

            <ul>
              {canalContext.contentModal.knownFor.map((item, key) => (
                <li key={key}>{item.title}</li>
              ))}
            </ul>
          </div>
        ) : (
          ""
        )}

        <button
          className="modal_content__close_button"
          onClick={(modal) => canalContext.setModalIsOpen(!modal)}
        >
          <FontAwesomeIcon icon={faClose} size={"2xl"} color={"white"} />
        </button>
      </div>
    </div>
  );
};
export default Modal;
