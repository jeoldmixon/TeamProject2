async function deleteFormHandler(event) {
    event.preventDefault();
    let id = document.querySelector('.individual-id').outerHTML.split('"')[1]
    console.log(id[1])


    const response = await fetch(`/api/search/${id}`, {
        method: 'DELETE'
    })

    if (response.ok) {
        document.location.replace('/dashboard/');
    } else {
        alert(response.statusText)
    }
}

document.querySelector('#delete-one-job').addEventListener('click', deleteFormHandler)