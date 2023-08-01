window.addEventListener('load', function (e) {
  //listener for opening form
  submit = document.getElementById("submit-btn")

  submit.addEventListener("click", async e => {
    
    e.preventDefault();

    let currUser = document.querySelector(".usernow");
    let user = Number(currUser.id.replace('now', ''))

    const ibio = document.getElementById("newBio").value;
    console.log(ibio)

    myObj = {
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
})
