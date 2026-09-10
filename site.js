async function loadPartial(elementId, filePath) {
  const target = document.getElementById(elementId);

  if (!target) {
    return;
  }

  try {
    const response = await fetch(filePath);

    if (!response.ok) {
      throw new Error(`Unable to load ${filePath}`);
    }

    target.innerHTML = await response.text();
  } catch (error) {
    console.error(error);
    target.innerHTML = "";
  }
}

function setupMobileMenu() {
  const menuToggle = document.querySelector(".menu-toggle");
  const navigation = document.querySelector("#site-navigation");

  if (!menuToggle || !navigation) {
    return;
  }

  menuToggle.addEventListener("click", () => {
    const isOpen =
      menuToggle.getAttribute("aria-expanded") === "true";

    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    navigation.classList.toggle("is-open", !isOpen);
  });

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.setAttribute("aria-expanded", "false");
      navigation.classList.remove("is-open");
    });
  });
}

function setCopyrightYear() {
  const yearElement = document.getElementById("copyright-year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

async function initializeSite() {
  await loadPartial("site-header", "header.html");
  await loadPartial("site-footer", "footer.html");

  setupMobileMenu();
  setCopyrightYear();
}

initializeSite();
