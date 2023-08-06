const logout = document.getElementById("logout-button")
const searchBtn = document.getElementById("search-icon-btn-nav")
const searchInput = document.getElementById("search-box-nav")

searchBtn.addEventListener("click", async e => {
    const input = searchInput.value.trim();
    console.log(input);

    const searchURL = `/search?search=${encodeURIComponent(input)}`;
    window.location.href = searchURL;
})

logout.addEventListener("click", async e => {
    e.preventDefault()

    try {
        const response = await fetch('/auth/logout', {
            method: 'POST'
        })

        console.log("in here")
        if(response.status === 200){
            window.location.href = "/";
        }
    }
    catch(err) {
        console.log(err)
    }

})