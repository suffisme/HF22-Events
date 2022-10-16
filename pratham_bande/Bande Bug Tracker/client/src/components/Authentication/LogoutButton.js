import './LogoutButton.css';
import Logout from '../../Wayauth/Logout';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/auth';
import { useHistory } from 'react-router-dom';
const LogoutButon = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const logoutHandler = async () => {
        await Logout();
        dispatch(authActions.logout());
        history.push('/home');
    }

    return(
        <button className="button-82-pushable" role="button" onClick={logoutHandler}>
            <span className="button-82-shadow"></span>
            <span className="button-82-edge"></span>
            <span className="button-82-front text">
                Logout
            </span>
        </button>
    )
}

export default LogoutButon;
