console.log('hello');

const helloWorldBox = document.getElementById('hello-world');
const postsBox = document.getElementById('posts-box');

// GET
$.ajax({
    type: 'GET',
    url: '/hello-world/',
    success: function(response){
        console.log('success', response)
        helloWorldBox.textContent = response.text
    },
    error: function(error){
        console.log('error', error)
    }
})

// GET load_post_data_view
$.ajax({
    type: 'GET',
    url: '/data/',
    success: function(response){
        console.log(response)
        const data = response.data  // Data is being passed by the backend view
        console.log(data)
        // for each method on data
        data.forEach(el => {
            postsBox.innerHTML += `
                ${el.title} - <b>${el.body}</b><br/>
            `
        });
    },
    error: function(error){
        console.log(error)
    }
})

