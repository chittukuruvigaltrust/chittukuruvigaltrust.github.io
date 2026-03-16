// Work Lists
$.getJSON("./assets/data/works.json", function (works) {
  const worksListEl = document.querySelector("#works #works-list");
  // Rendering the works list in work section
  works.forEach(work => {
    worksListEl.innerHTML += `
    <div
    class="col-xl-3 col-lg-4 col-md-6 works-item filter-${work.type}" id="${work.id}"
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
  newslettersList.reverse().forEach((news, index) => {
    if (index <= 3) {
      newsletterListEl.innerHTML += `
  <div class="col-md-3 col-12" id="${news.id}">
  <div class="newsletter-col mb-5">
    <div class="img">
      <img
        src="./${news.imageUrl}"
        alt=""
        class="img-fluid"
      />
      <div class="icon">
        <a href="${news.link}" target="_blank">
          <i class="ri-file-download-line"></i
        ></a>
      </div>
    </div>
  </div>
</div>
  `;
    }
    else {
      return;
    }
  })
});