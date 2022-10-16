import { useHistory } from 'react-router-dom'
import classes from './BugInfo.module.css'

const BugInfo = (prop) => {
    const history = useHistory();
    const clickHandler = () => {
        history.push('/bugDetail/' + prop.bug._id);
    }

    return(
        <div className={classes.fordiv}>
            <h2>{prop.bug.title}</h2>
            <button className={classes.button49} onClick={clickHandler}>Details</button>
        </div>
    )
}

export default BugInfo;