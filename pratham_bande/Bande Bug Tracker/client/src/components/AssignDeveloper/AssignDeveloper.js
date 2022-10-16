import { useCallback, useEffect, useState } from "react";
import AssignBugToDeveloper from "../../Wayuser/AssignBugToDeveloper.js";
import getDeveloper from "../../Wayuser/getDeveloper";
import Choosing from "../ForChoosing/Choosing";

const AssignDeveloper = (prop) => {
    
    const [available, setAvailable] = useState([]);
    const [message, setMessage] = useState(null);

    const fetchDeveloper = useCallback(async () => {
        getDeveloper().then(response => {
            if(response.success){
                console.log(response.developers);
                setAvailable(response.developers);
            }
        })

    }, [])
    
    useEffect(() => {
        fetchDeveloper();
    },[fetchDeveloper]);

    if(available.length === 0){
        return(<h3>No Developer Available</h3>);
    }

    const submitHandler = async (Developers) => {
        const DeveloperIds = Developers.map(Developer => {return Developer._id;})
        const response = await AssignBugToDeveloper(DeveloperIds, prop.bugId);
        if(response.success){
            setMessage(<p>Successfully Assigned !! </p>);
        }else{
            setMessage(<p>Some Error, please try later</p>);
        }
    }

    return(
        <div>
            {message && message}
            {!message && <h4>Please assign Developer</h4>}
            {!message && <Choosing available={available} submit={submitHandler}/>}
        </div>
    )
}

export default AssignDeveloper;