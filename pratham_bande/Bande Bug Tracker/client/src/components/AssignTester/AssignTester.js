import { useCallback, useEffect, useState } from "react";
import AssignBugToTester from "../../Wayuser/AssignBugToTester";
import getTester from "../../Wayuser/getTester";
import Choosing from "../ForChoosing/Choosing";

const AssignTester = (prop) => {
    
    const [available, setAvailable] = useState([]);
    const [message, setMessage] = useState(null);

    const fetchTester = useCallback(async () => {
        getTester().then(response => {
            if(response.success){
                setAvailable(response.testers);
            }
        })

    }, [])
    
    useEffect(() => {
        fetchTester();
    },[fetchTester]);

    if(available.length === 0){
        return(<h3>No Tester Available</h3>);
    }

    const submitHandler = async (testers) => {
        const testerIds = testers.map(tester => {return tester._id;})
        const response = await AssignBugToTester(testerIds, prop.bugId);
        if(response.success){
            setMessage(<p>Successfully Assigned !! </p>);
        }else{
            setMessage(<p>Some Error, please try later</p>);
        }
    }

    return(
        <div>
            {message && message}
            {!message && <h4>Please assign tester</h4>}
            {!message && <Choosing available={available} submit={submitHandler}/>}
        </div>
    )
}

export default AssignTester;