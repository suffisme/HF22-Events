const verifyBug = async (id) => {
    const response = await fetch('http://localhost:8000/verifyBug',
        {
            method: 'POST',
            body: await JSON.stringify({id}),
            headers: { 'Content-Type': 'application/JSON' },
            credentials: 'include'
        }
    )
    return await response.json();
}


export default verifyBug;