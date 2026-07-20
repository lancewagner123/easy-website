(function () {
  document.querySelectorAll(".year").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  var toggle = document.querySelector(".nav-toggle");
  if (!toggle) return;

  toggle.addEventListener("click", function () {
    var open = document.body.classList.toggle("nav-open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });

  document.querySelectorAll(".nav-links a").forEach(function (link) {
    link.addEventListener("click", function () {
      document.body.classList.remove("nav-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
})();

// Portfolio carousel (Concept B) — no-op on pages without [data-carousel].
(function () {
  var carousel = document.querySelector("[data-carousel]");
  if (!carousel) return;

  var track = carousel.querySelector("[data-carousel-track]");
  var slides = Array.prototype.slice.call(track.children);
  var dotsWrap = carousel.querySelector("[data-carousel-dots]");
  var prevBtn = carousel.querySelector("[data-carousel-prev]");
  var nextBtn = carousel.querySelector("[data-carousel-next]");
  var AUTOPLAY_MS = 5000;
  var index = 0;
  var timer = null;

  var dots = slides.map(function (_, i) {
    var dot = document.createElement("button");
    dot.type = "button";
    dot.className = "carousel__dot";
    dot.setAttribute("aria-label", "Go to slide " + (i + 1));
    dot.addEventListener("click", function () {
      goTo(i);
      restartAutoplay();
    });
    dotsWrap.appendChild(dot);
    return dot;
  });

  function render() {
    slides.forEach(function (slide, i) {
      slide.classList.toggle("is-active", i === index);
    });
    dots.forEach(function (dot, i) {
      dot.setAttribute("aria-current", i === index ? "true" : "false");
    });
  }

  function goTo(i) {
    index = (i + slides.length) % slides.length;
    render();
  }

  function next() { goTo(index + 1); }
  function prev() { goTo(index - 1); }

  function startAutoplay() { timer = setInterval(next, AUTOPLAY_MS); }
  function stopAutoplay() { if (timer) clearInterval(timer); }
  function restartAutoplay() { stopAutoplay(); startAutoplay(); }

  nextBtn.addEventListener("click", function () { next(); restartAutoplay(); });
  prevBtn.addEventListener("click", function () { prev(); restartAutoplay(); });

  carousel.addEventListener("mouseenter", stopAutoplay);
  carousel.addEventListener("mouseleave", startAutoplay);
  carousel.addEventListener("focusin", stopAutoplay);
  carousel.addEventListener("focusout", startAutoplay);

  carousel.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight") { next(); restartAutoplay(); }
    if (e.key === "ArrowLeft") { prev(); restartAutoplay(); }
  });

  render();
  startAutoplay();
})();
