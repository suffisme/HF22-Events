const InitialCheck = async () => {
    try{
        const response = await fetch('http://localhost:8000/cookie-check', 
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/JSON'},
                credentials: 'include'
            }
        )
        return await response.json();
    }catch(err){
        console.log(err);
        return {};
    }
}

export default InitialCheck;