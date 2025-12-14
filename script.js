const chat = document.getElementById("chat");
const input = document.getElementById("msg");

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
      "🐾 We sell pet accessories including:<br>" +
      "• Dog collars<br>" +
      "• Pet bowls<br>" +
      "• Pet toys",
      "bot"
    );

  } else if (message.includes("price")) {
    addMessage(
      "💰 Our prices:<br>" +
      "• Dog Collar – $15<br>" +
      "• Pet Bowl – $10<br>" +
      "• Pet Toy – $8",
      "bot"
    );

  } else if (message.includes("material")) {
    addMessage(
      "📦 Product materials:<br>" +
      "• Dog Collars – Nylon & leather<br>" +
      "• Pet Bowls – Stainless steel & BPA-free plastic<br>" +
      "• Pet Toys – Non-toxic rubber",
      "bot"
    );

  } else if (message.includes("contact")) {
    addMessage(
      "📞 You can contact us via Instagram DM or email:<br>" +
      "📧 milkapetshop@email.com",
      "bot"
    );

  } else {
    addMessage(
      "🐶 I'm happy to help! You can ask about our products, prices, or materials.",
      "bot"
    );
  }
}
