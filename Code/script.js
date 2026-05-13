document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menuBtn");
  const closeBtn = document.getElementById("closeMenu");
  const sideMenu = document.getElementById("sideMenu");
  const overlay = document.getElementById("menuOverlay");

  const openChatLinks = document.querySelectorAll(".open-chat");
  const chatPage = document.getElementById("chatPage");
  
  // Open chat automatically from URL
const params = new URLSearchParams(window.location.search);

if (params.get("chat") === "open") {
  chatPage.classList.add("open");
}

document.body.classList.add("chat-ready");

  const chatForm = document.getElementById("chatForm");
  const chatInput = document.getElementById("chatInput");
  const chatMessages = document.getElementById("chatMessages");
  const sendBtn = document.getElementById("sendBtn");
  const errorMessage = document.getElementById("errorMessage");

  // Menu open
  menuBtn.addEventListener("click", () => {
    sideMenu.classList.add("open");
    overlay.classList.add("open");
  });

  // Menu close
  closeBtn.addEventListener("click", () => {
    sideMenu.classList.remove("open");
    overlay.classList.remove("open");
  });

  overlay.addEventListener("click", () => {
    sideMenu.classList.remove("open");
    overlay.classList.remove("open");
  });

  // Basket counter
  const basketButtons = document.querySelectorAll(".basket-btn");
  const statusDot = document.querySelector(".status-dot");

  let count = 0;

  basketButtons.forEach(button => {
    button.addEventListener("click", () => {
      count++;
      statusDot.textContent = count;
    });
  });

  // Open chatbot from menu link and card button
  openChatLinks.forEach(link => {
    link.addEventListener("click", event => {
      event.preventDefault();

      chatPage.classList.add("open");

      sideMenu.classList.remove("open");
      overlay.classList.remove("open");
    });
  });

  // Send chat message
  chatForm.addEventListener("submit", async event => {
    event.preventDefault();

    const message = chatInput.value.trim();
    if (!message) return;

    addMessage(message, "user");

    chatInput.value = "";
    errorMessage.classList.remove("show");

    sendBtn.textContent = "×";
    sendBtn.classList.add("loading");

    const loadingBubble = addLoading();

    try {
      const reply = await fakeBotReply(message);

      loadingBubble.remove();
      addMessage(reply, "bot");

      sendBtn.textContent = "↑";
      sendBtn.classList.remove("loading");
    } catch (error) {
      loadingBubble.remove();

      errorMessage.classList.add("show");

      sendBtn.textContent = "↑";
      sendBtn.classList.remove("loading");
    }
  });

  function addMessage(text, sender) {
    const row = document.createElement("div");
    row.classList.add("chat-row");

    if (sender === "user") {
      row.classList.add("user-row");
      row.innerHTML = `
        <div class="chat-bubble user-bubble">${text}</div>
      `;
    } else {
      row.classList.add("bot-row");
      row.innerHTML = `
        <span class="chat-name">FRAM</span>
        <div class="chat-bubble bot-bubble">${text}</div>
      `;
    }

    chatMessages.appendChild(row);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function addLoading() {
    const row = document.createElement("div");
    row.classList.add("chat-row", "bot-row");

    row.innerHTML = `
      <span class="chat-name">FRAM</span>
      <div class="chat-bubble loading-bubble">•••</div>
    `;

    chatMessages.appendChild(row);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    return row;
  }

  function fakeBotReply(message) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject("Failed to connect");
    }, 1200);
  });
}
  
});