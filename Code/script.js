document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menuBtn");
  const closeBtn = document.getElementById("closeMenu");
  const sideMenu = document.getElementById("sideMenu");
  const overlay = document.getElementById("menuOverlay");

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
  
});

