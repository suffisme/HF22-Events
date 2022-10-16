const postBug = async (bug) => {
    const response = await fetch('http://localhost:8000/addBug',
        {
            method: 'POST',
            body: await JSON.stringify(bug),
            headers: { 'Content-Type': 'application/JSON' },
            credentials: 'include'
        }
    )
    return await response.json();
}


export default postBug;