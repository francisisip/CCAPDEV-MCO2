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

function extractNumberFromURL(url) {
    const regex = /\/posts\/(\d+)\//; // Regular expression to match the number between "/posts/" and "/"
    const match = url.match(regex);
    if (match && match[1]) {
      return match[1];
    } else {
      return null; // Return null if the number is not found or if the URL format is incorrect
    }
  }

  function extractPostIdFromURL(url) {
    const pathnameParts = url.pathname.split('/'); // Split the URL pathname using '/'
    const postIdIndex = pathnameParts.indexOf('posts') + 1; // Find the index of 'posts' and add 1 to get the postId index
  
  if (postIdIndex !== 0 && postIdIndex < pathnameParts.length) {
    return pathnameParts[postIdIndex]; // Return the postId value
  } else {
    return null; // Return null if postId is not found in the URL
  }
}
  

function getLastPathSegment(url) {
    const parsedUrl = new URL(url);
    const pathname = parsedUrl.pathname;
    const pathSegments = pathname.split('/');
    return pathSegments[pathSegments.length - 1];
  }

function capitalizeFLetter(tag) {
    return tag[0].toUpperCase() + tag.slice(1);
  }

window.addEventListener("load", function(e) {

    const body = document.getElementById('body')
    const contentInput = document.getElementById('content-input');
    const edit = document.getElementById("edit");
    const modalTitle = document.getElementById("staticBackdropLabel");
    let editModal = new bootstrap.Modal(document.getElementById("editModal"));
    const publish = document.getElementById("publish-button");
    edit.addEventListener("click", e => {
      e.preventDefault();

      modalTitle.textContent = "Edit Post";
      quill.root.innerHTML = body.textContent; // Set the Quill editor's content directly
      quill.on('text-change', updateTextarea);

      editModal.show();

    })

    function showErrorModal(errorMessage) {
        const errorModal = new bootstrap.Modal(document.getElementById("errorModal"));
        const errorMessageElement = document.getElementById("error-message");
        errorMessageElement.textContent = errorMessage;
        errorModal.show();
    }

    publish.addEventListener('click', async function handlePublishClick(e) {
        e.preventDefault();

        if (contentInput.value.trim() === "") {
            showErrorModal("Body cannot be blank.");
            return;
        }

        const url = new URL(window.location.href);
        const url2 = window.location.pathname;
        const commentID = getLastPathSegment(url);
        const postID = extractNumberFromURL(url2);
        console.log(postID);
        console.log(commentID);
        const myObj = {
            id: commentID,
            body: contentInput.value
        }

        const jString = JSON.stringify(myObj);

        try {
            const response = await fetch(`/posts/${postID}/${commentID}`, {
                method: "PUT",
                body: jString,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log(response.status)
            if (response.status === 200) {
                editModal.hide()
                window.location.reload();
            } else {
                console.log("nay");
            }
        } catch (err) {
            console.error(err);
        }
    })

    const reply = document.getElementById("reply");
    const replyModalTitle = document.getElementById("staticBackdropLabel-reply");
    let replyModal = new bootstrap.Modal(document.getElementById("replyModal"));
    const replyPublish = document.getElementById("publish-button-reply");
  
    reply.addEventListener("click", e => {
      let mark = document.querySelector(".curruser")
      const user = Number(mark.id.replace('mhm', ''))
      
      if (user) {
        e.preventDefault();
        replyModalTitle.textContent = "New Reply";
        quill.root.innerHTML = ''; // Set the Quill editor's content directly
        replyModal.show();

      } else {
          showErrorModal("You must login to do that!")
      }
    });
  
    function showErrorModalComment(errorMessage) {
          const errorModalComment = new bootstrap.Modal(document.getElementById("commentErrorModal"));
          const errorMessageElement = document.getElementById("comment-error-message");
          errorMessageElement.textContent = errorMessage;
          errorModalComment.show();
    }
  
    replyPublish.addEventListener('click', async function handlePublishClick(e) {
        e.preventDefault();
  

        const replyContent = replyQuill.getText().trim(); // Get the content from Quill

          if (replyContent === "") {
            showErrorModalComment("Comment cannot be blank.");
            return;
        }
  
          const url = new URL(window.location.href);
          const postId = extractPostIdFromURL(url);
  
          let mark = document.querySelector(".curruser")
          let num = Number(mark.id.replace('mhm', ''))

          const userId = num;
          const body = replyContent;

          
          const commentId = getLastPathSegment(url);
          const myObj = {
              postId: postId,
              userId: userId,
              body: body,
          }
          const jString = JSON.stringify(myObj);
          
          try {
              const response = await fetch(`/posts/${postId}/${commentId}`, {
                  method: "POST",
                  body: jString,
                  headers: {
                      'Content-Type': 'application/json'
                  }
              });
              console.log(response.status)

              if (response.status === 200) {
                  replyModal.hide()
                  window.location.reload();
              } else {
                  console.log("nay");
              }
          } catch (err) {
              console.error(err);
          }
      })
});