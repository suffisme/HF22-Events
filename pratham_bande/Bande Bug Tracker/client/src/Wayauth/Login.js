const Login = async (credentials) => {
    const response = await fetch('http://localhost:8000/login', 
        {
            method: 'POST',
            body: await JSON.stringify(credentials),
            headers: { 'Content-Type': 'application/JSON'},
            credentials: 'include'
        }
    )
    return await response.json();
}


export default Login;