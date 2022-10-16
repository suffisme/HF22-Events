import { useState } from "react";
import ChooseBox from "./ChooseBox";
import classes from './Choosing.module.css';

const Choosing = (prop) => {

    const [available, setAvailable] = useState(prop.available);
    const [selected, setSelected] = useState([]);

    const switcher = (id, type) => {
        let a = available;
        let s = selected;
        let tt;
        if (type === 1) {
            tt = selected.find(t => t._id === id);
            a.push(tt);
            s = s.filter(t => t._id !== id);
        } else {
            tt = available.find(t => t._id === id);
            s.push(tt);
            a = a.filter(t => { return t._id !== id });
        }
        setAvailable(a);
        setSelected(s);
    }

    return (
        <div>
            <div className={classes.fordiv}>
                <ChooseBox localArray={available} text={"Available"} onClick={switcher} />
                <ChooseBox localArray={selected} text={"Selected"} onClick={switcher} />
            </div>
            { selected.length > 0 && <button className={classes.button_85} role="button" onClick={() => {prop.submit(selected);}}>Assign</button>}
        </div>
    )
}

export default Choosing;