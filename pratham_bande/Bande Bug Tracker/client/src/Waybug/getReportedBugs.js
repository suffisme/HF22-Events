const getReportedBugs = async() => {
    const response = await fetch('http://localhost:8000/getUserReportedBugs', {credentials: 'include'});
    return await response.json();
}

export default getReportedBugs;