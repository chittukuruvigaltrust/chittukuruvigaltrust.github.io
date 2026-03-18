// Work Lists
$.getJSON("./assets/data/works.json", function (works) {
  const worksListEl = document.querySelector("#works #works-list");
  // Rendering the works list in work section
  works.forEach(work => {
    worksListEl.innerHTML += `
    <div
    class="col-xl-3 col-lg-4 col-md-6 col-sm-6 works-item filter-${work.type}" id="${work.id}"
  >
    <div class="works-wrap">
      <img
        src="${work.imageUrl}"
        class="img-fluid"
        alt="${work.title}"
      />
      <div class="works-info">
        <h4>${work.title}</h4>
        <div class="works-links">
          <a
            href="${work.imageUrl}"
            data-gall="worksGallery"
            class="venobox"
            title="${work.title}"
            ><i class="bx bx-zoom-in"></i
          ></a>
        </div>
      </div>
    </div>
  </div>
    `;
  })
});

// Services
$.getJSON("./assets/data/services.json", function (servicesList) {
  // Rendering the services list into service section
  const serviceListEl = document.querySelector("#services #services-list");
  servicesList.forEach(services => {
    serviceListEl.innerHTML += `
    <div class="col-lg-4 col-md-6 icon-box" id="${services.id}">
    <div class="icon"><i class="${services.icon}"></i></div>
    <h4 class="title text-muted"><p>${services.title}</p></h4>
    </div>
    `;
  })
});

$.getJSON("./assets/data/newsletters.json", function (newslettersList) {
  // Rendering the newsletter lists to newsletter section
  const newsletterListEl = document.querySelector("#newsletter #newsletter-lists");
  newslettersList
    .sort((a, b) => a.id - b.id)
    .filter((news) => news.type === "news")
    .slice(0, 4)
    .forEach((news) => {
      newsletterListEl.innerHTML += `
      <div class="col-lg-3 col-md-4 col-sm-6 col-12 newsletter-col" id="${news.id}">
        <div class="newsletter-card">
          <div class="newsletter-img-wrapper">
            <img src="./${news.imageUrl}" alt="${news.title}" />
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
    });
});