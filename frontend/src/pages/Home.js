import Main from "../components/Main";
import Footer from "../components/Footer";
import {useContext, useEffect, useState} from "react";
import api from "../utils/api";
import EditProfilePopup from "../components/EditProfilePopup";
import AddPlacePopup from "../components/AddPlacePopup";
import EditAvatarPopup from "../components/EditAvatarPopup";
import CardDeleteConfirmationPopup from "../components/CardDeleteConfirmationPopup";
import ImagePopup from "../components/ImagePopup";
import Snackbar from "../components/Snackbar";
import LoadingContext from "../contexts/LoadingContext";
import NewCurrentUserContext from "../contexts/NewCurrentUserContext";

const Home = () => {
    const [cards, setCards] = useState([]);
    const [loadingCards, setLoadingCards] = useState(false);
    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
    const [isImagePopupOpen, setImagePopupOpen] = useState(false);
    const [isDeleteCardOpen, setDeleteCardOpen] = useState(false);
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState({});
    const [toUpdate, setToUpdate] = useState(false);
    const [loading, setLoading] = useState(false);
    const user = useContext(NewCurrentUserContext).user;
    const setUser = useContext(NewCurrentUserContext).setUser;
    const [error, setError] = useState("");
    const closeAllPopups = () => {
        setEditAvatarPopupOpen(false);
        setEditProfilePopupOpen(false);
        setAddPlacePopupOpen(false);
        setImagePopupOpen(false);
        setDeleteCardOpen(false);
        setSelectedCard({});
    };
    const handleCardLike = (card) => {
        if (card && card.likes && user && user._id) {
            const isLiked = card.likes.some((i) => i._id === user._id);

            if (!isLiked) {
                setLoading(true);
                api
                    .putCardLikes(card._id)
                    .then(() => setToUpdate(!toUpdate))
                    .catch((err) => showError(err))
                    .finally(() => setLoading(false));
            } else {
                setLoading(true);
                api
                    .deleteCardLikes(card._id)
                    .then(() => setToUpdate(!toUpdate))
                    .catch((err) => showError(err))
                    .finally(() => setLoading(false));
            }
        }
    };

    const handleEditAvatarClick = () => setEditAvatarPopupOpen(true);
    const handleEditProfileClick = () => setEditProfilePopupOpen(true);
    const handleCardDelete = (card) => {
        setSelectedCard(card);
        setDeleteCardOpen(true);
    };
    const handleAddPlaceClick = () => {
        setAddPlacePopupOpen(true);
    };
    const handleCardClick = (card) => {
        setSelectedCard(card);
        setImagePopupOpen(true);
    };
    const handleUpdateUser = (data) => {
        setLoading(true);
        api
            .patchUserInfo(data)
            .then((res) => {
                setUser(res);
                closeAllPopups();
            })
            .catch((err) => showError(err))
            .finally(() => setLoading(false));
    };
    const handleDeleteCard = (id) => {
        setLoading(true);
        api
            .deleteCard(id)
            .then(() => {
                closeAllPopups();
            })
            .catch((err) => showError(err))
            .finally(() => {
                setLoading(false);
                setToUpdate(!toUpdate);
            });
    };
    const handleUpdateAvatar = (data) => {
        setLoading(true);
        api
            .patchAvatar(data)
            .then((res) => {
                if (res) {
                    setUser(res);
                }
                closeAllPopups();
            })
            .catch((err) => showError(err))
            .finally(() => setLoading(false));
    };
    const handleAddPlaceSubmit = (newCard) => {
        setLoading(true);
        api
            .postCard(newCard)
            .then((res) => {
                setToUpdate(!toUpdate);
                closeAllPopups();
            })
            .catch((err) => showError(err))
            .finally(() => setLoading(false));
    };
    const showError = (err) => {
        setError(
            err.message
                ? err.message
                : "Произошла ошибка сети"
        );
        setTimeout(() => {
            setError("");
        }, 3000);
    };

    useEffect(() => {
        if (user._id) {
            setLoadingCards(true);
            api
                .getInitialCards()
                .then((data) => {
                    if (data) {
                        setCards(
                            data.map(({name, link, _id, owner, likes}) => ({
                                name,
                                link,
                                _id,
                                owner,
                                likes,
                            }))
                        );
                    }
                })
                .catch((err) => showError(err))
                .finally(() => setLoadingCards(false));
        }
    }, [user._id, toUpdate]);

    return (
        <LoadingContext.Provider value={loading}>
            <Main
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                cards={cards}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                loadingCards={loadingCards}
            />
            <Footer/>

            <EditProfilePopup
                isOpen={isEditProfilePopupOpen}
                onClose={closeAllPopups}
                onUpdateUser={handleUpdateUser}
            />
            <AddPlacePopup
                isOpen={isAddPlacePopupOpen}
                onClose={closeAllPopups}
                onSubmit={handleAddPlaceSubmit}
            />
            <EditAvatarPopup
                isOpen={isEditAvatarPopupOpen}
                onClose={closeAllPopups}
                onUpdateAvatar={handleUpdateAvatar}
            />
            <CardDeleteConfirmationPopup
                isOpen={isDeleteCardOpen}
                onClose={closeAllPopups}
                onSubmit={() => {
                    if (selectedCard && selectedCard._id) {
                        handleDeleteCard(selectedCard._id);
                    }
                }}
            />
            <ImagePopup
                card={selectedCard}
                onClose={closeAllPopups}
                isOpen={isImagePopupOpen}
            />
            <Snackbar show={error !== ""} error={error}/>
        </LoadingContext.Provider>
    );
};
export default Home;
