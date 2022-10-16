const getUnassignedUsers = async () => {
    const response = await fetch('http://localhost:8000/getUnassignedUsers', {credentials: 'include'});
    return await response.json();
}

export default  getUnassignedUsers;