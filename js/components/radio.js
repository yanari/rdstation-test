(function() {
  const template = document.createElement('template');
  template.innerHTML = `
  <style>
    .form-field {
      align-items: center;
      display: flex;
      margin-bottom: 16px;
    }
    
    .form-field > ::slotted(.input) {
      appearance: none;
      border-radius: 50%;
      border: 1px solid var(--bw-color-gray-60);
      height: 18px;
      width: 18px;
    }
    
    .form-field > ::slotted(.input:checked) {
      background-color: var(--bw-color-gray-100);
      border: 5px solid var(--color-primary-60);
      outline: none;
    }

    .form-field > label {
      margin-left: 12px;
    }
  </style>
  <div class="form-field">
    <slot name="option"></slot>
    <label for="name">Radio Option Label</label>
  </div>
  `;

  class RadioButtonFormField extends HTMLElement {
    constructor() {
      super();
      if (!this.shadowRoot) {
        this.attachShadow({ mode: 'open', delegatesFocus: true });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
  
        this.labelTag = this.shadowRoot.querySelector('label');
        const slots = this.shadowRoot.querySelector('slot').assignedNodes();
        this.input = slots[0];
  
        this.input.setAttribute('tabindex', 0);
        this.input.setAttribute('type', 'radio');
        this.input.setAttribute('class', 'input');
      }
    }
  
    static get observedAttributes() {
      return ['required', 'label', 'name', 'id', 'selected'];
    }
  
    attributeChangedCallback(name, _, newValue) {
      this._getAttributeChangesCases(name, newValue)();
    }
  
    _getAttributeChangesCases(name, newValue) {
      return {
        'label': () => this.labelTag.innerText = newValue,
        'name': () => this.input.name = newValue,
        'id': () => {
          this.input.id = newValue;
          this.labelTag.htmlFor = newValue;
        },
        'required': () => this.input.required = newValue, // necessario?
        'checked': () => this.checked = newValue, // necessario?
        'default': () => {},
      }[name];
    }
  
    // Getters and setters
    // get required() {
    //   return this.hasAttribute('required');
    // }
  
    // set required(value) {
    //   value = Boolean(value);
    //   if (value) {
    //     this.setAttribute('required', '');
    //   } else {
    //     this.removeAttribute('required');
    //   }
    // }

    get checked() {
      return this.hasAttribute('checked');
    }
  
    set checked(value) {
      value = Boolean(value);
      console.log(value);
      if (value) {
        this.input.setAttribute('checked', '');
        this.setAttribute('checked', '');
      } else {
        this.input.removeAttribute('checked');
        this.removeAttribute('checked');
      }
    }
  
    get label() {
      return this.getAttribute('label');
    }
  
    set label(value) {
      this.setAttribute('label', value);
    }
  
    get name() {
      return this.getAttribute('name');
    }
  
    set name(value) {
      this.setAttribute('name', value);
    }
  }
  
  const register = () => customElements.define('radio-button-form-field', RadioButtonFormField);
  window.WebComponents ? window.WebComponents.waitFor(register) : register();
})();
