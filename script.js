document.getElementById('loadData').addEventListener('click', function() {
    fetch('https://jsonplaceholder.typicode.com/posts/1')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            displayData(data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            displayError('Error fetching data.');
        });
});

document.getElementById('xhrLoadData').addEventListener('click', function() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts/2', true);
    
    xhr.onload = function() {
        if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            console.log(data);
            displayData(data);
        } else {
            console.error('Error fetching data:', xhr.statusText);
            displayError('Error fetching data.');
        }
    };

    xhr.onerror = function() {
        console.error('Request failed');
        displayError('Error fetching data.');
    };

    xhr.send();
});

function displayData(data) {
    const tableBody = document.getElementById('outputTable').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = ''; // Clear previous data

    const row = document.createElement('tr');
    const cellId = document.createElement('td');
    cellId.textContent = data.id;
    const cellTitle = document.createElement('td');
    cellTitle.textContent = data.title;
    const cellBody = document.createElement('td');
    cellBody.textContent = data.body;

    row.appendChild(cellId);
    row.appendChild(cellTitle);
    row.appendChild(cellBody);
    tableBody.appendChild(row);
}

function displayError(message) {
    const feedbackMessage = document.getElementById('feedbackMessage');
    feedbackMessage.textContent = message;
    feedbackMessage.style.color = 'red';
}

document.getElementById('dataForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const postTitle = document.getElementById('postTitle').value;
    const postBody = document.getElementById('postBody').value;
    const postId = document.getElementById('postId').value;

    const postData = {
        title: postTitle,
        body: postBody,
    };

    if (postId) {
        const xhr = new XMLHttpRequest();
        xhr.open('PUT', `https://jsonplaceholder.typicode.com/posts/${postId}`, true);
        xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        
        xhr.onload = function() {
            if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                console.log(response);
                displayError(`Post ${postId} updated successfully.`);
            } else {
                displayError('Failed to update post.');
            }
        };

        xhr.onerror = function() {
            displayError('Failed to update post.');
        };

        xhr.send(JSON.stringify(postData));
    } else {

        // creating new post
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            displayError('New post created successfully!');
        })
        .catch(error => {
            console.error('Error creating post:', error);
            displayError('Error creating post.');
        });
    }
});
