import { useState } from "react";
import SubmitButton from "../UI/SubmitButton";
import RoleButton from "../UI/RoleButton";
import classes from './UserInfo.module.css'

const UserInfo = (prop) => {

    const [role, setRole] = useState(0);

    const clickHandler = () => {
        prop.onClick(prop.id, role);
    }

    return(
        <div className={classes.fordiv}>
            {prop.officeId !== '-1' && <RoleButton onClick={() => {setRole(pv => pv===1 ? 0 : 1)}} isSelected={role === 1}>Developer</RoleButton>}
            {prop.officeId !== '-1' && <RoleButton onClick={() => {setRole(pv => pv===2 ? 0 : 2)}} isSelected={role === 2}>Tester</RoleButton>}
            <RoleButton onClick={() => {setRole(pv => pv===3 ? 0 : 3)}} isSelected={role === 3}>User</RoleButton>
            <RoleButton onClick={() => {setRole(pv => pv===4 ? 0 : 4)}} isSelected={role === 4} color={"red"}>DELETE</RoleButton>
            <h3>{prop.name}</h3>
            <h4>{prop.email}</h4>
            {prop.officeId !== '-1' && <p>Office Id : {prop.officeId}</p>}
            {role>0 && <SubmitButton onClick={clickHandler}>Assign Role</SubmitButton>}
        </div>
    )
}

export default UserInfo;