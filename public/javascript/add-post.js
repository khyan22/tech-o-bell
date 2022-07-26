async function newFormHandler(event) {
  event.preventDefault();

  const post_title = document.querySelector('#post-title').value;
  const post_body = document.querySelector('#post-body').value;
  
  const response = await fetch(`/api/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ post_title, post_body })
  });

  if (response.ok) {
    document.location.reload();
  } else {
    alert(response.statusText);
    console.log('fetch problem')
  }
};

document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);