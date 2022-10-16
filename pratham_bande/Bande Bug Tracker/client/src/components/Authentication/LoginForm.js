import useInput from "../../hooks/use-input";
import Card from "../UI/Card"
import './LoginForm.css'

import {useDispatch, useSelector} from 'react-redux';
import { authActions } from "../../store/auth";
import Login from "../../Wayauth/Login";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const LoginForm = () => {
    let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
    const dispatch = useDispatch();
    const history = useHistory();
    const [color, setColor] = useState("#5A20CB");
    const [message, setmessage] = useState(null);

    const {
        value: enteredEmail,
        isValid: enteredEmailIsValid,
        hasError: EmailInputHasError,
        valueChangeHandler: EmailChangeHandler,
        inputBlurHandler: EmailBlurHandler,
        reset: resetEmail,
    } = useInput(v => regex.test(v));

    const {
        value: enteredPassword,
        isValid: enteredPasswordIsValid,
        hasError: PasswordInputHasError,
        valueChangeHandler: PasswordChangeHandler,
        inputBlurHandler: PasswordBlurHandler,
        reset: resetPassword,
    } = useInput(v => v.length > 6);


    const formSubmitHandler = async (event) => {
        event.preventDefault();
        if(!enteredEmailIsValid || !enteredPasswordIsValid){
            setColor("#E21717");
            setmessage(<p>Invalid Submission</p>)
            return;
        }
        console.log("auth passed");
        const response = await Login({email: enteredEmail, password: enteredPassword});
        console.log(response);
        if(response.success){
            setTimeout(() => {
                dispatch(authActions.login(response.user));
                history.push('/home');
            },3000);
            setColor("#6EC72D");
        }else{
            setColor("#E21717");
        }
        setmessage(<p>{response.message}</p>)
    }

    return (
        <Card color={color}>
            <div>
                <img src={require('../../asset/logo.jpg')} />
            </div>
            {message && (message)}
            {!message && <h1 style={{"fontSize" : "30px"}}>Welcome</h1>}
            <form className="for-form" onSubmit={formSubmitHandler} onChange={() => {setmessage(false); setColor("#5A20CB")}}>
                <div className={!EmailInputHasError ? 'form-control' : 'form-control invalid'}>
                    <label htmlFor='email'>E-Mail</label>
                    <input type='text' id='email'
                        onChange={EmailChangeHandler}
                        onBlur={EmailBlurHandler}
                        value={enteredEmail}
                    />
                </div>
                <div className={!PasswordInputHasError ? 'form-control' : 'form-control invalid'}>
                    <label htmlFor='password'>Password</label>
                    <input type='password' id='password'
                        onChange={PasswordChangeHandler}
                        onBlur={PasswordBlurHandler}
                        value={enteredPassword}
                    />
                </div>
                <div className='form-actions'>
                    <button type="submit" className="grow_skew_forward">Login &rarr;</button>
                </div>
            </form>
        </Card>
    )
}


export default LoginForm;