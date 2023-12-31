window.addEventListener("load", function(e){
    let createButton = document.getElementById("create-post-button")
    let createModal = new bootstrap.Modal(document.getElementById("createPostModal"))

    let publish = document.getElementById("publish-button")

    let currUser = document.querySelector(".usernow")
    let user = Number(currUser.id.replace('now', ''))

    createButton.addEventListener("click", e=> {

        if(user){
            createModal.show() 
        }
        else{
            showErrorModal("You must login to do that!")
        }
    })


    publish.addEventListener("click", async e =>{
        e.preventDefault()

        let modal = bootstrap.Modal.getInstance(document.getElementById("createPostModal"))

        let title = this.document.querySelector('#create-post-title')
        let tag = this.document.querySelector('#tag')
        let body = this.document.querySelector('#content-input')

        let currUser = document.querySelector(".usernow")
        console.log(currUser)
        let user = Number(currUser.id.replace('now', ''))

        if(title.value.trim() === "" && body.value.trim() === ""){
            showErrorModal("Title and Body of the post can not be blank.")
            return
        } else if(tag.value === ""){
            showErrorModal("Posts must have a specified tag.")
            return
        }

        let htmlContent = body.value
        let tempElement = document.createElement('div');
        tempElement.innerHTML = htmlContent;
        let textContent = tempElement.textContent || tempElement.innerText
        
        let mark = document.querySelector(".thread-container")
        let num = Number(mark.id.replace('mark', ''))

        num++
        console.log(num)

        this.fetch("/posts", 
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                postID: num,
                userID: user,
                title: title.value,
                desc: textContent,
                body: body.value,
                tag: tag.value
            })
        }).then(res => {
            if(res.status >= 400){
                showErrorModal("Invalid title or content")
                return
            }
            else if(res.status == 200) {
                modal.hide()
                this.window.location.href = window.location.origin + "/home"
            }
        })
    })

    function showErrorModal(errorMessage) {
        const errorModal = new bootstrap.Modal(document.getElementById("errorModal"));
        const errorMessageElement = document.getElementById("error-message");
        errorMessageElement.textContent = errorMessage;
        errorModal.show();
    }
})