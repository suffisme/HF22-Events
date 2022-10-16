const deleteBug = async (id) => {
    const response = await fetch('http://localhost:8000/deleteBug',
        {
            method: 'POST',
            body: await JSON.stringify({id}),
            headers: { 'Content-Type': 'application/JSON' },
            credentials: 'include'
        }
    )
    return await response.json();
}


export default deleteBug;