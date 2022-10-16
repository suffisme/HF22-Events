const AssignBugToTester = async(testerIds, bugId) => {
    const response = await fetch('http://localhost:8000/AssignBugToTester', 
    {
        method: 'POST',
        body: await JSON.stringify({testerIds,bugId}),
        headers: {'Content-Type' : 'application/JSON'}
    })
    return await response.json();
}

export default AssignBugToTester;
