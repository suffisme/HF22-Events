const getDeveloperPendingBugs = async() => {
    const response = await fetch('http://localhost:8000/getDeveloperPendingBugs', {credentials: 'include'});
    return await response.json();
}

export default getDeveloperPendingBugs;