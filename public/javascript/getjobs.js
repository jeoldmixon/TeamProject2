async function postJobs(title, company, location, url) {
  const response = await fetch('/api/search', {
     method: 'POST',
     body: JSON.stringify({
         title: title,
         company:company,
         location: location,
         url: url,
         user_id: 1
     }),
     headers: {
         'Content-Type': 'application/json'
     }
   })
 
   if (response.ok) {
     console.log('Completed')
   } else {
     alert(response.statusText)
   }
 }

 module.exports = postJobs;