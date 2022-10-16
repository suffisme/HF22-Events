import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getBug from "../../Waybug/getBug";
import AssignTester from "../AssignTester/AssignTester";
import Comments from "../Comments/Comments";
import Card from "../UI/Card"
import Options from "./Options";

const BugDetail = (props) => {

    const params = useParams();
    const id = params.bugId;
    const [bug, setBug] = useState({});

    const fetchBug = useCallback(async () => {
        const fun = async() => {
            return await getBug(id);
        }
        fun().then(response => {
            if(response.success){
                setBug(response.bug);
            }
        })
    }, [])

    useEffect(() => {
        fetchBug();
    }, [fetchBug]);

    if(bug === {}){
        return(
            <Card>
                No Such Bug Exists
            </Card>
        )
    }

    return(
        <Card color={"#CAD5E2"}>
            <h2>{bug.title}</h2>
            <h4>{bug.description}</h4>
            {/* {options && options} */}
            <Options bugId={id} bug={bug}/>
            <Comments/>
        </Card>
    )
}

export default BugDetail;