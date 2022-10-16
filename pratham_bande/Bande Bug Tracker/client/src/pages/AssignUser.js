import { useCallback, useEffect, useState } from "react";
import Users from "../components/AssignRole/Users";
import Card from "../components/UI/Card";
import AssignRole from "../Wayuser/AssignRole";
import DeleteUser from "../Wayuser/DeleteUser";
import getUnassignedUsers from "../Wayuser/getUnassignedUsers";

const AssignUser = () => {
    const [available, setAvailable] = useState([]);

    const deleteUser = async(id) => {
        return await DeleteUser(id);
    }

    const assignUserRole = async (id, role) => {
        console.log("id: ", id);
        console.log("role: ", role);
        let realRole;
        if(role === 4){
            const r = await deleteUser(id);
        }
        else{
            if(role === 1)realRole = 'Developer';
            else if(role === 2)realRole = 'Tester';
            else if(role === 3)realRole = 'User';
            const r = await AssignRole(id,realRole)
        }
        fetchUsers();
    }
    const fetchUsers = useCallback(async () => {
        const response = await getUnassignedUsers();
        if (response.success) {
            setAvailable(response.users);
        }
    } , []);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    let content = <p>no user found for assigning</p>;

    if(available.length !== 0){
        content = <Users users={available} onClick={assignUserRole} />
    }
    return (
        <Card>
            {content && content}
        </Card>
    )
};

export default AssignUser;