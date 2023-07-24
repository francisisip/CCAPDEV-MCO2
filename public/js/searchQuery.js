window.addEventListener("load", function(e){
    let searchButton = document.getElementById("search-icon-container")
    let searchInput = this.document.querySelector('#search-box')

    searchButton.addEventListener("click", async e =>{
        e.preventDefault()
        
        let query = searchInput.value;

        const response = await fetch(`/search?search=${searchValue}`, {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json'
            }
        });

        // Handle the response from the back-end (e.g., update the UI with search results)
        const searchData = await response.json();
        // Implement the UI update based on the search results (e.g., display search results)
    })
})