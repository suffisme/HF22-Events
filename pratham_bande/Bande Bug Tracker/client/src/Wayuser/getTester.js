const getTester = async () => {
    const response = await fetch('http://localhost:8000/getTester', {credentials: 'include'});
    return await response.json();
}

export default getTester;