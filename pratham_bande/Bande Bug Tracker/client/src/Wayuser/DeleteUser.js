const DeleteUser = async (id) => {
    const response = await fetch('http://localhost:8000/deleteUser', 
    {
        method: 'POST',
        body: await JSON.stringify({id:id}),
        headers: { 'Content-Type': 'application/JSON' },
        credentials: 'include'
    });
    return await response.json();
}

export default DeleteUser;