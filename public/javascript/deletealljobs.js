async function deleteFormHandler(event) {
    event.preventDefault();

    const response = await fetch(`/api/search`, {
        method: 'DELETE', 
    })
   
    if (response.ok) {
        document.location.reload();
    } else {
        alert(response.statusText)
    }
}

document.querySelector('#delete-all').addEventListener('click', deleteFormHandler)