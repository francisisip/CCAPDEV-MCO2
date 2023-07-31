function changeUpvote(x) {
    let mark = document.querySelector(".curruser")
    const user = Number(mark.id.replace('mhm', ''))


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
    let mark = document.querySelector(".curruser")
    const user = Number(mark.id.replace('mhm', ''))

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