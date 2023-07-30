const searchButton = document.getElementById("search-icon-btn")
const searchBox = document.getElementById("search-box")

searchButton.addEventListener("click", async e =>{
    e.preventDefault()
    
    const input = searchBox.value.trim();
    console.log(input);

    const searchURL = `/search?search=${encodeURIComponent(input)}`;
    window.location.href = searchURL;
})
