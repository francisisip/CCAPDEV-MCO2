const uvote = document.getElementById("upvote");
const dvote = document.getElementById("downvote");
const tagIcon = document.getElementById("tagIcon");

const title = $("#title")
const user = $(".username");
const tag = $(".tag");

const date = $("#post-date");
const body = $("#body");
const count = $("#count");


const edit = document.getElementById("edit");
const publish = document.getElementById("publish-button");
const modalTitle = document.getElementById("staticBackdropLabel");
const reply = document.getElementById("reply");
const newReply = document.getElementById("publish-button-reply")

function changeUpvote(x) {
  if (dvote.classList.contains("downvote-2")) {
    dvote.classList.remove("downvote-2");
    post.count = post.count + 1;
  }
  if (x.classList.contains("upvote-2")) {
    x.classList.remove("upvote-2");
    post.count = post.count - 1;
  } else {
    x.classList.toggle("upvote-2");
    post.count = post.count + 1;
  }
  updateCount();
}

function changeDownvote(x) {
  if (uvote.classList.contains("upvote-2")) {
    uvote.classList.remove("upvote-2");
    post.count = post.count - 1;
  }
  if (x.classList.contains("downvote-2")) {
    x.classList.remove("downvote-2");
    post.count = post.count + 1;
  } else {
    x.classList.toggle("downvote-2");
    post.count = post.count - 1;
  }
  updateCount();
}

  
function updateCount() {

  if (post.count >= 1000) {
    let mod = post.count % 100
    if (mod === 0) {
      count.text(post.count / 1000 + "K");
    } else {
      count.text((post.count - mod) / 1000 + "K");
    }
  } else {
    count.text(post.count);
  }
}

function updateTag() {
  tag.text(post.tag);
  tagIcon.classList.remove("bi-megaphone-fill", "bi-check-circle-fill", "bi-question-circle-fill", "bi-lightbulb-fill");


  switch(post.tag) {
    case "Announcements":
      tagIcon.classList.toggle("bi-megaphone-fill");
      break;
    case "Review":
      tagIcon.classList.toggle("bi-check-circle-fill");
      break;
    case "Query":
      tagIcon.classList.toggle("bi-question-circle-fill");
      break;
    case "Meme":
      tagIcon.classList.toggle("bi-question-circle-fill");
      break;
    case "Meta":
      tagIcon.classList.toggle("bi-lightbulb-fill");
      break;
  }
}

function updatePost() {
  title.text(post.title);
  user.text(post.user);
  updateTag();
  date.text(post.date);
  body.text(post.body);
  updateCount();

  if (post.edited) {
    const editedText = document.createElement("span");
    editedText.innerHTML = " (edited)";
    editedText.style.fontStyle = "italic";
    editedText.style.fontSize = "0.8em";
    
    date.append(editedText);
  }
}

function updateTextarea() {
  var contentInput = document.getElementById('content-input');
  contentInput.value = quill.root.innerHTML;
}

function capitalizeFLetter(tag) {
  return tag[0].toUpperCase() + tag.slice(1);
}

function formatDate(date) {
  var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  var month = monthNames[date.getMonth()];
  var day = date.getDate();
  var year = date.getFullYear();

  var formattedDate = month + " " + day + ", " + year;
  return formattedDate;
}

function formatCommentDate(date) {
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  const formattedDate = date.toLocaleDateString(undefined, options);

  return formattedDate;
}

function formatTime(hours, minutes) {

  var period = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;

  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  var formattedTime = hours + ":" + minutes + " " + period;
  return formattedTime;
}


//quill library for rich text-editor
var quill = new Quill('#content', {
  theme: 'snow'
});

// Initialize Quill editor for the "reply-content" element
var replyQuill = new Quill('#reply-content.editor', {
  theme: 'snow'
});

// Update the hidden textarea with Quill's HTML content
function updateTextarea() {
  var contentInput = document.getElementById('content-input');
  var plainTextContent = quill.getText();
  contentInput.value = plainTextContent;
}

// Add event listener to update the textarea when content is changed
quill.on('text-change', updateTextarea);

class Post {
  constructor(title, user, tag, date, body, count, edited) {
    this.title = title;
    this.user = user;
    this.tag = tag;
    this.date = date;
    this.body = body;
    this.count = count;
    this.edited = edited;
  }
}

const post = new Post("Pandemic & Food", "Fishball_Lover39", "Meta", "June 11, 2023 - 11:05 PM", 
"Filipinos love to eat. Consider that a fact! When the pandemic happened and everyone was forced to stay at home, suddenly everyone became a food blogger. From traditional adobo and sinigang to mouthwatering lechon and halo-halo, our cuisine is a treasure trove of flavors and culinary delights. Being confined to our homes gave us the perfect opportunity to explore our passion for cooking and share it with the world. In the virtual realm, social media platforms became flooded with beautifully plated dishes, step-by-step recipe tutorials, and heartfelt stories behind each creation. It was inspiring to witness the creativity and resourcefulness of our fellow Filipinos in the kitchen. People started sharing family recipes, secret ingredients, and even their own twists on classic dishes. Food blogging during the pandemic became more than just a hobby; it became a way to connect and support one another. The online food community flourished with like-minded individuals who were eager to exchange ideas, offer cooking tips, and support local food businesses. It created a sense of unity and camaraderie, even when we were physically apart. As we continue to navigate through these challenging times, let's not forget the joy that food brings us. Whether it's recreating nostalgic dishes from our childhood or discovering new flavors, let's celebrate the resilience of the Filipino spirit through our shared love for food. Together, we can turn our kitchens into creative sanctuaries and our food blogs into platforms of inspiration and connection. So, grab your aprons, sharpen your knives, and let's embark on this culinary journey together. What's your favorite Filipino dish that you've shared on your food blog? Any tips for aspiring food bloggers looking to make their mark in the digital foodie world? Let's keep the foodie revolution alive!",
199999, false);

updatePost();



edit.addEventListener('click', function handleEditClick() {
  var modal = document.getElementById('editModal');
  var titleInput = document.getElementById('create-post-title');
  var tagSelect = document.getElementById('tag');
  var contentInput = document.getElementById('content-input');

  modalTitle.textContent = "Edit Post"
  titleInput.value = post.title;
  tagSelect.value = post.tag.toLowerCase();
  quill.root.innerHTML = post.body; // Set the Quill editor's content directly
  quill.on('text-change', updateTextarea); // Reattach the 'text-change' event listener

  var editModal = new bootstrap.Modal(modal);
  editModal.show();

  function showErrorModal(errorMessage) {
    const errorModal = new bootstrap.Modal(document.getElementById("errorModal"));
    const errorMessageElement = document.getElementById("error-message");
    errorMessageElement.textContent = errorMessage;
    errorModal.show();
  }

  publish.addEventListener('click', function handlePublishClick(e) {
    e.preventDefault()

    if (titleInput.value.trim() === "" && contentInput.value.trim() === "") {
      showErrorModal("Title and body cannot be blank.");
      return;
    } else if (titleInput.value.trim() === "") {
      showErrorModal("Title cannot be blank.");
      return;
    } else if (contentInput.value.trim() === "") {
      showErrorModal("Body cannot be blank.");
      return;
    }

    const publishDate = new Date();
    post.title = titleInput.value;
    post.tag = capitalizeFLetter(tagSelect.value);
    post.date = formatDate(publishDate) + " - " + formatTime(publishDate.getHours(), publishDate.getMinutes());
    post.body = contentInput.value;

    title.css('word-break', 'break-all');
    body.css('word-break', 'break-all');
    post.edited = true;
    
    editModal.hide();
    updatePost()
  })
});

reply.addEventListener("click", handleReplyClick);

function handleReplyClick() {
  var modal = document.getElementById('replyModal');

  modalTitle.textContent = "New Reply";
  replyQuill.root.innerHTML = ""; // Clear the contents of the reply editor
  replyQuill.on('text-change', updateTextarea);

  var replyModal = new bootstrap.Modal(modal);
  replyModal.show();
}

function showErrorModalComment(errorMessage) {
  const errorModalComment = new bootstrap.Modal(document.getElementById("commentErrorModal"));
  const errorMessageElement = document.getElementById("comment-error-message");
  errorMessageElement.textContent = errorMessage;
  errorModalComment.show();
}

newReply.addEventListener('click', function handleNewReplyClick() {

  if (replyQuill.getText().trim() === "") {
    showErrorModalComment("Comment cannot be blank.");
    return;
  }


  const replyDate = new Date();

  var username = post.user;
  var commentText = replyQuill.root.innerHTML; // Get the content from the replyQuill editor
  var formattedDate = formatCommentDate(replyDate);
  // var formattedTime = formatTime(publishDate.getHours(), publishDate.getMinutes());

  // Create a new comment element
  var newComment = document.createElement("div");
  newComment.classList.add("up2");
  newComment.innerHTML = `
    <div>
      <a href="profile-loggedin.html">
        <img src="../images/icon.jpg" class="icon2">
      </a>
    </div>
    <div class="ucomment">
      <a href="profile-loggedin.html" class="cusername">${username}</a>
      <span class="date">${formattedDate}</span>
      <span class="truncate-text justify">${commentText}</span>
    </div>
  `;

  var seeMore = document.createElement("div");
  seeMore.classList.add("down2");
  seeMore.innerHTML = `
    <div>
      <a href="comment2.html"><span class="reply2">See more</span></a>
    </div>
  `;

  var commentsSection = document.getElementById("comments-section");
  commentsSection.appendChild(newComment);
  commentsSection.appendChild(seeMore);

  // Clear the contents of the reply editor
  replyQuill.root.innerHTML = "";

  // Close the reply modal
  var replyModal = bootstrap.Modal.getInstance(document.getElementById("replyModal"));
  replyModal.hide();
});

