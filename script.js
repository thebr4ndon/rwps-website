const header = document.querySelector("[data-header]");
const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector("#site-nav");
const form = document.querySelector("[data-quote-form]");
const note = document.querySelector("[data-form-note]");

function syncHeader() {
  header.classList.toggle("is-scrolled", window.scrollY > 16);
}

syncHeader();
window.addEventListener("scroll", syncHeader, { passive: true });

toggle.addEventListener("click", () => {
  const isOpen = toggle.getAttribute("aria-expanded") === "true";
  toggle.setAttribute("aria-expanded", String(!isOpen));
  header.classList.toggle("nav-active", !isOpen);
  document.body.classList.toggle("nav-open", !isOpen);
});

nav.addEventListener("click", (event) => {
  if (!event.target.matches("a")) return;
  toggle.setAttribute("aria-expanded", "false");
  header.classList.remove("nav-active");
  document.body.classList.remove("nav-open");
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = new FormData(form);
  const lines = [
    "River Wild Property Services Quote Request",
    "",
    "Contact Information",
    "Name: " + data.get("name"),
    "Email: " + data.get("email"),
    "Phone: " + (data.get("phone") || "Not provided"),
    "",
    "Property Details",
    "Property location: " + data.get("location"),
    "Services requested: " + data.get("services"),
    "Preferred visit frequency: " + data.get("frequency"),
    "",
    "Additional Details",
    data.get("details") || "Not provided"
  ];

  const subject = encodeURIComponent("River Wild Property Services Quote Request");
  const body = lines.map(encodeURIComponent).join("%0D%0A");
  window.location.href = `mailto:contact@rwp-llc.com?subject=${subject}&body=${body}`;
  note.textContent = "Your email app should open with the quote request details.";
});
