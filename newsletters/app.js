// Rendering the newsletter main lists to newsletter page
$.getJSON("../assets/data/newsletters.json", function (newslettersList) {
  const newsletterMainEl = document.querySelector("#newsletter-main-lists");
  if (!newsletterMainEl) return;

  newslettersList
    .sort((a, b) => b.id - a.id)
    .forEach((news) => {
    newsletterMainEl.innerHTML += `
      <div class="col-lg-3 col-md-4 col-sm-6 col-12 newsletter-col">
        <div class="newsletter-card">
          <div class="newsletter-img-wrapper">
            <img src="../${news.imageUrl}" alt="${news.title}" />
            <a href="${news.link}" target="_blank" class="newsletter-overlay">
              <i class="ri-eye-line"></i>
              <span>View Article</span>
            </a>
          </div>
          <div class="newsletter-info">
            <h4>${news.title}</h4>
          </div>
        </div>
      </div>
    `;
  })
});