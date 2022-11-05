import { useContext } from "react";
import NewCurrentUserContext from "../contexts/NewCurrentUserContext";
import LoadingContext from "../contexts/LoadingContext";

const Card = ({ card, onCardClick, onCardLike, onCardDelete, onViewCard }) => {
  const loading = useContext(LoadingContext);
  const currentUser = useContext(NewCurrentUserContext).user;
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `image-button elements__like ${
    isLiked ? "active" : ""
  }`;
  return (
    <div className="elements__item" onClick={() => onCardClick(card)}>
      <img className="elements__image" src={card.link} alt={card.name} />
      <div className="elements__title">
        <h2 className="elements__name">{card.name}</h2>
        <div className="elements__likes-container">
          <button
            className={cardLikeButtonClassName}
            type="button"
            disabled={loading}
            onClick={(e) => {
              e.stopPropagation();
              onCardLike(card);
            }}
          />
          <span className="elements__likes-count">{card.likes.length}</span>
        </div>
      </div>
      {isOwn && (
        <button
          className="image-button elements__delete"
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onCardDelete(card);
          }}
        />
      )}
    </div>
  );
};
export default Card;
