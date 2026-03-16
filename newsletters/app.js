// Rendering the newsletter main lists to newsletter page
$.getJSON("../assets/data/newsletters.json", function (newslettersList) {
  const newsletterMainEl = document.querySelector("#newsletter #newsletter-main-lists");
  newslettersList.reverse().forEach((news) => {
    newsletterMainEl.innerHTML += `
  <div class="col-md-3 col-12" id="${news.id}">
  <div class="newsletter-col mb-5">
    <div class="img">
      <img
        src="../${news.imageUrl}"
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
  })
});