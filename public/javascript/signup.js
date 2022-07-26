async function signupFormHandler(event) {
  event.preventDefault();

  const username = document.querySelector('#username-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();


  if (username && email && password) {
    const response = await fetch('/api/users', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password})
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
      console.log(username, email, password);
    }
  } 
};

document.querySelector('.signup-form').addEventListener('submit', signupFormHandler)