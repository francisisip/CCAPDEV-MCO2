const logout = document.getElementById("logout-button")

logout.addEventListener("click", async e => {
    e.preventDefault()

    try {
        const response = this.fetch('/logout', {
            method: 'POST'
        })

        console.log("in here")
        window.location.href = "/";
    }
    catch(err) {
        console.log(err)
    }

})