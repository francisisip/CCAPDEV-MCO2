const searchButton = document.getElementById("search-icon-btn")
const searchBox = document.getElementById("search-box")

searchButton.addEventListener("click", async e =>{
    e.preventDefault()
    
    const input = searchBox.value.trim();
    console.log(input);

    const searchURL = `/search?search=${encodeURIComponent(input)}`;
    window.location.href = searchURL;
})

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