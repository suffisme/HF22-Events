const AssignBugToDeveloper = async(developerIds, bugId) => {
    const response = await fetch('http://localhost:8000/AssignBugToDeveloper', 
    {
        method: 'POST',
        body: await JSON.stringify({developerIds,bugId}),
        headers: {'Content-Type' : 'application/JSON'}
    })
    return await response.json();
}

export default AssignBugToDeveloper;
