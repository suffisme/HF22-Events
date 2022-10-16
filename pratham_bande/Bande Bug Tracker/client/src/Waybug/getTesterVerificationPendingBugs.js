const getTesterVerificationPendingBugs = async() => {
    const response = await fetch('http://localhost:8000/getTesterVerificationPendingBugs', {credentials: 'include'});
    return await response.json();
}

export default getTesterVerificationPendingBugs;