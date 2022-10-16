import { useSelector } from "react-redux";
import AssignDeveloper from "../AssignDeveloper/AssignDeveloper";
import AssignTester from "../AssignTester/AssignTester";
import ImproveBug from "../ImproveBug/ImproveBug";
import VerifyBug from "../VerifyBug/VerifyBug";
import VerifyPatch from "../VerifyPatch/VerifyPatch";

const Options = (prop) =>{

    const user = useSelector(state => state.auth.user);
    const isLoggedIn = useSelector(state => state.auth.isAuthenticated);

    console.log(isLoggedIn);
    console.log(user);

    if(user.role === 'User'){
        return <div></div>
    }
    
    if(user.role === 'Tester'){
        if(!user.bugsAssigned || (user.bugsAssigned.indexOf(prop.bugId) === -1)){
            return <div></div>
        }else if(prop.bug.testerApproved){
            return <div></div>
        }else if(prop.bug.developerWorked){
            return <VerifyPatch bugId={prop.bugId} />
        }else if(prop.bug.testerVerified){
            return <div></div>
        }else{
            return <VerifyBug bugId={prop.bugId}/>
        }
    }
    if(user.role === 'Developer'){
        if(prop.bug.testerVerified && !prop.bug.developerWorked && (user.bugsAssigned && user.bugsAssigned.indexOf(prop.bugId) !== -1)){
            return <ImproveBug bugId={prop.bugId} />
        }else{
            return <div></div>
        }
    }

    if(!prop.bug.testerIds || prop.bug.testerIds.length === 0){
        return <AssignTester bugId={prop.bugId}/>
    }else if(!prop.bug.developerIds || prop.bug.developerIds.length === 0 && prop.bug.testerVerified){
        return <AssignDeveloper bugId={prop.bugId} />
    }
    return(
        <div></div>
    )
}

export default Options;