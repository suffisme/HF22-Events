import BugInfo from "./BugInfo";

const Bugs = (prop) => {
    return (
        <div>
            {
                prop.bugs.map(bug => {
                    return <BugInfo bug={bug} key={bug._id}/>
                })
            }
        </div>
    )
}

export default Bugs;