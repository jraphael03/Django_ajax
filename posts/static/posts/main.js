console.log('hello');

const postsBox = document.getElementById('posts-box');
const spinnerBox = document.getElementById('spinner-box');
const loadBtn = document.getElementById('load-btn');
const endBox = document.getElementById('end-box');

let visible = 3

const getData = () => {
  // GET load_post_data_view
  $.ajax({
    type: "GET",
    url: `/data/${visible}/`,
    success: function (response) {
      console.log(response);
      const data = response.data; // Data is being passed by the backend view
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
      console.log(response.size)
      // If we have posts to load display load more button, if there are no more do not display
      if(response.size === 0){
          endBox.textContent = 'No posts added yet...'
      }
      else if(response.size <= visible){
          loadBtn.classList.add('not-visible')
          endBox.textContent = "No more posts to load..."
      }
    },
    error: function (error) {
      console.log(error);
    },
  });
}

// When Load More button is clicked load more posts
loadBtn.addEventListener('click', () => {
    spinnerBox.classList.remove('not-visible')
    visible += 3
    getData()
})

getData()