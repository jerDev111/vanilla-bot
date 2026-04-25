const chat = document.getElementById("chat");
const input = document.getElementById("msg");
const chatContainer = document.getElementById("chatContainer");
const searchBox = document.getElementById("searchBox");
const categoryFilter = document.getElementById("categoryFilter");
const sortFilter = document.getElementById("sortFilter");

const productContainer = document.querySelector("#products .row");

searchBox.addEventListener("keyup", function () {
  let input = searchBox.value.toLowerCase();
  let products = document.getElementsByClassName("product-item");

  for (let i = 0; i < products.length; i++) {
    let text = products[i].innerText.toLowerCase();

    if (text.includes(input)) {
      products[i].style.display = "";
    } else {
      products[i].style.display = "none";
    }
  }
});


// MAIN UPDATE FUNCTION
function updateProducts() {
  let searchText = searchBox.value.toLowerCase();
  let category = categoryFilter.value;
  let sortValue = sortFilter.value;

  let products = Array.from(document.getElementsByClassName("product-item"));

  // FILTER
  let filtered = products.filter(product => {
    let text = product.innerText.toLowerCase();
    let productCategory = product.dataset.category;

    return (
      text.includes(searchText) &&
      (category === "all" || category === productCategory)
    );
  });

  // SORT
  if (sortValue === "low") {
    filtered.sort((a, b) => a.dataset.price - b.dataset.price);
  } else if (sortValue === "high") {
    filtered.sort((a, b) => b.dataset.price - a.dataset.price);
  }

  // RENDER
  productContainer.innerHTML = "";
  filtered.forEach(product => productContainer.appendChild(product));
}

// EVENTS (ONLY THESE)
searchBox.addEventListener("keyup", updateProducts);
categoryFilter.addEventListener("change", updateProducts);
sortFilter.addEventListener("change", updateProducts);

function toggleChat() {
  chatContainer.classList.toggle("show");
}

function addMessage(text, type) {
  const div = document.createElement("div");
  div.className = type === "user" ? "user-msg" : "bot-msg";
  div.innerHTML = text;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

function sendMessage() {
  const message = input.value.toLowerCase();
  if (!message) return;

  addMessage(input.value, "user");
  input.value = "";
  respond(message);
}

function sendQuick(type) {
  addMessage(type, "user");
  respond(type);
}

function respond(message) {
  if (message.includes("product")) {
    addMessage(
      "🛍 <b>Our Products</b><br>" +
      "• Dog Collar – Nylon & leather – $15<br>" +
      "• Pet Bowl – Stainless steel – $10<br>" +
      "• Pet Toy – Non-toxic rubber – $8",
      "bot"
    );

  } else if (message.includes("price")) {
    addMessage(
      "💰 <b>Price List</b><br>" +
      "Dog Collar: $15<br>Pet Bowl: $10<br>Pet Toy: $8",
      "bot"
    );

  } else if (message.includes("material")) {
    addMessage(
      "📦 <b>Materials Used</b><br>" +
      "• Durable nylon & leather<br>" +
      "• BPA-free plastic<br>" +
      "• Safe non-toxic rubber",
      "bot"
    );

  } else if (message.includes("contact")) {
    addMessage(
      "📞 <b>Contact Us</b><br>" +
      "Instagram DM<br>📧 milkapetshop@email.com",
      "bot"
    );

  } else {
    addMessage(
      "🐶 Ask me about products, prices, materials, or contact info!",
      "bot"
    );

    
  }
}
