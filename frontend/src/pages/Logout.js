import {useEffect} from "react";
import api from "../utils/api";
import {useHistory} from "react-router-dom";
import Spinner from "../components/Spinner";

const Logout = ({
                    setLoggedIn,
                    setNewCurrentUser,
                }) => {
    const history = useHistory();
    useEffect(() => {
        api.signOut()
            .then((data) => {
            })
            .catch(() => {
            })
            .finally(() => {
                setLoggedIn(false);
                history.push("/react-mesto-auth/sign-in");
                setNewCurrentUser({})
            })
        ;
    }, [])
    return (
        <Spinner/>
    );
};
export default Logout;
