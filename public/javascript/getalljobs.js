async function getAllJobs(event) {
    event.preventDefault()
    
    const response = await fetch(`/api/search`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.reload();
    } else {
        alert(response.statusText)
    }
}

document.querySelector('#search').addEventListener('click', getAllJobs)