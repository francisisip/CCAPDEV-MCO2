window.addEventListener('DOMContentLoaded', (event) => {
  //profile info
  var firstName = document.getElementById('fName').textContent;
  var lastName = document.getElementById('lName').textContent;
  var email = document.getElementById('eMail').textContent;
  var bio = document.getElementById('bio').innerText; 

  //update form default vals
  document.getElementById('firstName').value = firstName;
  document.getElementById('lastName').value = lastName;
  document.getElementById('email').value = email;
  document.getElementById('confirmEmail').value = email;
  document.getElementById('edit-bio').value = bio;

  // Add event listeners to the form fields
  document.getElementById('firstName').addEventListener('input', updateProfileTab);
  document.getElementById('lastName').addEventListener('input', updateProfileTab);
  document.getElementById('email').addEventListener('input', updateProfileTab);
  document.getElementById('edit-bio').addEventListener('input', updateProfileTab);

  //listener for opening form
  const editProfileLink = document.querySelector('a[href="#edit-info"]');
  editProfileLink.addEventListener('click', openForm);

  submit = document.getElementById("submit-btn")

  submit.addEventListener("click", e => {
    e.preventDefault()

    let currUser = document.querySelector(".usernow")
    console.log(currUser)
    let user = Number(currUser.id.replace('now', ''))

    const ibio = document.getElementById("bio").value
    console.log(ibio)
    console.log(user)
    try {
      this.fetch('/users/' + user + '/edit', {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          bio: ibio
        })
      })
    }
    catch(err) {
      console.log(err)
    }
    window.location.href = "/users/" + user;

  })

});

function cancelForm();{

}



function submitEditProfile() {
    let currUser = document.querySelector(".usernow")
    console.log(currUser)
    let user = Number(currUser.id.replace('now', ''))

    const bio = document.getElementById("bio")

    if(user) {
      const nfirstName = document.getElementById('firstName').value;
      const nlastName = document.getElementById('lastName').value;
      //const nemail = document.getElementById('email').value;
      const nbio = document.getElementById('edit-bio').value;
      const npfp = document.getElementById('pfpupload').value;


      currUser.firstName = nfirstName;
      currUser.lastName = nlastName;
      //currUser.email = nemail;
      currUser.bio = nbio; 

      this.fetch('/users/' + user + 'edit',
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          firstName: nfirstName,
          lastName: nlastName,
          //email: nemail;
          bio: nbio,
          pfp: npfp, 
        })
      })
      .then((res) => res.json())
      .then((json) => console.log(json))
      res.redirect('/:userID');
  }  
}



/* function submitEditProfile();{
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
}*/ 
/*
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
}*/

