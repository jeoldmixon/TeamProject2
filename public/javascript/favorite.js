async function deleteFormHandler(event) {
    event.preventDefault();
    let id = document.querySelector('.title').outerHTML.split('"')[1]
    console.log(id[1])

    


    const response = await fetch(`/api/search/${id}`, {
        method: 'PUT',
        body: {

        }
    })

    if (response.ok) {
        document.location.reload();
    } else {
        alert(response.statusText)
    }
}

document.querySelector('#favorite').addEventListener('click', deleteFormHandler)