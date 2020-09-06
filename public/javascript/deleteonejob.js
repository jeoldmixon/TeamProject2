// async function deleteFormHandler(event) {
//     event.preventDefault();

//     console.log(this)

//     let id = document.querySelector('.title').outerHTML.split('"')[1]
//     console.log(id[1])


//     const response = await fetch(`/api/search/${id}`, {
//         method: 'DELETE'
//     })

//     if (response.ok) {
//         // document.location.reload();
//     } else {
//         alert(response.statusText)
//     }
// }

// document.querySelector('.delete-one-job').addEventListener('click', function(e) {deleteFormHandler(e)}, false)

// .outerHTML.split('"')[1]