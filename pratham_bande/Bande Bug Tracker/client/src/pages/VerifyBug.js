import { useEffect, useState } from "react";
import getTesterVerificationPendingBugs from "../Waybug/getTesterVerificationPendingBugs";
import Bugs from "../components/Bugs/Bugs";
import Card from "../components/UI/Card";

const VerifyBug = () => {
    const [content, setContent] = useState(null);


    useEffect(() => {
        let forcontent;
        const fun = async() => {
            return await getTesterVerificationPendingBugs();
        }
        fun().then(response => {
            if(response.success){
                if(response.bugs.length > 0){
                    forcontent = <Bugs bugs={response.bugs} />
                }else{
                    forcontent = <p>No Bugs Left for Verification ... </p>
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

export default VerifyBug;