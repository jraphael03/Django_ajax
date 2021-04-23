console.log('hello');

const helloWorldBox = document.getElementById('hello-world');
const postsBox = document.getElementById('posts-box');
const spinnerBox = document.getElementById('spinner-box');

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
        setTimeout(() => {
            spinnerBox.classList.add("not-visible"); // When data is loaded make spinnerBox not-visible
            console.log(data);
            // for each method on data
            data.forEach((el) => {
                postsBox.innerHTML += `
                    <div class="card mb-2" >
                        <div class="card-body">
                            <h5 class="card-title">${el.title}</h5>
                            <p class="card-text">${el.body}</p>
                        </div>
                            <div class="card-footer">
                                <div class="row">
                                    <div class="col-xs-2 col-md-1">
                                        <a href="#" class="btn btn-primary">Details</a>
                                    </div>
                                    <div class="col-xs-2 col-md-1">
                                        <a href="#" class="btn btn-primary">Like</a>
                                    </div>
                                </div>
                            </div>
                    </div>
            `;
                    });
        }, 100);

    },
    error: function(error){
        console.log(error)
    }
})

