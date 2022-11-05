const AVATAR_EP = "users/me/avatar";
const USERS_EP = "users/me";
const CARDS_EP = "cards";
const SIGN_UP_EP = "signup";
const SIGN_IN_EP = "signin";
const SIGN_OUT = "signout";

class Api {
    constructor({baseUrl, headers}) {
        this._baseUrl = baseUrl;
        this._headers = headers;
        this._credentials = "include";
        this._get = this._get.bind(this);
        this._patch = this._patch.bind(this);
        this._post = this._post.bind(this);
        this._put = this._put.bind(this);
        this._delete = this._delete.bind(this);
    }

    _checkResponse(res) {
        if (res && res.ok) {
            return res.json();
        }
        return res.json().then(doc => {
            return Promise.reject({code: res.status, ...doc});
        });
    }

    _get(ep) {
        return fetch(this._baseUrl + ep, {
            headers: this._headers,
            credentials: this._credentials,
        }).then(this._checkResponse);
    }

    _patch(ep, data) {
        return fetch(this._baseUrl + ep, {
            headers: this._headers,
            credentials: this._credentials,
            method: "PATCH",
            body: JSON.stringify(data),
        }).then(this._checkResponse);
    }

    _post(ep, data) {
        return fetch(this._baseUrl + ep, {
            headers: this._headers,
            credentials: this._credentials,
            method: "POST",
            body: JSON.stringify(data),
        }).then(this._checkResponse);
    }

    _put(ep) {
        return fetch(this._baseUrl + ep, {
            headers: this._headers,
            credentials: this._credentials,
            method: "PUT",
        }).then(this._checkResponse);
    }

    _delete(ep) {
        return fetch(this._baseUrl + ep, {
            headers: this._headers,
            credentials: this._credentials,
            method: "DELETE",
        }).then(this._checkResponse);
    }

    getInitialCards() {
        return this._get(CARDS_EP);
    }

    patchUserInfo(data) {
        return this._patch(USERS_EP, data);
    }

    patchAvatar(data) {
        return this._patch(AVATAR_EP, data);
    }

    postCard(data) {
        return this._post(CARDS_EP, data);
    }

    deleteCard(cardId) {
        return this._delete(CARDS_EP + `/${cardId}`, cardId);
    }

    putCardLikes(cardId) {
        return this._put(`${CARDS_EP}/${cardId}/likes`, cardId);
    }

    deleteCardLikes(cardId) {
        return this._delete(`${CARDS_EP}/${cardId}/likes`, cardId);
    }

    postSignUp(data) {
        return this._post(SIGN_UP_EP, data);
    }

    postSignIn(data) {
        return this._post(SIGN_IN_EP, data);
    }

    getMe() {
        return this._get(USERS_EP);
    }

    signOut() {
        return this._post(SIGN_OUT);
    }
}

const api = new Api({
    baseUrl: "http://tsh.domainname.students.nomoredomains.icu/",
    headers: {
        Accept: "application/json",
        Origin: 'http://localhost:3000',
        "Content-Type": "application/json",
    },
});
export default api;
