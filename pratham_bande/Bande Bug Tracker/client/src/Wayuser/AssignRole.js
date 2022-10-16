const AssignRole = async (id,role) => {
    try{
        const response = await fetch('http://localhost:8000/assignRole', 
            {
                method: 'POST',
                body: await JSON.stringify({ id: id, role: role }),
                headers: { 'Content-Type': 'application/JSON'},
                credentials: 'include'
            }
        )
        return await response.json();
    }catch(err){
        console.log("so this is the error macha");
        console.log(err);
    }
}


export default AssignRole;