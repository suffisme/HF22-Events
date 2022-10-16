import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import LoginForm from "../components/Authentication/LoginForm";

const Login = () => {
    const isLoggedIn = useSelector(state => state.auth.isAuthenticated);
    if(isLoggedIn){
        return(
            <Redirect to='/home' />
        )
    }
    return(
        <LoginForm />
    )
}

export default Login;