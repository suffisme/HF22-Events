const getTesterApprovalPendingBugs = async() => {
    const response = await fetch('http://localhost:8000/getTesterApprovalPendingBugs', {credentials: 'include'});
    return await response.json();
}

export default getTesterApprovalPendingBugs;