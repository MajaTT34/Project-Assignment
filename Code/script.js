document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menuBtn");
  const closeBtn = document.getElementById("closeMenu");
  const sideMenu = document.getElementById("sideMenu");
  const overlay = document.getElementById("menuOverlay");

  const openChatLinks = document.querySelectorAll(".open-chat");
  const chatPage = document.getElementById("chatPage");

  const chatForm = document.getElementById("chatForm");
  const chatInput = document.getElementById("chatInput");
  const chatMessages = document.getElementById("chatMessages");
  const sendBtn = document.getElementById("sendBtn");
  const errorMessage = document.getElementById("errorMessage");

  const params = new URLSearchParams(window.location.search);

  if (params.get("chat") === "open" && chatPage) {
    chatPage.classList.add("open");
  }

  document.body.classList.add("chat-ready");

  // Accessibility-friendly menu functions
  function openMenu() {
    if (!sideMenu || !overlay || !menuBtn) return;

    sideMenu.classList.add("open");
    overlay.classList.add("open");
    menuBtn.setAttribute("aria-expanded", "true");

    if (closeBtn) {
      closeBtn.focus();
    }
  }

  function closeMenu() {
    if (!sideMenu || !overlay || !menuBtn) return;

    sideMenu.classList.remove("open");
    overlay.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");

    menuBtn.focus();
  }

  if (menuBtn) {
    menuBtn.setAttribute("aria-expanded", "false");
    menuBtn.setAttribute("aria-controls", "sideMenu");
    menuBtn.addEventListener("click", openMenu);
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", closeMenu);
  }

  if (overlay) {
    overlay.addEventListener("click", closeMenu);
  }

  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && sideMenu && sideMenu.classList.contains("open")) {
      closeMenu();
    }
  });

  // Basket counter
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

  // Open chat links
  openChatLinks.forEach(link => {
    link.addEventListener("click", event => {
      event.preventDefault();

      if (chatPage) {
        chatPage.classList.add("open");
      }

      if (sideMenu && overlay && menuBtn) {
        sideMenu.classList.remove("open");
        overlay.classList.remove("open");
        menuBtn.setAttribute("aria-expanded", "false");
      }
    });
  });

  // Chat form with OpenAI API
  if (chatForm) {
    chatForm.addEventListener("submit", async event => {
      event.preventDefault();

      const message = chatInput.value.trim();

      if (!message) return;

      addMessage(message, "user");

      chatInput.value = "";

      if (errorMessage) {
        errorMessage.classList.remove("show");
      }

      sendBtn.disabled = true;
      sendBtn.textContent = "×";
      sendBtn.classList.add("loading");

      const loadingBubble = addLoading();
      const loadingStart = Date.now();
      const minimumLoadingTime = 1500;

      try {
        const reply = await getBotReply(message);

        const loadingTime = Date.now() - loadingStart;

        if (loadingTime < minimumLoadingTime) {
          await new Promise(resolve =>
            setTimeout(resolve, minimumLoadingTime - loadingTime)
          );
        }

        loadingBubble.remove();
        addMessage(reply, "bot");
      } catch (error) {
        const loadingTime = Date.now() - loadingStart;

        if (loadingTime < minimumLoadingTime) {
          await new Promise(resolve =>
            setTimeout(resolve, minimumLoadingTime - loadingTime)
          );
        }

        loadingBubble.remove();

        if (errorMessage) {
          errorMessage.textContent = "Failed to connect. Wait and try again later.";
          errorMessage.classList.add("show");
        }

        console.error("Chat API error:", error);
      } finally {
        sendBtn.disabled = false;
        sendBtn.textContent = "↑";
        sendBtn.classList.remove("loading");
      }
    });
  }

  // Newsletter form validation
  const newsletterForm = document.querySelector(".newsletter form");
  const firstNameInput = document.getElementById("firstName");
  const emailInput = document.getElementById("email");

  if (newsletterForm && firstNameInput && emailInput) {
    const feedback = document.createElement("p");
    feedback.classList.add("form-feedback");
    feedback.setAttribute("aria-live", "polite");

    newsletterForm.appendChild(feedback);

    newsletterForm.addEventListener("submit", event => {
      event.preventDefault();

      const firstName = firstNameInput.value.trim();
      const email = emailInput.value.trim();

      if (!firstName) {
        feedback.textContent = "Please enter your first name.";
        feedback.classList.add("error");
        feedback.classList.remove("success");
        firstNameInput.focus();
        return;
      }

      if (!email || !email.includes("@") || !email.includes(".")) {
        feedback.textContent = "Please enter a valid e-mail address.";
        feedback.classList.add("error");
        feedback.classList.remove("success");
        emailInput.focus();
        return;
      }

      feedback.textContent = "Thank you for signing up!";
      feedback.classList.add("success");
      feedback.classList.remove("error");

      newsletterForm.reset();
    });
  }

  function addMessage(text, sender) {
    if (!chatMessages) return;

    const row = document.createElement("div");
    row.classList.add("chat-row");

    const bubble = document.createElement("div");
    bubble.textContent = text;

    if (sender === "user") {
      row.classList.add("user-row");
      bubble.classList.add("chat-bubble", "user-bubble");
      row.appendChild(bubble);
    } else {
      row.classList.add("bot-row");

      const name = document.createElement("span");
      name.classList.add("chat-name");
      name.textContent = "FRAM";

      bubble.classList.add("chat-bubble", "bot-bubble");

      row.appendChild(name);
      row.appendChild(bubble);
    }

    chatMessages.appendChild(row);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function addLoading() {
    if (!chatMessages) return null;

    const row = document.createElement("div");
    row.classList.add("chat-row", "bot-row");

    const name = document.createElement("span");
    name.classList.add("chat-name");
    name.textContent = "FRAM";

    const bubble = document.createElement("div");
    bubble.classList.add("chat-bubble", "loading-bubble");
    bubble.textContent = "•••";

    row.appendChild(name);
    row.appendChild(bubble);

    chatMessages.appendChild(row);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    return row;
  }

  async function getBotReply(message) {
    const apiKey = "DIN_OPENAI_API_KEY_HER";

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are FRAM's helpful customer service assistant. Answer briefly and politely."
          },
          {
            role: "user",
            content: message
          }
        ]
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();

    return data.choices[0].message.content;
  }
});