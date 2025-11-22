document.addEventListener("DOMContentLoaded", () => {

  const postForm = document.getElementById("postForm");

  postForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.getElementById("postName").value.trim();
    const image = document.getElementById("postImage").value.trim();

    if (!title || !image) {
      alert("Please fill all fields!");
      return;
    }

    // Get logged-in user session
    const session = JSON.parse(localStorage.getItem("user"));
    if (!session) {
      alert("You must be logged in to post!");
      window.location.href = "../pages/index.html";
      return;
    }

    // Get existing posts
    let posts = JSON.parse(localStorage.getItem("posts")) || [];

    // New post
const newPost = {
  id: Date.now(),
  title,
  image,
  author: session.name,
  likes: 0,
  likedByCurrentUser: false,
  time: new Date().toLocaleString(),
  createdAt: Date.now() // numeric timestamp for sorting
};



    // Add new post & save
    posts.push(newPost);
    localStorage.setItem("posts", JSON.stringify(posts));

    alert("Post created successfully!");
    window.location.href = "../pages/feed.html"; // redirect to feed
  });

});
