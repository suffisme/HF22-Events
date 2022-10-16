import { useDispatch } from "react-redux";
import { authActions } from "../store/auth";


const Logout = async () => {
    const response = await fetch('http://localhost:8000/logout', {
        method: 'POST',
        credentials: 'include'
    });
}

export default Logout;