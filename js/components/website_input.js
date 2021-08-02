(function() {
  const template = document.createElement('template');
  template.innerHTML = `
  <style>
    :host > .form-field {
      display: flex;
    }
    
    :host > .form-field > label {
      display: block;
      font-weight: 700;
      margin-bottom: 8px;
    }

    :host > .form-field > .input-wrapper {
      display: flex;
      position: relative;
    }
    
    :host > .form-field > ::slotted(.input) {
      border: none;
      height: 0;
      opacity: 0;
      transition: all .2s ease-in-out;
    }

    :host > .form-field > ::slotted(.input)::placeholder {
      color: var(--bw-color-gray-60);
    }
    
    :host > .form-field > ::slotted(.input:active),
    :host > .form-field > ::slotted(.input:focus) {
      border-color: var(--color-primary-60);
      box-shadow: none;
      border-radius: 0;
      outline: none;
    }

    :host([required]) > .form-field > ::slotted(.input) {
      border: 2px solid var(--bw-color-black);
      box-shadow: inset 6px 6px 0 var(--box-shadow-inset);
      color: var(--bw-color-gray-100);
      height: 40px;
      font-size: 14px;
      opacity: 1;
      padding: 0 12px !important;
      width: 100%;
    }

    :host([required]) > .form-field {
      margin-bottom: 16px;
    }
  </style>
  <div class="form-field">
    <slot name="input"></slot>
  </div>
  `;

  class FormField extends HTMLElement {
    constructor() {
      super();
      if (!this.shadowRoot) {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        const slots = this.shadowRoot.querySelector('slot').assignedNodes();
        this.input = slots[0];

        this.input.setAttribute('tabindex', 0);
        this.input.setAttribute('class', 'input');
        this.input.setAttribute('type', 'url');
        this.input.setAttribute('title', 'Campo deve ser um website válido.');

        console.log(this.hasAttribute('required'));
      }
    }
    
    connectedCallback() {
      const radioElements = document.querySelectorAll('input[name="has_site"]');
      radioElements.forEach(radio => radio.addEventListener('change', this._onRadioButtonsChange));
    }

    _onRadioButtonsChange = (event) => {
      const hasSite = event.target.id === 'has_site';
      const hasWebsiteField = !!this.input;
      if (hasWebsiteField) {
        this.required = hasSite;
      }
    };

    static get observedAttributes() {
      return ['required', 'placeholder', 'name'];
    }

    attributeChangedCallback(name, _, newValue) {
      this.input[name] = newValue;
    }

    // Getters and setters
    get required() {
      return this.hasAttribute('required');
    }

    set required(value) {
      value = Boolean(value);
      if (value) {
        this.setAttribute('required', 'true');
      } else {
        this.removeAttribute('required');
      }
    }

    get placeholder() {
      return this.getAttribute('placeholder');
    }

    set placeholder(value) {
      this.setAttribute('placeholder', value);
    }

    get name() {
      return this.getAttribute('name');
    }

    set name(value) {
      this.setAttribute('name', value);
    }
  }
  
  const register = () => customElements.define('website-form-field', FormField);
  window.WebComponents ? window.WebComponents.waitFor(register) : register();
})();
