import { useState, useReducer } from "react"

const initialInput = {
    value: '',
    isTouched: false,
};

const inputStateReducer = (state, action) => {
    if(action.type === 'INPUT'){
        return {value : action.value, isTouched : state.isTouched};
    }
    if(action.type === 'BLUR'){
        return{value: state.value, isTouched: true};
    }
    if(action.type === 'RESET'){
        return{value: '', isTouched: false};
    }
    return initialInput;
}



const useInput = (fun) => {
    // const [enteredValue, setEntertedValue] = useState('');
    // const [isTouched, setIsTouched] = useState(false);

    // const valueIsValid = fun(enteredValue);
    // const hasError = !valueIsValid && isTouched;
    
    // const valueChangeHandler = (event) => {
    //     setEntertedValue(event.target.value);
    // }

    // const inputBlurHandler = (event) => {
    //     setIsTouched(true);
    // }

    // const reset = () => {
    //     setEntertedValue('');
    // }

    const [inputState, dispatch] = useReducer(
        inputStateReducer,
        initialInput
    );

    const valueIsValid = fun(inputState.value);
    const hasError = !valueIsValid && inputState.isTouched;

    const valueChangeHandler = (event) => {
        dispatch({type:'INPUT', value:event.target.value});
    }

    const inputBlurHandler = (event) => {
        dispatch({type:'BLUR'});
    }

    const reset = () => {
        dispatch({type:'RESET'});
    }

    return{
        value: inputState.value,
        isValid: valueIsValid,
        hasError,
        valueChangeHandler,
        inputBlurHandler,
        reset
    };

}

export default useInput;