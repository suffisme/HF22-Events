const getTesterPendingBugs = async() => {
    const response = await fetch('http://localhost:8000/getTesterPendingBugs', {credentials: 'include'});
    return await response.json();
}

export default getTesterPendingBugs;