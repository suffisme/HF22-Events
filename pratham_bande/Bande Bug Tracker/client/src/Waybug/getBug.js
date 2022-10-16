const getBug = async (id) => {
    const response = await fetch('http://localhost:8000/getBug',
        {
            method: 'POST',
            body: await JSON.stringify({id:id}),
            headers: { 'Content-Type': 'application/JSON' },
            credentials: 'include'
        }
    )
    return await response.json();
}
export default getBug;