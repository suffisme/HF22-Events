import { useEffect, useState } from "react";
import getReportedBugs from "../Waybug/getReportedBugs";
import Bugs from "../components/Bugs/Bugs";
import Card from "../components/UI/Card";

const ReportedBug = () => {
    const [content, setContent] = useState(null);


    useEffect(() => {
        let forcontent;
        const fun = async() => {
            return await getReportedBugs();
        }
        fun().then(response => {
            if(response.success){
                if(response.bugs.length > 0){
                    forcontent = <Bugs bugs={response.bugs} />
                }else{
                    forcontent = <p>No Bugs Reported from your end ... </p>
                }
            }else{
                forcontent = <p>An error occured</p>;
            }
        }).then(() => {
            setContent(forcontent);
        })
        //console.log(forcontent);
    }, [])

    return(
        <Card>
            {content && content}
        </Card>
    )
}

export default ReportedBug;