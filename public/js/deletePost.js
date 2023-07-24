function extractNumberFromURL(url) {
    const regex = /\/posts\/(\d+)\//; // Regular expression to match the number between "/posts/" and "/"
    const match = url.match(regex);
    if (match && match[1]) {
      return match[1];
    } else {
      return null; // Return null if the number is not found or if the URL format is incorrect
    }
  }

function getLastPathSegment(url) {
    const parsedUrl = new URL(url);
    const pathname = parsedUrl.pathname;
    const pathSegments = pathname.split('/');
    return pathSegments[pathSegments.length - 1];
  }

function capitalizeFLetter(tag) {
    return tag[0].toUpperCase() + tag.slice(1);
  }

window.addEventListener("load", function() {

    const del = document.getElementById("delete");

    const url = new URL(window.location.href);
    const urlParts = url.pathname.split('/');
    const postId = urlParts[urlParts.length - 1];   

    del.addEventListener("click", async e => {
        e.preventDefault();

        try {
            const response = await fetch(`/posts/${postId}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.status === 200) {
                window.location.reload();
            } else {
                console.log("nay");
            }
        } catch (err) {
            console.error(err);
        }
    })

});