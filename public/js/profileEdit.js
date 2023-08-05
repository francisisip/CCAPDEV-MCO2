window.addEventListener('load', function (e) {
  //listener for opening form
  submit = document.getElementById("submit-btn")

  submit.addEventListener("click", async e => {
    
    e.preventDefault();

    let currUser = document.querySelector(".usernow");
    let user = Number(currUser.id.replace('now', ''))

    const ibio = document.getElementById("newBio").value;
    console.log(ibio)
    const ipfp = document.getElementById("icon-dropdown").value;
    const npfp = '/static/img/' + ipfp + '.jpg';
    console.log(npfp);
    myObj = {
      profileImg: npfp,
      bio: ibio
    }

    const jString = JSON.stringify(myObj);

    try {
      const response = await fetch('/users/' + user + '/edit', {
        method: "PUT",
        body: jString,
        headers: {
            'Content-Type': 'application/json'
        }
      });

      console.log(response.status);
      if (response.status === 200) {
          window.location.reload();
      } else {
          console.log("nay");
      }
    
    } catch (err) {
        console.error(err);
      }

    })

    
    const currPic =  document.getElementById("profileImage").src.split('/').pop().split('.').shift();

    const selectElement = document.getElementById("icon-dropdown");

    for (let i = 0; i < selectElement.options.length; i++) {
      const option = selectElement.options[i];
      if (option.value === currPic) {
        option.selected = true;
        break; 
      }
}

    const iconDropdown = document.getElementById('icon-dropdown');
    const selectedIcon = document.getElementById('selected-icon');

    iconDropdown.addEventListener('change', function() {
        const selectedValue = iconDropdown.value;
        
          selectedIcon.src = `/static/img/${selectedValue}.jpg`;

    });
})

