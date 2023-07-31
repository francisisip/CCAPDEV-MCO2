//change comment icon on posts on hover
function changeComment(x) {
  x.classList.toggle("bi-chat-left-fill");
  x.classList.toggle("bi-chat-left"); 
}

function changeUpvote(x) {
  let currUser = document.querySelector(".usernow")
  console.log(currUser)
  let user = Number(currUser.id.replace('now', ''))


  if(user) {
    let postID = x.id.replace("uvote", "")

    let downID = x.id.replace("uvote", "dvote")
    let countID = x.id.replace("uvote", "vcount")
    let element = document.getElementById(downID)
    let voteCount = document.getElementById(countID)

    if(element.classList.contains("downvote-2")){
      element.classList.toggle("downvote-2")
      element.classList.toggle("downvote")
      voteCount.innerHTML = Number(voteCount.innerHTML) + 1
    }

    if(x.classList.contains("upvote-2")){
      x.classList.toggle("upvote-2");
      x.classList.toggle("upvote");
      voteCount.innerHTML = Number(voteCount.innerHTML) - 1
    }
    else {
      x.classList.toggle("upvote-2");
      x.classList.toggle("upvote");
      voteCount.innerHTML = Number(voteCount.innerHTML) + 1
    }

    //updateCount(index)

    this.fetch('/posts/'+ postID + '/upvote',
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userID: user,
        postID: postID,
      })
    })
    .then((res) => res.json())
    .then((json) => console.log(json))
  }
  else{
    showErrorModal("You must login to do that!")
  }
}

function changeDownvote(x) {
  let currUser = document.querySelector(".usernow")
  let user = Number(currUser.id.replace('now', ''))

  if(user) {
    let postID = x.id.replace("dvote", "")
  
    let upID = x.id.replace("dvote", "uvote")
    let countID = x.id.replace("dvote", "vcount")
    let element = document.getElementById(upID)
    let voteCount = document.getElementById(countID)

    if(element.classList.contains("upvote-2")) {
      element.classList.toggle("upvote-2")
      element.classList.toggle("upvote")
      voteCount.innerHTML = Number(voteCount.innerHTML) - 1
    }

    if(x.classList.contains("downvote-2")) {
      x.classList.toggle("downvote");
      x.classList.toggle("downvote-2");
      voteCount.innerHTML = Number(voteCount.innerHTML) + 1
    } else {
      x.classList.toggle("downvote");
      x.classList.toggle("downvote-2");
      voteCount.innerHTML = Number(voteCount.innerHTML) - 1
    }

    //updateCount(index)

    this.fetch('/posts/'+ postID + '/downvote',
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userID: user,
        postID: postID,
      })
    })
    .then((res) => res.json())
    .then((json) => console.log(json))
  }
  else {
    showErrorModal("You must login to do that!")
  }


}

function showErrorModal(errorMessage) {
  const errorModal = new bootstrap.Modal(document.getElementById("errorModal"));
  const errorMessageElement = document.getElementById("error-message");
  errorMessageElement.textContent = errorMessage;
  errorModal.show();
}

function updateCount(index) {
  element = document.getElementById("votecount" + index)
  
  if (posts[posts.length-index].voteCount >= 1000) {
    let mod = posts[posts.length-index].voteCount % 100
    if (mod === 0) {
      element.innerHTML= (posts[posts.length-index].voteCount / 1000) + "K";
    } else {
      element.innerHTML= ((posts[posts.length-index].voteCount - mod) / 1000) + "K";
    }
  } else {
    element.innerHTML= posts[posts.length-index].voteCount;
  }
}
//------------------------------------------------------------------------------------------------------------------------------------
//see more functionality
const seeMoreButton = document.getElementById("see-more")
const nextLoad = 15

seeMoreButton.addEventListener("click", e => {
  e.preventDefault();

  let posts = document.querySelectorAll(".post")
  let indexHolder = document.querySelector(".posts-container")
  let shownIndex = Number(indexHolder.id.replace("posts-container", ""))

  let totalNumHolder = document.querySelector(".thread-container")
  let totalNum = Number(totalNumHolder.id.replace("mark", ""))

  const buttonCont = document.getElementById("see-more-container")

  let currUser = document.querySelector(".usernow")
  let user = Number(currUser.id.replace('now', ''))

  if(user) {
    try {
      console.log('in here')
      for(i = shownIndex; i < shownIndex + nextLoad && i < totalNum; i++) {
        posts[i].style.opacity = 0
        posts[i].classList.toggle("post-hidden")
        posts[i].classList.toggle("post-shown")
  
        fadeIn(posts[i])
      }
  
      indexHolder.id = "posts-container" + i
  
      if(i === totalNum) {
        buttonCont.style.display = 'none'
      }
  
    } catch (err) {
      console.log(err)
    }
  } else {
    showErrorModal("You must login to view more posts!")
  }

})

//fade in effect for new loaded posts
function fadeIn(div) {
  let opacity = 0

  let interval = setInterval(function(){
    if(opacity <= 1) {
      opacity = opacity +0.1
      div.style.opacity = opacity
    }else {
      clearInterval(interval)
    }
  }, 30)
}

//------------------------------------------------------------------------------------------------------------------------------------
//quill library for rich text-editor
var quill = new Quill('#content', {
  theme: 'snow'
});

// Update the hidden textarea with Quill's HTML content
function updateTextarea() {
  var contentInput = document.getElementById('content-input');
  contentInput.value = quill.root.innerHTML;
}

// Add event listener to update the textarea when content is changed
quill.on('text-change', updateTextarea);

//------------------------------------------------------------------------------------------------------------------------------------

//for initializing popovers
const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))

//to make popovers dismiss on click
const popover = new bootstrap.Popover('.popover-dismiss', {
    trigger: 'focus'
})

