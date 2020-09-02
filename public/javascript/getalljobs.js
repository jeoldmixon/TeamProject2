const city = document.getElementById('city');

async function getMuseJobs(event) {
    event.preventDefault()
    console.log(city);
    console.log(city.value);
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
        console.log('yata')
    } else {
        alert(response.statusText)
    }

}


async function getJoobleJobs(event) {
    event.preventDefault()
    console.log(city);
    console.log(city.value);
    const response2 = await fetch(`/api/search2`, {
        method: 'POST',
        body: JSON.stringify({
            city: city.value
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });


    if (response2.ok) {
        console.log('made it into jooble')
        document.location.reload();
    } else {
        alert(response.statusText)
    }
}
document.querySelector('#themuse').addEventListener('click', getMuseJobs)
document.querySelector('#jooble').addEventListener('click', getJoobleJobs)