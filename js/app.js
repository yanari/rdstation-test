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

      new FormData(form); // fires the formdata event
    });

    form.addEventListener('formdata', ({ formData }) => {
      for (let value in formData.entries()) {
        console.log(value);
      }
    });

  });
})();
