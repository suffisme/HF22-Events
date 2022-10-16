import { useRef, useState } from 'react';
import classes from './BugForm.module.css'
import postBug from '../../Waybug/postBug';

const BugForm = () => {

    const titleRef = useRef('');
    const descriptionRef = useRef('');

    const [titleError, setTitleError] = useState(null);
    const [descriptionError, setDescriptionError] = useState(null);
    const [len, setLen] = useState(0);
    const [formMessage, setFormMessage]= useState(null);

    const submitFormHandler = async (event) => {
        event.preventDefault();

        if(titleRef.current.value.trim().length < 8 || descriptionRef.current.value.trim().split(/\s+/).length < 30){
            if(titleRef.current.value.trim().length < 8){
                setTitleError(<p>Title is less than 8 letters</p>)
            }
            if(descriptionRef.current.value.trim().split(/\s+/).length < 30){
                setDescriptionError(<p>Description is less than 30 words</p>)
            }
            return;
        }

        const response = await postBug({title: titleRef.current.value, description: descriptionRef.current.value});
        if(response.success){
            titleRef.current.value = '';
            descriptionRef.current.value = '';
        }
        setFormMessage(<p>{response.message}</p>);
    }

    const setErrorNull = () => {
        setFormMessage(null);
        setTitleError(null);
        setDescriptionError(null);
    }

    return (
        <form onSubmit={submitFormHandler} onChange={setErrorNull}>
            {formMessage && formMessage}
            <div className={classes.control}>
                <label htmlFor='title'>Title</label>
                <input type='text' id='title' ref={titleRef}/>
            </div>
            <div className={classes.control}>
                <label htmlFor='bug-desc'>Description of the Bug</label>
                <textarea rows='5' id='bug-desc' ref={descriptionRef} onChange={() => {setLen(descriptionRef.current.value.trim().split(/\s+/).length)}}></textarea>
                <p>{len}</p>
            </div>
            {titleError && titleError}
            {descriptionError && descriptionError}
            <button className={classes.button}>Report Bug</button>
        </form>
    )
}

export default BugForm;