import { useEffect, useState } from "react";
import getDeveloperUnworkedBugs from "../Waybug/getDeveloperUnworkedBugs";
import Bugs from "../components/Bugs/Bugs";
import Card from "../components/UI/Card";

const ImproveBug = () => {
    const [content, setContent] = useState(null);


    useEffect(() => {
        let forcontent;
        const fun = async() => {
            return await getDeveloperUnworkedBugs();
        }
        fun().then(response => {
            if(response.success){
                if(response.bugs.length > 0){
                    forcontent = <Bugs bugs={response.bugs} />
                }else{
                    forcontent = <p>No Bugs Left for Improving ... </p>
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

export default ImproveBug;