// class Post {
// 	constructor(title, id, user, tag, date, body, voteCount, commentCount, listOfComments, edited) {
// 	  this.title = title
// 	  this.id = id
// 	  this.user = user
// 	  this.tag = tag
// 	  this.date = date
// 	  this.body = body
// 	  this.voteCount = voteCount
// 	  this.commentCount = commentCount
// 	  this.listOfComments = listOfComments
// 	  this.edited = edited
// 	}
//   }
  
// class Comment {
// 	constructor(user, date, body) {
// 		this.user = user
// 		this.date = date
// 		this.body = body
// 		this.listOfComments = []
// 	}
// }

// // Constructor for a user class
// class User{
// 	constructor(user, image) {
// 		this.user = user;
// 		this.image = image;
// 	}
// }

// Local storage for posts/users
let posts = [];
let users = [];
let postCtr = 5;
let userCtr = 5;

// Boolean to determine post/user search
let searchPosts = true;

// const uvote = document.getElementById("upvote");
// const dvote = document.getElementById("downvote");

// // Sample users
// const user1 = new User("Fishball_Lover39", "icon");

// const user2 = new User("NeonBalls.6", "icon6");

// const user3 = new User("radioheadLover00", "icon4");

// const user4 = new User("annoying_complainer", "icon3");

// const user5 = new User("xXdestroyerOfWorldsXx", "icon7");

// // Sample posts
// const post = new Post("Pandemic & Food", user1, "Meta", "June 11, 2023 - 11:05 PM", 
// "TESTING BRUH TESTING Filipinos love to eat. Consider that a fact! When the pandemic happened and everyone was forced to stay at home, suddenly everyone became a food blogger. From traditional adobo and sinigang to mouthwatering lechon and halo-halo, our cuisine is a treasure trove of flavors and culinary delights. Being confined to our homes gave us the perfect opportunity to explore our passion for cooking and share it with the world. In the virtual realm, social media platforms became flooded with beautifully plated dishes, step-by-step recipe tutorials, and heartfelt stories behind each creation. It was inspiring to witness the creativity and resourcefulness of our fellow Filipinos in the kitchen. People started sharing family recipes, secret ingredients, and even their own twists on classic dishes. Food blogging during the pandemic became more than just a hobby; it became a way to connect and support one another. The online food community flourished with like-minded individuals who were eager to exchange ideas, offer cooking tips, and support local food businesses. It created a sense of unity and camaraderie, even when we were physically apart. As we continue to navigate through these challenging times, let's not forget the joy that food brings us. Whether it's recreating nostalgic dishes from our childhood or discovering new flavors, let's celebrate the resilience of the Filipino spirit through our shared love for food. Together, we can turn our kitchens into creative sanctuaries and our food blogs into platforms of inspiration and connection. So, grab your aprons, sharpen your knives, and let's embark on this culinary journey together. What's your favorite Filipino dish that you've shared on your food blog? Any tips for aspiring food bloggers looking to make their mark in the digital foodie world? Let's keep the foodie revolution alive!",
// 999, 0);

// const post1 = new Post("Makati Pizza Places", user1, "Query", "March 25, 2003 - 9:45 AM",
// "Does anyone know of any good pizza places in the makati area? ive been to gino's and el rizzante but neither of them were very good lol. i would also prefer places that offer vegan pizza. thanks in advance.",
// 623, 0);

// const post2 = new Post("Tag your posts!", user2, "Announcements", "March 25, 2003 - 9:40 AM",
// "What's up, Omsiloggers! This is a friendly reminder to label your posts with the appropriate tag, as doable in the 'create post' interface. Posts without tags or are labeled with the wrong tag will be subject to removal.",
// 3400, 0);

// const post3 = new Post("Ate Letty's Mango Blast Review", user3, "Review", "March 25, 2003 - 9:47 AM",
// "If you're looking to beat the heat, Ate Letty's Mango Blast is the best!! It's right around BGC, and has the best Mango Graham Shakes topped with caramel sauce and whipped cream, and the best part: they're buy1take1 for 150 pesos! Solid!",
// 894, 0);

// const post4 = new Post("Declining State of this Forum", user4, "Meta", "March 25, 2003 - 9:50 AM",
// "What's with the amount of low effort posts and spam bots in the comments recently? Every third post I see when I scroll is so worthless, I don't know if anyone's still moderating the content that goes into this forum. Moderators, please step up and do better.",
// 105, 0);

// const post5 = new Post("What type of bean comes after 4?", user5, "Meme", "March 25, 2003 - 9:43 AM",
// "Edi Lima. haha",
// -4800, 0);


// Functions for upvote/downvote functionality (UPDATE WITH NEW ONES)
function changeComment(x) {
	x.classList.toggle("bi-chat-left-fill");
	x.classList.toggle("bi-chat-left"); 
  }
  
  //update upvote and downvote
  function changeUpvote(x) {
	let downID = x.id.replace("uvote", "dvote")
	let index = Number(x.id.replace("uvote", ""))
	let element = document.getElementById(downID)
  
	if(element.classList.contains("downvote-2")) {
	  element.classList.toggle("downvote-2")
	  element.classList.toggle("downvote")
	  posts[posts.length-index].voteCount = posts[posts.length-index].voteCount + 1
	}
	if(x.classList.contains("upvote-2")) {
	  x.classList.toggle("upvote-2");
	  x.classList.toggle("upvote");
	  posts[posts.length-index].voteCount = posts[posts.length-index].voteCount - 1
	} else {
	  x.classList.toggle("upvote-2");
	  x.classList.toggle("upvote");
	  posts[posts.length-index].voteCount = posts[posts.length-index].voteCount + 1
	}
	console.log(posts[posts.length-index])
	updateCount(index)
  }
  
  function changeDownvote(x) {
	let upID = x.id.replace("dvote", "uvote")
	let index = Number(x.id.replace("dvote", ""))
	let element = document.getElementById(upID)
  
	if(element.classList.contains("upvote-2")) {
	  element.classList.toggle("upvote-2")
	  element.classList.toggle("upvote")
	  posts[posts.length-index].voteCount = posts[posts.length-index].voteCount - 1
	}
	if(x.classList.contains("downvote-2")) {
	  x.classList.toggle("downvote");
	  x.classList.toggle("downvote-2");
	  posts[posts.length-index].voteCount = posts[posts.length-index].voteCount + 1
	} else {
	  x.classList.toggle("downvote");
	  x.classList.toggle("downvote-2");
	  posts[posts.length-index].voteCount = posts[posts.length-index].voteCount - 1
	}
  
	updateCount(index)
  }
  
  function updateCount(index) {
	element = document.getElementById("votecount" + index)
	
	if (posts[posts.length-index].voteCount >= 1000) {
	  let mod = posts[posts.length-index].voteCount % 100
	  if (mod === 0) {
		element.innerHTML= (posts[posts.length-index].voteCount / 1000) + "K";
	  } else {
		element.innerHTML= ((posts[posts.length-index].voteCount - mod) / 1000) + "K";
	  }
	} else {
	  element.innerHTML= posts[posts.length-index].voteCount;
	}
  }

  //for initializing popovers
  const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
  const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))

  //to make popovers dismiss on click
  const popover = new bootstrap.Popover('.popover-dismiss', {
	  trigger: 'focus'
  })

// Add dummy posts and users to array
// posts.push(post);
// posts.push(post1);
// posts.push(post2);
// posts.push(post3);
// posts.push(post4);
// posts.push(post5);

// users.push(user1);
// users.push(user2);
// users.push(user3);
// users.push(user4);
// users.push(user5);

// refreshDisplay(posts, 0);

// // Filter posts only
// document.querySelector(".btn-search-posts").addEventListener("click", function(e) {
// 	refreshDisplay(posts, 0);
// });

// // Filter users only
// document.querySelector(".btn-search-users").addEventListener("click", function(e) {
// 	refreshDisplay(users, 1);
// });

// document.querySelector(".btn-most-votes").addEventListener("click", function(e) {
// 	sortByHighest();
// });

// document.querySelector(".btn-least-votes").addEventListener("click", function(e) {
// 	sortByLowest();
// });

// document.querySelector(".btn-recent").addEventListener("click", function(e) {
// 	sortByRecent();
// });

// document.querySelector(".btn-oldest").addEventListener("click", function(e) {
// 	sortByOldest();
// });

// document.querySelector(".btn-ann").addEventListener("click", function(e) {
// 	filterTag("Announcements");
// });

// document.querySelector(".btn-rev").addEventListener("click", function(e) {
// 	filterTag("Review");
// });

// document.querySelector(".btn-mem").addEventListener("click", function(e) {
// 	filterTag("Meme");
// });

// document.querySelector(".btn-que").addEventListener("click", function(e) {
// 	filterTag("Query");
// });

// document.querySelector(".btn-met").addEventListener("click", function(e) {
// 	filterTag("Meta");
// });

// // Adds a post to HTML
// function addPost(newPost) {
// 	let user = newPost.user;
// 	let tagName;

// 	switch(newPost.tag) {
// 		case "Announcements":
// 		  tagName = "bi-megaphone-fill";
// 		  break;
// 		case "Review":
// 		  tagName = "bi-check-circle-fill";
// 		  break;
// 		case "Query":
// 		  tagName = "bi-question-circle-fill";
// 		  break;
// 		case "Meme":
// 		  tagName = "bi-emoji-laughing-fill";
// 		  break;
// 		case "Meta":
// 		  tagName = "bi-lightbulb-fill";
// 		  break;
// 	  }

// 	const post = "<div class='post'>" +
// 					"<div class='post-info-container'>" +
// 						"<a class='icon-container'>" +
// 							"<img class='user-icon' src='../images/" + user.image + ".jpg'>" + // Change icon to match per user
// 						"</a>" +
// 						"<div class='post-info'>" +
// 							"<a href= ' " + "" + " '>" + // Change link to match per post
// 								"<div class='post-title'>" + newPost.title + "</div>" +
// 							"</a>" +
// 							"<div class='post-tags-container'>" +
// 								"<div class='post-tag query-tag'>" +
// 									"<a href='search-loggedin.html'>" + // Change href (leads to search)
// 										"<i class='" + tagName + "'></i>" + // Change tag icon 
// 										"<span>" + newPost.tag + "</span>" +
// 									"</a>" +
// 								"</div>" +
// 							"</div>" +
// 							"<div class='post-details'>" +
// 								"<div class='details-icon'></div>" +
// 								"<i class='bi bi-pen-fill'></i>" +
// 								"<a href='profile1-logged.html'>" + // Change href (leads to profile)
// 									"<div class='username'>" + user.user + "</div>" +
// 								"</a>" +
// 								"<div class='post-date'>&nbsp;created " + newPost.date + "</div>" +
// 							"</div>" +
// 							"<div class='post-description'>" +
// 								newPost.body +
// 							"</div>" +
// 						"</div>" +
// 						"<div class='interactions'>" +
// 							"<div class='upvote' onclick='changeUpvote(this)'></div>" +
// 							"<div class='vote-count'>" + newPost.count + "</div>" +
// 							"<div class='downvote' onclick='changeDownvote(this)'></div>" +
// 							"<div class='spacer'></div>" +
// 							"<a href='post5-loggedin.html' style='text-align: center;'>" +
// 								"<i onmouseenter='changeComment(this)' onmouseleave='changeComment(this)' class='bi bi-chat-left comment-icon'></i>" +
// 							"</a>" +
// 							"<div class='comment-count'>" + newPost.comments + "</div>" +
// 						"</div>" +
// 					"</div>" +
// 				"</div>";

// 	document.querySelector(".thread-container").innerHTML += post;
// }

// // Adds a new user to HTML 
// function addUser(newUser) {
// 	const user = "<div class='user'>" +
// 					"<div class='user-info-container'>" +
// 						"<a class='icon-container' href='profile1-logged.html'>" + // Change href to profile link
// 							"<img class='user-icon' src='../images/" + newUser.image + ".jpg' alt=''>" +
// 						"</a>" +

// 						"<a class='username-container' href='profile1-logged.html'>" + // Change href to profile link
// 							"<h5>u/" + newUser.user + "</h5>" +
// 						"</a>" +
// 					"</div>" +
// 				"</div>";

// 	document.querySelector(".thread-container").innerHTML += user;
// }

// function sortByHighest() {
// 	let sortedPosts = [];
// 	sortedPosts = posts.sort((a, b) => (a.count < b.count) ? 1 : -1)
// 	refreshDisplay(sortedPosts, 0);
// }

// function sortByLowest() {
// 	let sortedPosts = [];
// 	sortedPosts = posts.sort((a, b) => (a.count > b.count) ? 1 : -1)
// 	refreshDisplay(sortedPosts, 0);
// }

// // Sorts posts by most recent posting date
// function sortByRecent() {
// 	let sortedPosts = [];
// 	sortedPosts = posts.sort((a, b) => (a.date < b.date) ? 1 : -1)
// 	refreshDisplay(sortedPosts, 0);
// }

// // Sorts posts by oldest posting date
// function sortByOldest() {
// 	let sortedPosts = [];
// 	sortedPosts = posts.sort((a, b) => (a.date > b.date) ? 1 : -1)
// 	refreshDisplay(sortedPosts, 0);
// }

// function filterTag(filterValue) {
// 	let post, tag;
// 	let filteredPosts = [];
// 	for (j = 0; j < posts.length; j++) {
// 		post = posts[j];
// 		tag = post.tag;
// 		if (tag === filterValue) {
// 			filteredPosts.push(post);
// 		}
// 	}

// 	refreshDisplay(filteredPosts, 0);
// }

// // Helper function to clear the thread container
// function clearThreads() {
// 	document.querySelector(".thread-container").innerText = "";
// }

// // Helper function to be called when the number of posts/users displayed is 0
// function displayEmptyPosts() {
// 	clearThreads();
// 	document.querySelector(".thread-container").innerHTML += "<p class='filler-text'>▓▒░(°◡°)░▒▓<br>Wow such empty...</p>";
// }

// // Displays all posts/users in an array
// function displayPosts(newPosts) {
// 	clearThreads();
// 	for (i = 0; i < newPosts.length; i++) {
// 		addPost(newPosts[i]);
// 	}
// }

// function displayUsers(newPosts) {
// 	clearThreads();
// 	for (i = 0; i < newPosts.length; i++) {
// 		addUser(newPosts[i]);
// 	}
// }

// // Updates display, shows empty page when no results available
// function refreshDisplay(displayedPosts, bool) {
// 	if (displayedPosts.length === 0) {
// 		displayEmptyPosts();
// 	}

// 	else {
// 		if (bool === 0) {
// 			displayPosts(displayedPosts);
// 		}

// 		else {
// 			displayUsers(displayedPosts);
// 		}
// 	}
// }