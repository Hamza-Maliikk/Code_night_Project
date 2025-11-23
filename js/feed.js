// 1️⃣ Session + Welcome
const welcome = document.getElementById("Welcome");
const user = JSON.parse(localStorage.getItem("user"));
if (!user) window.location.href = "../pages/signup.html";
else welcome.innerHTML = `Welcome <br> 
<span class="inline-block mt-4 leading-[3rem] bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text md:text-[40px]">${user.name}</span>`;
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
    <div class="p-5 rounded-2xl bg-gray-800 border border-gray-700 shadow-[0_0_20px_rgba(109,40,217,0.15)] hover:shadow-[0_0_35px_rgba(139,92,246,0.4)] transition-all duration-300 hover:-translate-y-1">

      <h3 class="text-xl font-semibold text-white mb-3">${post.title}</h3>

      ${post.image 
        ? `<img src="${post.image}" class="w-full rounded-xl mb-3 shadow-md" />`
        : ''}

      <p class="text-gray-400 mb-4">
        Posted by <b class="text-purple-400">${post.author}</b> • 
        <em class="text-gray-500">${post.time}</em>
      </p>

      <div class="flex items-center justify-between mt-3">

        <div class="flex items-center gap-3">
          <span onclick="toggleLike(${post.id})" 
                class="cursor-pointer text-2xl hover:scale-110 transition">
              ${liked}
          </span>
          <span class="text-gray-300">${post.likes} Likes</span>
        </div>

        <div class="flex items-center gap-2">
          <button onclick="editPost(${post.id})"
            class="px-4 py-2 rounded-lg text-sm bg-purple-600 hover:bg-purple-700 transition">
            Edit
          </button>

          <button onclick="deletePost(${post.id})"
            class="px-4 py-2 rounded-lg text-sm bg-red-600 hover:bg-red-700 transition">
            Delete
          </button>
        </div>

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
const getDateValue = (val) => {
  return typeof val === "string" ? new Date(val).getTime() : val;
};

const sortValue = document.getElementById("sortSelect").value;

if (sortValue === "latest") {
  result.sort((a, b) => getDateValue(b.createdAt) - getDateValue(a.createdAt));
}

if (sortValue === "oldest") {
  result.sort((a, b) => getDateValue(a.createdAt) - getDateValue(b.createdAt));
}
filteredPosts = result;
renderPosts(result);
};
