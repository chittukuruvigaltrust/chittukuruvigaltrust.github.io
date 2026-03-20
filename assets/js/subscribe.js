document.addEventListener('DOMContentLoaded', function() {
  var form = document.getElementById('subscribeForm');
  var btn = document.getElementById('subscribeBtn');
  var msg = document.getElementById('subscribeMsg');

  function pad2(n) {
    return String(n).padStart(2, '0');
  }

  function formatDDMMYYYY_HHMM(d) {
    // Use local time so it matches user expectations.
    var dd = pad2(d.getDate());
    var mm = pad2(d.getMonth() + 1);
    var yyyy = d.getFullYear();
    var hh = pad2(d.getHours());
    var min = pad2(d.getMinutes());
    return dd + '/' + mm + '/' + yyyy + ' ' + hh + ':' + min;
  }

  if(form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();

      // Add timestamp to the hidden subject before submitting.
      var subjectInput = form.querySelector('input[name="_subject"]');
      if (subjectInput) {
        subjectInput.value = 'New Mailing List Subscription! ' + formatDDMMYYYY_HHMM(new Date());
      }

      btn.innerHTML = 'Sending...';
      btn.disabled = true;
      msg.style.display = 'none';

      fetch(form.action, {
          method: "POST",
          body: new FormData(form),
          headers: { 'Accept': 'application/json' }
      })
      .then(response => response.json())
      .then(data => {
          form.reset();
          btn.innerHTML = 'Joined Successfully!';
          btn.classList.replace('btn-success', 'btn-primary');
          
          msg.innerHTML = '<span style="color: #2e7d32;">Thank you for Join us !</span>';
          msg.style.display = 'block';

          setTimeout(function() {
              btn.innerHTML = 'Join Now';
              btn.disabled = false;
              btn.classList.replace('btn-primary', 'btn-success');
              msg.style.display = 'none';
          }, 3000);
      })
      .catch(error => {
          btn.innerHTML = 'Join Now';
          btn.disabled = false;
          msg.innerHTML = '<span style="color: #d32f2f;">Oops! Something went wrong.</span>';
          msg.style.display = 'block';
      });
    });
  }
});
