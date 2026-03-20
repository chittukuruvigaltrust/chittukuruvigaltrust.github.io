/**
 * Testimonials: load assets/data/testimonials.json and carousel UI.
 */
(function () {
  "use strict";

  function escapeTestimonialHtml(s) {
    return String(s || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function initTestimonialsCarousel() {
    var root = document.querySelector("[data-testimonials-carousel]");
    var viewport = root && root.querySelector(".testimonials-viewport");
    var track = document.getElementById("testimonials-list");
    var prev = root && root.querySelector(".testimonials-nav-prev");
    var next = root && root.querySelector(".testimonials-nav-next");
    if (!root || !viewport || !track || !prev || !next || !track.children.length) return;

    var GAP = 20;
    var index = 0;
    var resizeTimer;

    function perView() {
      var w = window.innerWidth;
      if (w < 768) return 1;
      if (w < 992) return 2;
      return 3;
    }

    function maxIndex() {
      var n = track.children.length;
      return Math.max(0, n - perView());
    }

    function go(i, animate) {
      index = Math.max(0, Math.min(i, maxIndex()));
      var slide = track.children[0];
      var slideW = slide ? slide.offsetWidth : 0;
      var offset = index * (slideW + GAP);
      if (animate === false) {
        track.style.transition = "none";
      } else {
        track.style.transition = "";
      }
      track.style.transform = "translate3d(-" + offset + "px, 0, 0)";
      if (animate === false) {
        void track.offsetHeight;
        track.style.transition = "";
      }
      prev.disabled = index <= 0;
      next.disabled = index >= maxIndex();
    }

    function layout() {
      var pv = perView();
      var vpW = viewport.clientWidth;
      var slideW = (vpW - (pv - 1) * GAP) / pv;
      Array.prototype.forEach.call(track.children, function (slide) {
        slide.style.flexBasis = slideW + "px";
        slide.style.width = slideW + "px";
      });
      track.style.gap = GAP + "px";
      index = Math.min(index, maxIndex());
      go(index, false);
    }

    function onResize() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(layout, 120);
    }

    prev.addEventListener("click", function () {
      go(index - 1, true);
    });
    next.addEventListener("click", function () {
      go(index + 1, true);
    });
    window.addEventListener("resize", onResize);
    layout();
  }

  function renderTestimonials(items) {
    var el = document.querySelector("#testimonials #testimonials-list");
    if (!el || !Array.isArray(items)) return;

    items
      .slice()
      .sort(function (a, b) {
        return (a.id || 0) - (b.id || 0);
      })
      .forEach(function (t) {
        var quote = escapeTestimonialHtml(t.quote || "");
        var name = escapeTestimonialHtml(t.name || "");
        var role = escapeTestimonialHtml(t.role || "");
        var imgPath = (t.image || "assets/img/testimonials/no-image.jpg").replace(/^\.\//, "");
        var imgSrc = escapeTestimonialHtml(imgPath);
        var imgAlt = escapeTestimonialHtml(t.name || "Testimonial");
        el.innerHTML +=
          '<div class="testimonial-slide" role="listitem" data-testimonial-id="' +
          String(t.id) +
          '">' +
          '<article class="testimonial-card">' +
          '<div class="testimonial-card-decor" aria-hidden="true"></div>' +
          '<div class="testimonial-avatar-wrap">' +
          '<img class="testimonial-avatar" src="./' +
          imgSrc +
          '" width="512" height="512" alt="' +
          imgAlt +
          '" loading="lazy" />' +
          "</div>" +
          '<blockquote class="testimonial-quote">&ldquo;' +
          quote +
          '&rdquo;</blockquote>' +
          '<strong class="testimonial-name">' +
          name +
          "</strong>" +
          '<span class="testimonial-role">' +
          role +
          "</span>" +
          "</article>" +
          "</div>";
      });

    initTestimonialsCarousel();
  }

  var el = document.querySelector("#testimonials #testimonials-list");
  if (!el) return;

  fetch("./assets/data/testimonials.json")
    .then(function (res) {
      if (!res.ok) throw new Error("Testimonials fetch failed");
      return res.json();
    })
    .then(renderTestimonials)
    .catch(function (err) {
      console.error(err);
    });
})();
