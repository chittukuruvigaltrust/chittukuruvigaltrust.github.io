// Financial list
$.getJSON("../assets/data/financialReports.json", function (financialReports) {
    // Rendering the Financial lists to Financial section
    const financialsEl = document.querySelector("#financials #v-pills-financial #financials-list");
    financialReports.reverse().forEach(financial => {
        financialsEl.innerHTML += `
    <li id="${financial.id}">Financial Report ${financial.year}
      <a href="../${financial.fileUrl}"
         target="_blank">View/Download</a>
    </li>
    `;
    })
});

// Annual list
$.getJSON("../assets/data/annualReports.json", function (annualReports) {
    // Rendering the Financial lists to Financial section
    const annualEl = document.querySelector("#financials #v-pills-annual #annual-list");
    annualReports.reverse().forEach(annual => {
        annualEl.innerHTML += `
    <li id="${annual.id}">Annual Report ${annual.year}
      <a href="../${annual.fileUrl}"
         target="_blank">View/Download</a>
    </li>
    `;
    })
});