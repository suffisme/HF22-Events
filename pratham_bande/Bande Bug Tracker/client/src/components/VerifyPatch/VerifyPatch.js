import RoleButton from "../UI/RoleButton"
import SubmitButton from "../UI/SubmitButton"
import { useState } from "react";
import verifyBug from "../../Waybug/verifyBug";
import rollBackToDev from "../../Waybug/rollBackToDev";

const VerifyPatch = (prop) => {

    const [opt, setOpt] = useState(0);
    const [message, setMessage] = useState(null);


    const submitHandler = async () => {
        let r;
        if (opt === 1) {
            r = await verifyBug(prop.bugId);
        } else {
            r = await rollBackToDev(prop.bugId);
        }
        setMessage(<p>{r.message}</p>);
    }


    return (
        <div>
            {message && message}
            {!message &&
                <div>
                    <div>
                        <RoleButton isSelected={opt === 1} onClick={() => { setOpt(pv => pv === 1 ? 0 : 1) }} color={"lightgreen"}>Patch Verfied. Close the Bug</RoleButton>
                        <RoleButton isSelected={opt === 2} onClick={() => { setOpt(pv => pv === 2 ? 0 : 2) }} color={"red"}>Bug still exists. Send it back to Dev Team</RoleButton>
                    </div>
                    {opt > 0 && <SubmitButton onClick={submitHandler}>Submit</SubmitButton>}
                </div>
            }
        </div>
    )
}

export default VerifyPatch;