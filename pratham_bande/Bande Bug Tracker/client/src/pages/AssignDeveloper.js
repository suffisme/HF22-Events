import { useEffect, useState } from "react";
import getDeveloperPendingBugs from "../Waybug/getDeveloperPendingBugs";
import Bugs from "../components/Bugs/Bugs";
import Card from "../components/UI/Card";

const AssignDeveloper = () => {
    const [content, setContent] = useState(null);


    useEffect(() => {
        let forcontent;
        const fun = async() => {
            return await getDeveloperPendingBugs();
        }
        fun().then(response => {
            if(response.success){
                if(response.bugs.length > 0){
                    forcontent = <Bugs bugs={response.bugs} />
                }else{
                    forcontent = <p>No Bugs Left for Developer Assigning ... </p>
                }
            }else{
                forcontent = <p>An error occured</p>;
            }
        }).then(() => {
            setContent(forcontent);
        })
    }, [])

    return(
        <Card>
            {content && content}
        </Card>
    )
}

export default AssignDeveloper;