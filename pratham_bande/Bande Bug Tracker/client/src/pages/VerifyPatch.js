import { useEffect, useState } from "react";
import getTesterApprovalPendingBugs from "../Waybug/getTesterApprovalPendingBugs";
import Bugs from "../components/Bugs/Bugs";
import Card from "../components/UI/Card";

const VerifyPatch = () => {
    const [content, setContent] = useState(null);


    useEffect(() => {
        let forcontent;
        const fun = async() => {
            return await getTesterApprovalPendingBugs();
        }
        fun().then(response => {
            if(response.success){
                if(response.bugs.length > 0){
                    forcontent = <Bugs bugs={response.bugs} />
                }else{
                    forcontent = <p>No Patch Left for Verification ... </p>
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

export default VerifyPatch;