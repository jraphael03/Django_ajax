console.log('hello');

const postsBox = document.getElementById('posts-box');
const spinnerBox = document.getElementById('spinner-box');
const loadBtn = document.getElementById('load-btn');
const endBox = document.getElementById('end-box');


// CSRF_TOKEN for form since django CSRF_TOKEN won't work
const getCookie = (name) => {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}
const csrftoken = getCookie("csrftoken");

const likeUnlikePosts = () => {
  const likeUnlikeForms = [ ...document.getElementsByClassName('like-unlike-forms') ]
  console.log(likeUnlikeForms)
  // forEach, on submit grab event, and get the id of the form that was clicked
  likeUnlikeForms.forEach(form=addEventListener('submit', e=>{
    e.preventDefault()
    const clickedId = e.target.getAttribute('data-form-id') // class used in form

    // Get the button that was clicked
    const clickedBtn = document.getElementById(`like-unlike-${clickedId}`)

    // POST for liking a post
    $.ajax({
      type: "POST",
      url: "like-unlike/",
      data: {
        csrfmiddlewaretoken: csrftoken,
        pk: clickedId,
      },
      success: function (response) {
        console.log(response);
        // update button with count
        clickedBtn.textContent = response.liked ? `Unlike (${response.count})` : `Like (${response.count})`
      },
      error: function (error) {
        console.log(error);
      },
    });

  }))
}

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
                                      <form class="like-unlike-forms" data-form-id="${el.id}">
                                        <button href="#" class="btn btn-primary" id="like-unlike-${el.id}" >${el.liked ? `Unlike (${el.count}) ` : `Like (${el.count}) ` }</button>
                                      </form>
                                    </div>
                                </div>
                            </div>
                    </div>
            `;
        });
        likeUnlikePosts()
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