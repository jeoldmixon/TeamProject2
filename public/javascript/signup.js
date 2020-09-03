async function signupFormHandler(event) {
  event.preventDefault();

  const email = document.querySelector("#email-signup").value.trim();
  const username = document.querySelector("#username-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();

  if (username && email && password) {
    console.log('signing up')
    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({
        username,
        email,
        password
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/dashboard/");
    } else {
      alert(response.statusText);
    }
  }
}

document.querySelector(".signup-form").addEventListener("submit", signupFormHandler);
