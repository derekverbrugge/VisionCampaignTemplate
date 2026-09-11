document.addEventListener("DOMContentLoaded", () => {
  loadSharedContent();
  setupMobileMenu();
  setupMorePriorities();
});

async function loadSharedContent() {
  const headerTarget = document.getElementById("site-header");
  const footerTarget = document.getElementById("site-footer");

  if (headerTarget) {
    try {
      const response = await fetch("header.html");

      if (!response.ok) {
        throw new Error(`Header request failed: ${response.status}`);
      }

      headerTarget.innerHTML = await response.text();
    } catch (error) {
      console.error("Unable to load header.html:", error);
    }
  }

  if (footerTarget) {
    try {
      const response = await fetch("footer.html");

      if (!response.ok) {
        throw new Error(`Footer request failed: ${response.status}`);
      }

      footerTarget.innerHTML = await response.text();

      const yearElement = document.getElementById("copyright-year");

      if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
      }
    } catch (error) {
      console.error("Unable to load footer.html:", error);
    }
  }
}

function setupMobileMenu() {
  document.addEventListener("click", (event) => {
    const menuToggle = event.target.closest(".menu-toggle");

    if (!menuToggle) {
      return;
    }

    const navigation = document.getElementById("site-navigation");

    if (!navigation) {
      return;
    }

    const isOpen = navigation.classList.toggle("is-open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.textContent = isOpen ? "Close" : "Menu";
  });

  document.addEventListener("click", (event) => {
    const navigationLink = event.target.closest(
      ".site-nav a"
    );

    if (!navigationLink) {
      return;
    }

    const navigation = document.getElementById("site-navigation");
    const menuToggle = document.querySelector(".menu-toggle");

    if (navigation) {
      navigation.classList.remove("is-open");
    }

    if (menuToggle) {
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.textContent = "Menu";
    }
  });
}

function setupMorePriorities() {
  const toggle = document.getElementById("more-priorities-toggle");
  const additionalPriorities = document.getElementById(
    "additional-priorities"
  );

  if (!toggle || !additionalPriorities) {
    return;
  }

  toggle.addEventListener("click", () => {
    const isExpanded =
      toggle.getAttribute("aria-expanded") === "true";

    if (isExpanded) {
      additionalPriorities.setAttribute("hidden", "");
      toggle.setAttribute("aria-expanded", "false");
      toggle.childNodes[0].textContent = "More priorities ";
    } else {
      additionalPriorities.removeAttribute("hidden");
      toggle.setAttribute("aria-expanded", "true");
      toggle.childNodes[0].textContent = "Fewer priorities ";
    }
  });
}
