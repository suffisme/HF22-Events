const getDeveloper = async () => {
    const response = await fetch('http://localhost:8000/getDeveloper', {credentials: 'include'});
    return await response.json();
}

export default getDeveloper;