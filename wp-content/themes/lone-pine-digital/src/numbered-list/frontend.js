document.addEventListener("DOMContentLoaded", () => {
  const list = document.querySelector(".list");
  const line = document.querySelector(".list-progress-line");
  const items = document.querySelectorAll(".list-item");

  // Highlight circles when their text is visible
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const item = entry.target.closest(".list-item");
        const indicator = item.querySelector(".list-item-indicator");

        if (entry.isIntersecting) {
          indicator.classList.add("active");
        } else {
          indicator.classList.remove("active");
        }
      });
    },
    { threshold: 0.4 }
  );

  items.forEach((item) => {
    const title = item.querySelector(".list-item-title");
    if (title) observer.observe(title);
  });

  // Scroll-driven line height
 const updateLine = () => {
  const rect = list.getBoundingClientRect();
  const viewportHeight = window.innerHeight;

  const start = viewportHeight * 0.6;

  const end = rect.height;

  const progress = Math.min(
    Math.max((start - rect.top) / (end - start), 0),
    1
  );

  line.style.height = `${progress * 100}%`;
};


  window.addEventListener("scroll", updateLine);
  window.addEventListener("resize", updateLine);
  updateLine();
});
