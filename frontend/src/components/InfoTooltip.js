import {memo} from "react";
import Success from "../images/success.svg";
import Error from "../images/error.svg";

const SUCCESS_MESSAGE = "Вы успешно зарегистрировались!";
const ERROR_MESSAGE = "Что-то пошло не так!\n" + "Попробуйте ещё раз.";
const InfoTooltip = memo(({success, onClose, isOpen, message = ERROR_MESSAGE}) => (
    <div
        className={`popup ${isOpen ? "popup_opened" : ""}`}
        id="placeViewerPopup"
    >
        <div className="popup__container">
            <figure className="tooltip">
                <img
                    className="popup__image tooltip__image"
                    src={success ? Success : Error}
                    alt=""
                />
                <figcaption className="tooltip__caption">
                    {success ? SUCCESS_MESSAGE : message}
                </figcaption>
            </figure>
            <button
                className="image-button popup__close-icon"
                type="button"
                onClick={onClose}
            />
        </div>
    </div>
));
export default InfoTooltip;
