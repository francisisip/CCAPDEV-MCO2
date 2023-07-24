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
    const titleInput = document.getElementById('create-post-title');
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
});