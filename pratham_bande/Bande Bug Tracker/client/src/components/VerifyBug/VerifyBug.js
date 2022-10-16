import RoleButton from "../UI/RoleButton"
import SubmitButton from "../UI/SubmitButton"
import { useState } from "react";
import verifyBug from "../../Waybug/verifyBug";
import deleteBug from "../../Waybug/deleteBug";

const VerifyBug = (prop) => {

    const [opt, setOpt] = useState(0);
    const [message, setMessage] = useState(null);


    const submitHandler = async () => {
        let r;
        if (opt === 1) {
            r = await verifyBug(prop.bugId);
        } else {
            r = await deleteBug(prop.bugId);
        }
        setMessage(<p>{r.message}</p>);
    }


    return (
        <div>
            {message && message}
            {!message &&
                <div>
                    <div>
                        <RoleButton isSelected={opt === 1} onClick={() => { setOpt(pv => pv === 1 ? 0 : 1) }}>Yep, the Bug is Legit, Verified and Send it to Developer Team</RoleButton>
                        <RoleButton isSelected={opt === 2} onClick={() => { setOpt(pv => pv === 2 ? 0 : 2) }} color={"red"}>Nope, The bug is not Legit, Delete it</RoleButton>
                    </div>
                    {opt > 0 && <SubmitButton onClick={submitHandler}>Submit</SubmitButton>}
                </div>
            }
        </div>
    )
}

export default VerifyBug;