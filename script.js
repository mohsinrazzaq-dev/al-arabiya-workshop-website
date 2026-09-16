const menuBtn = document.getElementById("menuBtn");
const mainNav = document.getElementById("mainNav");

menuBtn.addEventListener("click", () => {
  mainNav.classList.toggle("open");
  menuBtn.textContent = mainNav.classList.contains("open") ? "×" : "☰";
});

document.querySelectorAll(".main-nav a").forEach(link => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuBtn.textContent = "☰";
  });
});

document.querySelectorAll("[data-package]").forEach(btn => {
  btn.addEventListener("click", () => {
    const packageName = btn.dataset.package;
    const service = document.getElementById("service");
    service.value = packageName;
  });
});

const form = document.getElementById("bookingForm");
const status = document.getElementById("formStatus");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const car = document.getElementById("car").value;
  const service = document.getElementById("service").value;
  const message = document.getElementById("message").value.trim();

  if (!name || !phone || !car || !service) {
    status.textContent = "يرجى تعبئة جميع الحقول المطلوبة.";
    return;
  }

  const text =
`مرحباً ورشة العربية لصيانة السيارات 👋

أرغب في حجز موعد صيانة.

الاسم: ${name}
رقم الجوال: ${phone}
نوع السيارة: ${car}
الخدمة المطلوبة: ${service}
${message ? "ملاحظات: " + message : ""}`;

  const whatsappUrl = "https://wa.me/96896115504?text=" + encodeURIComponent(text);
  status.textContent = "جاري فتح واتساب...";
  window.open(whatsappUrl, "_blank");
});

document.getElementById("year").textContent = new Date().getFullYear();

const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".main-nav a");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => link.classList.remove("active"));
      const active = document.querySelector(`.main-nav a[href="#${entry.target.id}"]`);
      if (active) active.classList.add("active");
    }
  });
}, { rootMargin: "-35% 0px -55% 0px" });

sections.forEach(section => observer.observe(section));
