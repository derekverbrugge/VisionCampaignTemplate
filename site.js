async function loadPartial(elementId, filePath) {
  const container = document.getElementById(elementId);

  if (!container) {
    return;
  }

  try {
    const response = await fetch(filePath);

    if (!response.ok) {
      throw new Error(`Unable to load ${filePath}`);
    }

    container.innerHTML = await response.text();
  } catch (error) {
    console.error(error);
  }
}

function setupMobileMenu() {
  const menuToggle = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".site-navigation");

  if (!menuToggle || !navigation) {
    return;
  }

  menuToggle.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("is-open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation menu" : "Open navigation menu"
    );
  });

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navigation.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation menu");
    });
  });
}

function setupMorePriorities() {
  const moreButton = document.querySelector(".more-priorities-button");
  const additionalPriorities = document.getElementById(
    "additional-priorities"
  );

  if (!moreButton || !additionalPriorities) {
    return;
  }

  moreButton.addEventListener("click", () => {
    const isExpanded =
      moreButton.getAttribute("aria-expanded") === "true";

    additionalPriorities.hidden = isExpanded;
    moreButton.setAttribute("aria-expanded", String(!isExpanded));

    const buttonText = moreButton.querySelector("span:first-child");
    const buttonSymbol = moreButton.querySelector(
      ".more-priorities-symbol"
    );

    if (buttonText) {
      buttonText.textContent = isExpanded
        ? "More Priorities"
        : "Hide Priorities";
    }

    if (buttonSymbol) {
      buttonSymbol.textContent = isExpanded ? "+" : "−";
    }
  });
}

function setCopyrightYear() {
  const yearElement = document.getElementById("copyright-year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

async function initializeSite() {
  await Promise.all([
    loadPartial("site-header", "header.html"),
    loadPartial("site-footer", "footer.html")
  ]);

  setupMobileMenu();
  setupMorePriorities();
  setCopyrightYear();
}

initializeSite();
