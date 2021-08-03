import './components/navbar.js';
import './components/button.js';
import './components/hamburger.js';
import './components/input.js';
import './components/website_input.js';
import './components/modal.js';

(function () {
  document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const formElement = document.getElementById('contact_form');
    const confirmPasswordElement = document.getElementById('confirm_password');
    const passwordElement = document.getElementById('password');

    const submitForm = async (formData) => {
      const response = await fetch('https://app.rdstation.com.br/signup', {
        method: 'POST',
        formData,
      });
      console.log(response);
    };
  
    confirmPasswordElement.addEventListener('input', (event) => {
      if (passwordElement.value !== event.target.value) {
        confirmPasswordElement.setCustomValidity('As senhas devem ser iguais.');
      } else {
        confirmPasswordElement.setCustomValidity('');
      }
    });

    
    formElement.addEventListener('submit', (event) => {
      // event.preventDefault();
      
      // const formData = new FormData(event.target);
      // const {
      //   name,
      //   email,
      //   tel,
      //   occupation,
      //   password,
      //   confirm_password,
      // } = Object.fromEntries(formData.entries());
      // console.log(password, confirm_password);

      // submitForm(formData);
    });

  });
})();
