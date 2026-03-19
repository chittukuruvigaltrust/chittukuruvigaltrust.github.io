document.addEventListener("DOMContentLoaded", function () {
  // Function to load and render reports as paginated cards
  function renderPaginatedHomeReports(data, containerId, paginationId, titlePrefix) {
      let currentPage = 1;
      const cardsPerPage = 6;
      
      function renderPage(page) {
          const container = document.getElementById(containerId);
          if (!container) return;
          
          container.innerHTML = '';
          container.className = 'row text-left'; 
          
          const start = (page - 1) * cardsPerPage;
          const end = start + cardsPerPage;
          const paginatedData = data.slice(start, end);
          
          paginatedData.forEach(item => {
              let href = item.fileUrl;
              if(href.startsWith('/') || href.startsWith('../')) {
                  href = href.replace('../', './');
              } else {
                  href = './' + href;
              }
              
              const title = titlePrefix ? `${titlePrefix} ${item.year}` : item.year;

              container.innerHTML += `
                <div class="col-lg-4 col-md-6 mb-4">
                    <div class="report-card text-left">
                        <div>${title}</div>
                        <a href="${href}" target="_blank" class="download-link">
                        <div class="d-flex justify-content-between align-items-end mt-auto pt-4">
                            Download
                            <i class="bx bxs-file-pdf pdf-icon"></i>
                        </div>
                        </a>
                        
                    </div>
                </div>
              `;
          });
          
          renderPagination(page, Math.ceil(data.length / cardsPerPage));
      }
      
      function renderPagination(page, totalPages) {
          let paginationContainer = document.getElementById(paginationId);
          
          // Create pagination container if it doesn't exist yet
          if(!paginationContainer) {
              const listContainer = document.getElementById(containerId);
              paginationContainer = document.createElement('div');
              paginationContainer.id = paginationId;
              listContainer.parentNode.appendChild(paginationContainer);
          }
          
          if (totalPages <= 1) {
              paginationContainer.innerHTML = '';
              return;
          }
          
          let html = '<ul class="pagination justify-content-end align-items-center custom-pagination mt-4">';
          
          for (let i = 1; i <= totalPages; i++) {
              const activeClass = i === page ? 'active' : '';
              html += `<li class="page-item ${activeClass}">
                          <a class="page-link" href="javascript:void(0)" data-page="${i}">${i}</a>
                      </li>`;
          }
          
          if (page < totalPages) {
              html += `<li class="page-item">
                          <a class="page-link next-link" href="javascript:void(0)" data-page="${page + 1}">Next</a>
                      </li>`;
          }
          
          html += '</ul>';
          paginationContainer.innerHTML = html;
          
          const links = paginationContainer.querySelectorAll('.page-link');
          links.forEach(link => {
              link.addEventListener('click', function(e) {
                  e.preventDefault();
                  const newPage = parseInt(this.getAttribute('data-page'));
                  renderPage(newPage);
              });
          });
      }
      
      if (data.length > 0) {
          renderPage(currentPage);
      }
  }

  fetch('./assets/data/annualReports.json')
    .then(res => res.json())
    .then(data => renderPaginatedHomeReports(data.reverse(), 'home-annual-list', 'home-annual-pagination', 'Annual Report'));

  fetch('./assets/data/financialReports.json')
    .then(res => res.json())
    .then(data => renderPaginatedHomeReports(data.reverse(), 'home-financials-list', 'home-financials-pagination', 'Financial Report'));
});
