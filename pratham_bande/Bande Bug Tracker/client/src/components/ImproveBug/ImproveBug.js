import RoleButton from "../UI/RoleButton"
import SubmitButton from "../UI/SubmitButton"
import { useState } from "react";
import verifyBug from "../../Waybug/verifyBug";

const ImproveBug = (prop) => {

    const [opt, setOpt] = useState(0);
    const [message, setMessage] = useState(null);


    const submitHandler = async () => {
        let r;
        if (opt === 1) {
            r = await verifyBug(prop.bugId);
        }
        setMessage(<p>{r.message}</p>);
    }


    return (
        <div>
            {message && message}
            {!message &&
                <div>
                    <div>
                        <RoleButton isSelected={opt === 1} onClick={() => { setOpt(pv => pv === 1 ? 0 : 1) }}>The Bug has been patched. Send it to Testers for Approval ... </RoleButton>
                    </div>
                    {opt > 0 && <SubmitButton onClick={submitHandler}>Submit</SubmitButton>}
                </div>
            }
        </div>
    )
}

export default ImproveBug;