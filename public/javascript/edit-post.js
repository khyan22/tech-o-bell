async function editFormHandler(event) {
  event.preventDefault();

  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];

  const post_title = document.querySelector('input[name="post-title"]').value;

  const response = await fetch(`/api/posts/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ post_title })
  });

  if (response.ok) {
    document.location.replace('/dashboard/')
  } else {
    alert(response.statusText)
  }
};

document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);