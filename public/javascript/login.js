async function loginFormHandler(event) {
  event.preventDefault();

  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    const response = await fetch(`/api/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    if (response.ok) {
      setTimeout(() => {
        document.location.replace('/dashboard')
      }, 500)
    } else {
      alert(response.statusText)
    }
  };
}

document.querySelector('.login-form').addEventListener('submit', loginFormHandler);