document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menuBtn");
  const closeBtn = document.getElementById("closeMenu");
  const sideMenu = document.getElementById("sideMenu");
  const overlay = document.getElementById("menuOverlay");

  if (menuBtn && closeBtn && sideMenu && overlay) {
    menuBtn.addEventListener("click", () => {
      sideMenu.classList.add("open");
      overlay.classList.add("open");
    });

    closeBtn.addEventListener("click", () => {
      sideMenu.classList.remove("open");
      overlay.classList.remove("open");
    });

    overlay.addEventListener("click", () => {
      sideMenu.classList.remove("open");
      overlay.classList.remove("open");
    });
  }

  const basketButtons = document.querySelectorAll(".basket-btn");
  const statusDot = document.querySelector(".status-dot");

  let count = 0;

  basketButtons.forEach(button => {
    button.addEventListener("click", () => {
      count++;

      if (statusDot) {
        statusDot.textContent = count;
      }
    });
  });

  const chatForm = document.getElementById("chatForm");
  const chatInput = document.getElementById("chatInput");
  const chatMessages = document.getElementById("chatMessages");
  const sendBtn = document.getElementById("sendBtn");
  const errorMessage = document.getElementById("errorMessage");

  if (chatForm && chatInput && chatMessages && sendBtn && errorMessage) {
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
        await fakeBotReply(message);
      } catch (error) {
        loadingBubble.remove();

        errorMessage.classList.add("show");

        sendBtn.textContent = "↑";
        sendBtn.classList.remove("loading");
      }
    });
  }

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