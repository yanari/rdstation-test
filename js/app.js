import './components/navbar.js';
import './components/button.js';
import './components/hamburger.js';
import './components/input.js';

(function () {
  document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const form = document.getElementById('contact_form');

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const formData = new FormData(form);
      console.log(formData);
    });

  });
})();
