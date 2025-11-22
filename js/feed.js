// 1️⃣ Session + Welcome
const welcome = document.getElementById("Welcome");
const user = JSON.parse(localStorage.getItem("user"));
if (!user) window.location.href = "../pages/signup.html";
else welcome.innerHTML = `WELCOME <span>${user.name}</span>`;

// 2️⃣ Logout
document.getElementById("log_out").addEventListener("click", () => {
  localStorage.removeItem("user");
  window.location.href = "../pages/signup.html";
});

// 3️⃣ Variables
let originalPosts = [];
let filteredPosts = [];

// 4️⃣ Load Posts + Events
document.addEventListener("DOMContentLoaded", () => {
  originalPosts = JSON.parse(localStorage.getItem("posts")) || [];
  filteredPosts = [...originalPosts];
  renderPosts(filteredPosts);

  document.getElementById("sortSelect").addEventListener("change", applyFilters);
  document.getElementById("searchInput").addEventListener("input", applyFilters);
});

// 5️⃣ Render Posts
function renderPosts(posts) {
  const container = document.getElementById("postsContainer");
  container.innerHTML = "";

  if (posts.length === 0) {
    container.innerHTML = "<h3>No post found</h3>";
    return;
  }

  posts.forEach((post) => {
    const liked = post.likedByCurrentUser ? "❤️" : "🤍";

    container.innerHTML += `
      <div class="postCard">
        <h3>${post.title}</h3>
        <img src="${post.image}" alt="" />
        <p>Posted by <b>${post.author}</b> at <em>${post.time}</em></p>

        <div>
          <span onclick="toggleLike(${post.id})" style="cursor:pointer;">${liked}</span>
          ${post.likes} Likes
          <button onclick="editPost(${post.id})">Edit</button>
          <button onclick="deletePost(${post.id})">Delete</button>
        </div>
      </div>
    `;
  });
}

// 6️⃣ Like
function toggleLike(id) {
  let posts = JSON.parse(localStorage.getItem("posts")) || [];
  const post = posts.find((p) => p.id === id);

  if (post.likedByCurrentUser) {
    post.likedByCurrentUser = false;
    post.likes--;
  } else {
    post.likedByCurrentUser = true;
    post.likes++;
  }

  localStorage.setItem("posts", JSON.stringify(posts));
  originalPosts = posts;
  applyFilters();
}

// 7️⃣ Delete
function deletePost(id) {
  let posts = JSON.parse(localStorage.getItem("posts")) || [];
  posts = posts.filter((p) => p.id !== id);
  localStorage.setItem("posts", JSON.stringify(posts));
  originalPosts = posts;
  applyFilters();
}

// 8️⃣ Edit
function editPost(id) {
  let posts = JSON.parse(localStorage.getItem("posts")) || [];
  const p = posts.find((p) => p.id === id);
  if (!p) return;

  const newTitle = prompt("Edit Title:", p.title);
  const newImage = prompt("Edit Image URL:", p.image);

  if (newTitle) p.title = newTitle;
  if (newImage) p.image = newImage;

  localStorage.setItem("posts", JSON.stringify(posts));
  originalPosts = posts;
  applyFilters();
}

// 9️⃣ 🔥 Search + Sort Filter
function applyFilters() {
  let result = [...originalPosts];

  // Search
  const query = document.getElementById("searchInput").value.toLowerCase();
  if (query) {
    result = result.filter(
      (p) =>
        p.title.toLowerCase().includes(query) ||
        p.author.toLowerCase().includes(query)
    );
  }

  // Sort
  const sortValue = document.getElementById("sortSelect").value;
  if (sortValue === "latest") result.sort((a, b) => b.createdAt - a.createdAt);
  if (sortValue === "oldest") result.sort((a, b) => a.createdAt - b.createdAt);
  if (sortValue === "mostLiked") result.sort((a, b) => b.likes - a.likes);

  filteredPosts = result;
  renderPosts(result);
}
