import NameCard from "./NameCard";
import classes from './ChooseBox.module.css';

const ChooseBox = (prop) => {
    // console.log("in box", prop.text);
    // console.log(prop.localArray);
    
    return(
        <div className={classes.boxDiv}>
            <h4>{prop.text}</h4>
            {prop.localArray.map(emp => {
                return <NameCard key={emp._id} emp={emp} onClick={prop.onClick} type={prop.text == 'Selected' ? 1 : 0}/>
            })}
        </div>
    )
}

export default ChooseBox;