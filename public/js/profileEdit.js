

cancelForm();{

}
submitEditProfile();{
    try {
        let User = req.session.user;
        let newfName = User.firstName;
        let newlName = User.lastName;
        let newBio = req.body.descriptionEdit;
        let newprofileImg;
        if(req.file != null)
           newprofileImg = req.file.filename;
        
        const foundUser = await User.findOne({userID:User.userID});

        if(newfName != null)
            foundUser.fName = newfName;
        if(newlName != null)
            foundUser.lastName = newlName;
        if(newBio != null)
            foundUser.bio = newBio;
        if(newprofileImg != null)
            foundUser.profileImg  = 'uploads/profiles/' + upProfilePicture;
        await foundUser.save();
        req.session.user = foundUser;
        res.redirect('/:userID');
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).send('Failed to update user');
    }
}

<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>

function uploadPicture() {
const pfpInput = document.getElementById('pfpupload');
const file = pfpInput.files[0];

if (!file) {
  alert('Please select a picture to upload.');
  return;
}

const formData = new FormData();
formData.append('picture', file);

const url = 'http://localhost:3000/img/'; // Replace with your API endpoint

axios.put(url, formData, {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
})
.then(response => {
  console.log('Picture uploaded successfully:', response.data);
})
.catch(error => {
  console.error('Error uploading picture:', error);
});
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