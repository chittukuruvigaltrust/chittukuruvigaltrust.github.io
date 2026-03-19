document.addEventListener('DOMContentLoaded', function() {
  var form = document.getElementById('subscribeForm');
  var btn = document.getElementById('subscribeBtn');
  var msg = document.getElementById('subscribeMsg');

  if(form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
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
