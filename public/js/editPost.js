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

window.addEventListener("load", function(e) {
    const title = document.getElementById('title');
    const tag = document.getElementById('tagName')
    const body = document.getElementById('body')

    const edit = document.getElementById("edit");
    const modalTitle = document.getElementById("staticBackdropLabel");

    const publish = document.getElementById("publish-button");

    edit.addEventListener("click", e => {
        var titleInput = document.getElementById('create-post-title');
        var tagSelect = document.getElementById('tag');
        var contentInput = document.getElementById('content-input');

        modalTitle.textContent = "Edit Post";
        titleInput.value = title.textContent;
        tagSelect.value = tag.textContent.toLowerCase();
        quill.root.innerHTML = body.textContent; // Set the Quill editor's content directly
        quill.on('text-change', updateTextarea);

        let editModal = new bootstrap.Modal(document.getElementById("editModal"));
        editModal.show();
    })
})