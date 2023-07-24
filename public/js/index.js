//old js for index page
if (localStorage.getItem('user') === null) {
  empty = "";
  localStorage.setItem('user', JSON.stringify(empty));
}
if (localStorage.getItem('userID') === null) {
  empty = 0;
  localStorage.setItem('userID', JSON.stringify(empty));
}

window.addEventListener("load", function(e){
  try {
    const storedObject = JSON.parse(localStorage.getItem('userID')) // Parse the JSON back to an object
    let item = {userID : storedObject}
    // Make sure storedObject is an object before sending it in the POST request
    this.fetch('/currUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item)
    })

  } catch (err) {
    console.log(err);
  }
})

//-------------------------------------------------------------------------------------------------------------------------------------
/*
//POST DISPLAYING
//hard coded post data
//unshift to add to start of the array so that latest posts will show up first
posts.unshift(new Post("Pandemic & Food", "1", "Fishball_Lover39", "Meta", "June 11, 2023 - 11:05 PM", 
"Filipinos love to eat. Consider that a fact! When the pandemic happened and everyone was forced to stay at home, suddenly everyone became a food blogger. From traditional adobo and sinigang to mouthwatering lechon and halo-halo, our cuisine is a treasure trove of flavors and culinary delights. Being confined to our homes gave us the perfect opportunity to explore our passion for cooking and share it with the world. In the virtual realm, social media platforms became flooded with beautifully plated dishes, step-by-step recipe tutorials, and heartfelt stories behind each creation. It was inspiring to witness the creativity and resourcefulness of our fellow Filipinos in the kitchen. People started sharing family recipes, secret ingredients, and even their own twists on classic dishes. Food blogging during the pandemic became more than just a hobby; it became a way to connect and support one another. The online food community flourished with like-minded individuals who were eager to exchange ideas, offer cooking tips, and support local food businesses. It created a sense of unity and camaraderie, even when we were physically apart. As we continue to navigate through these challenging times, let's not forget the joy that food brings us. Whether it's recreating nostalgic dishes from our childhood or discovering new flavors, let's celebrate the resilience of the Filipino spirit through our shared love for food. Together, we can turn our kitchens into creative sanctuaries and our food blogs into platforms of inspiration and connection. So, grab your aprons, sharpen your knives, and let's embark on this culinary journey together. What's your favorite Filipino dish that you've shared on your food blog? Any tips for aspiring food bloggers looking to make their mark in the digital foodie world? Let's keep the foodie revolution alive!",
999, 4, [] , false))

posts.unshift(new Post("Pandemic & Food", "2", "Fishball_Lover39", "Meta", "June 11, 2023 - 11:05 PM", 
"Filipinos love to eat. Consider that a fact! When the pandemic happened and everyone was forced to stay at home, suddenly everyone became a food blogger. From traditional adobo and sinigang to mouthwatering lechon and halo-halo, our cuisine is a treasure trove of flavors and culinary delights. Being confined to our homes gave us the perfect opportunity to explore our passion for cooking and share it with the world. In the virtual realm, social media platforms became flooded with beautifully plated dishes, step-by-step recipe tutorials, and heartfelt stories behind each creation. It was inspiring to witness the creativity and resourcefulness of our fellow Filipinos in the kitchen. People started sharing family recipes, secret ingredients, and even their own twists on classic dishes. Food blogging during the pandemic became more than just a hobby; it became a way to connect and support one another. The online food community flourished with like-minded individuals who were eager to exchange ideas, offer cooking tips, and support local food businesses. It created a sense of unity and camaraderie, even when we were physically apart. As we continue to navigate through these challenging times, let's not forget the joy that food brings us. Whether it's recreating nostalgic dishes from our childhood or discovering new flavors, let's celebrate the resilience of the Filipino spirit through our shared love for food. Together, we can turn our kitchens into creative sanctuaries and our food blogs into platforms of inspiration and connection. So, grab your aprons, sharpen your knives, and let's embark on this culinary journey together. What's your favorite Filipino dish that you've shared on your food blog? Any tips for aspiring food bloggers looking to make their mark in the digital foodie world? Let's keep the foodie revolution alive!",
999, 4, [] , false))

posts.unshift(new Post("Pandemic & Food", "3", "Fishball_Lover39", "Meta", "June 11, 2023 - 11:05 PM", 
"Filipinos love to eat. Consider that a fact! When the pandemic happened and everyone was forced to stay at home, suddenly everyone became a food blogger. From traditional adobo and sinigang to mouthwatering lechon and halo-halo, our cuisine is a treasure trove of flavors and culinary delights. Being confined to our homes gave us the perfect opportunity to explore our passion for cooking and share it with the world. In the virtual realm, social media platforms became flooded with beautifully plated dishes, step-by-step recipe tutorials, and heartfelt stories behind each creation. It was inspiring to witness the creativity and resourcefulness of our fellow Filipinos in the kitchen. People started sharing family recipes, secret ingredients, and even their own twists on classic dishes. Food blogging during the pandemic became more than just a hobby; it became a way to connect and support one another. The online food community flourished with like-minded individuals who were eager to exchange ideas, offer cooking tips, and support local food businesses. It created a sense of unity and camaraderie, even when we were physically apart. As we continue to navigate through these challenging times, let's not forget the joy that food brings us. Whether it's recreating nostalgic dishes from our childhood or discovering new flavors, let's celebrate the resilience of the Filipino spirit through our shared love for food. Together, we can turn our kitchens into creative sanctuaries and our food blogs into platforms of inspiration and connection. So, grab your aprons, sharpen your knives, and let's embark on this culinary journey together. What's your favorite Filipino dish that you've shared on your food blog? Any tips for aspiring food bloggers looking to make their mark in the digital foodie world? Let's keep the foodie revolution alive!",
999, 4, [] , false))

posts.unshift(new Post("Pandemic & Food", "4", "Fishball_Lover39", "Meta", "June 11, 2023 - 11:05 PM", 
"Filipinos love to eat. Consider that a fact! When the pandemic happened and everyone was forced to stay at home, suddenly everyone became a food blogger. From traditional adobo and sinigang to mouthwatering lechon and halo-halo, our cuisine is a treasure trove of flavors and culinary delights. Being confined to our homes gave us the perfect opportunity to explore our passion for cooking and share it with the world. In the virtual realm, social media platforms became flooded with beautifully plated dishes, step-by-step recipe tutorials, and heartfelt stories behind each creation. It was inspiring to witness the creativity and resourcefulness of our fellow Filipinos in the kitchen. People started sharing family recipes, secret ingredients, and even their own twists on classic dishes. Food blogging during the pandemic became more than just a hobby; it became a way to connect and support one another. The online food community flourished with like-minded individuals who were eager to exchange ideas, offer cooking tips, and support local food businesses. It created a sense of unity and camaraderie, even when we were physically apart. As we continue to navigate through these challenging times, let's not forget the joy that food brings us. Whether it's recreating nostalgic dishes from our childhood or discovering new flavors, let's celebrate the resilience of the Filipino spirit through our shared love for food. Together, we can turn our kitchens into creative sanctuaries and our food blogs into platforms of inspiration and connection. So, grab your aprons, sharpen your knives, and let's embark on this culinary journey together. What's your favorite Filipino dish that you've shared on your food blog? Any tips for aspiring food bloggers looking to make their mark in the digital foodie world? Let's keep the foodie revolution alive!",
999, 4, [] , false))

posts.unshift(new Post("Pandemic & Food", "5", "Fishball_Lover39", "Meta", "June 11, 2023 - 11:05 PM", 
"Filipinos love to eat. Consider that a fact! When the pandemic happened and everyone was forced to stay at home, suddenly everyone became a food blogger. From traditional adobo and sinigang to mouthwatering lechon and halo-halo, our cuisine is a treasure trove of flavors and culinary delights. Being confined to our homes gave us the perfect opportunity to explore our passion for cooking and share it with the world. In the virtual realm, social media platforms became flooded with beautifully plated dishes, step-by-step recipe tutorials, and heartfelt stories behind each creation. It was inspiring to witness the creativity and resourcefulness of our fellow Filipinos in the kitchen. People started sharing family recipes, secret ingredients, and even their own twists on classic dishes. Food blogging during the pandemic became more than just a hobby; it became a way to connect and support one another. The online food community flourished with like-minded individuals who were eager to exchange ideas, offer cooking tips, and support local food businesses. It created a sense of unity and camaraderie, even when we were physically apart. As we continue to navigate through these challenging times, let's not forget the joy that food brings us. Whether it's recreating nostalgic dishes from our childhood or discovering new flavors, let's celebrate the resilience of the Filipino spirit through our shared love for food. Together, we can turn our kitchens into creative sanctuaries and our food blogs into platforms of inspiration and connection. So, grab your aprons, sharpen your knives, and let's embark on this culinary journey together. What's your favorite Filipino dish that you've shared on your food blog? Any tips for aspiring food bloggers looking to make their mark in the digital foodie world? Let's keep the foodie revolution alive!",
999, 4, [] , false))

//insert code here eventually for json

let initialItems = 3
let loadItems = 2

let container = document.getElementById("posts-container")
let seeMoreButton = document.getElementById("see-more")
let seeMore = document.getElementById("see-more-container")

function loadInitialItems() {
  let out = ""
  let i = 0 //counter

  let old = document.querySelectorAll(".load-container")

  for(let x of old) {
    x.remove()
  }

  for(let post of posts){
    if(i < initialItems) {

      switch(post.tag) {
        case "Announcements":
          tag = "bi-megaphone-fill";
          break;
        case "Review":
          tag = "bi-check-circle-fill";
          break;
        case "Query":
          tag = "bi-question-circle-fill";
          break;
        case "Meme":
          tag = "bi-emoji-laughing-fill";
          break;
        case "Meta":
          tag = "bi-lightbulb-fill";
      }

      out += `
        <div class="post" id="post${post.id}">
          <div class="post-info-container">
            <a class="icon-container" href="/user/">
              <img class="user-icon" src="static/img/icon.jpg" alt="">
            </a>
            <div class="post-info">
              <a href="web/post5-loggedin.html">
                <div class="post-title">${post.title}</div>
              </a>
              <div class="post-tags-container">
                <div class="post-tag ${(post.tag).toLowerCase()}-tag">
                  <a href="web/search-loggedin.html">
                    <i class="bi ${tag}"></i>
                    <span>${post.tag}</span>
                  </a>
                </div>
              </div>
              <div class="post-details">
                <div class="details-icon"></div>
                <i class="bi bi-pen-fill"></i>
                <a href="web/profile1-logged.html">
                  <div class="username">${post.user}</div>
                </a>
                <div class="post-date">&nbsp;created ${post.date}</div>
              </div>
              <div class="post-description">
              ${post.body}
              </div>
            </div>
            <div class="interactions">
              <div class="upvote" id="uvote${post.id}" onclick="changeUpvote(this)"></div>
              <div class="vote-count" id="votecount${post.id}">${post.voteCount}</div>
              <div class="downvote" id="dvote${post.id}" onclick="changeDownvote(this)"></div>
              <div class="spacer"></div>
              <a href="web/post5-loggedin.html" style="text-align: center;">
                <i onmouseenter="changeComment(this)" onmouseleave="changeComment(this)" class="bi bi-chat-left comment-icon"></i>
              </a>
              <div class="comment-count">${post.commentCount}</div>
            </div>
          </div>
        </div>
      `
    }
    i++
  }

  let newDiv = document.createElement("div")
  container.insertBefore(newDiv, seeMore)
  newDiv.classList.add("load-container")
  newDiv.innerHTML = out
}

//load initial posts on run
document.addEventListener('DOMContentLoaded', e => {
  console.log("DOM Loaded")
  console.log(posts)
  loadInitialItems()
})

//SEE MORE FUNCTIONALITY
function loadMore() {
  let out = ""
  let i = 0
  let currentlyDisplayedPosts = document.querySelectorAll(".post").length
  let tag


  for(let post of posts) {
    if(i >= currentlyDisplayedPosts && i < loadItems + currentlyDisplayedPosts) {

      switch(post.tag) {
        case "Announcements":
          tag = "bi-megaphone-fill";
          break;
        case "Review":
          tag = "bi-check-circle-fill";
          break;
        case "Query":
          tag = "bi-question-circle-fill";
          break;
        case "Meme":
          tag = "bi-emoji-laughing-fill";
          break;
        case "Meta":
          tag = "bi-lightbulb-fill";
      }

      out += `
        <div class="post" id="post${post.id}">
          <div class="post-info-container">
            <a class="icon-container" href="web/profile1-logged.html">
              <img class="user-icon" src="images/icon.jpg" alt="">
            </a>
            <div class="post-info">
              <a href="web/post5-loggedin.html">
                <div class="post-title">${post.title}</div>
              </a>
              <div class="post-tags-container">
                <div class="post-tag ${(post.tag).toLowerCase()}-tag">
                  <a href="web/search-loggedin.html">
                    <i class="bi ${tag}"></i>
                    <span>${post.tag}</span>
                  </a>
                </div>
              </div>
              <div class="post-details">
                <div class="details-icon"></div>
                <i class="bi bi-pen-fill"></i>
                <a href="web/profile1-logged.html">
                  <div class="username">${post.user}</div>
                </a>
                <div class="post-date">&nbsp;created ${post.date}</div>
              </div>
              <div class="post-description">
              ${post.body}
              </div>
            </div>
            <div class="interactions">
              <div class="upvote" id="uvote${post.id}" onclick="changeUpvote(this)"></div>
              <div class="vote-count" id="votecount${post.id}">${post.voteCount}</div>
              <div class="downvote" id="dvote${post.id}" onclick="changeDownvote(this)"></div>
              <div class="spacer"></div>
              <a href="web/post5-loggedin.html" style="text-align: center;">
                <i onmouseenter="changeComment(this)" onmouseleave="changeComment(this)" class="bi bi-chat-left comment-icon"></i>
              </a>
              <div class="comment-count">${post.commentCount}</div>
            </div>
          </div>
        </div>
      `
    }
    i++
  }
  let newDiv = document.createElement("div")
  container.insertBefore(newDiv, seeMore)
  newDiv.classList.add("load-container")
  newDiv.innerHTML = out
  newDiv.style.opacity = 0

  if(document.querySelectorAll(".post").length == posts.length) {
    seeMoreButton.style.display = "none"
  }

  fadeIn(newDiv)
}

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
*/
//------------------------------------------------------------------------------------------------------------------------------------

//change comment icon on posts on hover
function changeComment(x) {
  x.classList.toggle("bi-chat-left-fill");
  x.classList.toggle("bi-chat-left"); 
}

function changeUpvote(x) {
  let currUser = document.querySelector(".usernow")
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

