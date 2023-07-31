//quill library for rich text-editor
var quill = new Quill('#content', {
    theme: 'snow'
  });
  
  // Initialize Quill editor for the "reply-content" element

  // Update the hidden textarea with Quill's HTML content
function updateTextarea() {
    var contentInput = document.getElementById('content-input');
    var plainTextContent = quill.getText();
    contentInput.value = plainTextContent;
}

var replyQuill = new Quill('#reply-content', {
    theme: 'snow'
});

// Add event listener to update the hidden textarea when reply content is changed
replyQuill.on('text-change', updateTextarea);
  
  // Add event listener to update the textarea when content is changed
quill.on('text-change', updateTextarea);

function capitalizeFLetter(tag) {
    return tag[0].toUpperCase() + tag.slice(1);
}

window.addEventListener("load", function(e) {

    const x = $("#title")
    const y = $("#body");


    const title = document.getElementById('title');
    const tag = document.getElementById('tagName')
    const body = document.getElementById('body')
    const titleInput = document.getElementById('create-post-title');
    const tagSelect = document.getElementById('tag');
    const contentInput = document.getElementById('content-input');
    const edit = document.getElementById("edit");
    const modalTitle = document.getElementById("staticBackdropLabel");
    let editModal = new bootstrap.Modal(document.getElementById("editModal"));
    const publish = document.getElementById("publish-button");
    edit.addEventListener("click", e => {
        e.preventDefault();
        console.log("hello")

        modalTitle.textContent = "Edit Post";
        titleInput.value = title.textContent;
        tagSelect.value = tag.textContent.toLowerCase();
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

        const url = new URL(window.location.href);
        const urlParts = url.pathname.split('/');
        const postId = urlParts[urlParts.length - 1];   

        console.log(postId);
        const myObj = {
            id: postId,
            title: titleInput.value,
            tag: capitalizeFLetter(tagSelect.value),
            desc: contentInput.value,
            body: contentInput.value
        }

        const jString = JSON.stringify(myObj);

        try {
            const response = await fetch(window.location.href, {
                method: "PUT",
                body: jString,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.status === 200) {
                console.log("gell");
                x.css('word-break', 'break-all');
                y.css('word-break', 'break-all');
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
      }
      else {
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
          const urlParts = url.pathname.split('/');
          const postId = urlParts[urlParts.length - 1];   
  
          let mark = document.querySelector(".curruser")
          let num = Number(mark.id.replace('mhm', ''))
  
          let aye = document.querySelector(".numofcomments")
          let comments = Number(aye.id.replace('aye', ''))
          comments++
          const userId = num;
          const body = replyContent;
          const commentId = "post" + postId + "_" + comments;
          const myObj = {
              postId: postId,
              userId: userId,
              body: body
          }
          console.log(myObj.userId)
          const jString = JSON.stringify(myObj);
          
          try {
              const response = await fetch(`/posts/${postId}`, {
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