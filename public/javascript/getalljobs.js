// Calls either API and sends the city name to the POST route

// Takes the city input into the DOM
const city = document.getElementById('city');

// The Muse
async function getMuseJobs(event) {
    event.preventDefault()
    
    const response = await fetch(`/api/search`, {
        method: 'POST',
        body: JSON.stringify({
            city: city.value
        }),
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
// JOOBLE
async function getJoobleJobs(event) {
    event.preventDefault()

    const response = await fetch(`/api/search2`, {
        method: 'POST',
        body: JSON.stringify({
            city: city.value
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    console.log(response.ok)

    if (response.ok) {
        document.location.reload();
    } else {
        alert(response.statusText)
    }
}

document.querySelector('#themuse').addEventListener('click', getMuseJobs)
document.querySelector('#jooble').addEventListener('click', getJoobleJobs)