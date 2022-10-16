import UserInfo from "./UserInfo";

const Users = (prop) => {
    return (
        <div>
            {
                prop.users.map(user => {
                    return <UserInfo key={user._id} id={user._id}name={user.name} email={user.email} officeId={user.officeId} onClick={prop.onClick}/>
                })
            }
        </div>
    )
}

export default Users;