import { useState } from "react";
import { useHistory } from "react-router-dom";
import Signup from "../../Wayauth/Signup";
import useInput from "../../hooks/use-input";
import Card from "../UI/Card"
import SelectButton from "./SelectButton";
import './SignUpForm.css'

const SignUpForm = () => {
    let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
    const [color, setColor] = useState("#F7CD2E");
    const [isEmp, setIsEmp] = useState(false);
    const [message, setmessage] = useState(null);
    const history = useHistory();

    const {
        value: enteredName,
        isValid: enteredNameIsValid,
        hasError: NameInputHasError,
        valueChangeHandler: NameChangeHandler,
        inputBlurHandler: NameBlurHandler,
        reset: resetName,
    } = useInput(v => v.length >= 3);


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

    const {
        value: enteredRePassword,
        isValid: enteredRePasswordIsValid,
        hasError: RePasswordInputHasError,
        valueChangeHandler: RePasswordChangeHandler,
        inputBlurHandler: RePasswordBlurHandler,
        reset: resetRePassword,
    } = useInput(v => v === enteredPassword);

    const {
        value: enteredID,
        isValid: enteredIDIsValid,
        hasError: IDInputHasError,
        valueChangeHandler: IDChangeHandler,
        inputBlurHandler: IDBlurHandler,
        reset: resetID,
    } = useInput(v => v.length > 9);


    const submitFormHandler = async (event) => {
        event.preventDefault();
        if(!enteredNameIsValid || !enteredEmailIsValid || (!enteredIDIsValid && isEmp) || !enteredPasswordIsValid || !enteredRePasswordIsValid){
            setmessage(<p>Incorrect Form Details</p>);
            setColor("#FF4331");
            return;
        }
        console.log("sign up auth passed");
        const response = await Signup(
            {
                name: enteredName,
                email: enteredEmail,
                password: enteredPassword,
                officeId: isEmp ? enteredID : "-1"
            }
        );
        console.log(response);
        if(response.success){
            setTimeout(() => {
                history.push('/login');
            }, 3000)
            setColor("#6EC72D");
        }else{
            setColor("#FF4331");
        }
        setmessage(<p>{response.message}</p>)
    }


    return (
        <Card color={color}>
            <div>
                <img src={require('../../asset/logo.jpg')} />
            </div>
            {message && (message)}
            {!message && <h1 style={{"font-size" : "30px"}}>Welcome New Comer !!</h1>}
            <form onSubmit={submitFormHandler} className="for-form" onChange={() => {setmessage(false); setColor("#F7CD2E")}}>
                <div className={!NameInputHasError ? 'form-control' : 'form-control invalid'}>
                    <label htmlFor='Name'>Name</label>
                    <input type='text' id='Name'
                        onChange={NameChangeHandler}
                        onBlur={NameBlurHandler}
                        value={enteredName}
                    />
                </div>
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
                <div className={!RePasswordInputHasError ? 'form-control' : 'form-control invalid'}>
                    <label htmlFor='Repassword'>Re-Enter Password</label>
                    <input type='password' id='Repassword'
                        onChange={RePasswordChangeHandler}
                        onBlur={RePasswordBlurHandler}
                        value={enteredRePassword}
                    />
                </div>
                <fieldset>
                    <legend>Employee ? </legend>
                    <SelectButton 
                        onClick={() => {setIsEmp(true)}}
                        selected={isEmp}
                        text={"Yes, I am an Employee !"} 
                    />
                    <SelectButton 
                        onClick={() => {setIsEmp(false)}}
                        selected={!isEmp}
                        text={"Nope, Just here for the good deed"} 
                    />
                </fieldset>

                {isEmp && <div className={!IDInputHasError ? 'form-control' : 'form-control invalid'}>
                    <label htmlFor='ID'>Office ID</label>
                    <input type='text' id='ID'
                        onChange={IDChangeHandler}
                        onBlur={IDBlurHandler}
                        value={enteredID}
                    />
                </div>}


                <div className='form-actions'>
                    <button type="submit" className="grow_skew_forward">Signup &rarr;</button>
                </div>
            </form>
        </Card >
    )
}

export default SignUpForm;