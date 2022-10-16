const getDeveloperUnworkedBugs = async() => {
    const response = await fetch('http://localhost:8000/getDeveloperUnworkedBugs', {credentials: 'include'});
    return await response.json();
}

export default getDeveloperUnworkedBugs;