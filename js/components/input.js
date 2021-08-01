(function() {
  const template = document.createElement('template');
  template.innerHTML = `
  <style>
    .form-field {
      display: flex;
      flex-direction: column;
      justify-content: stretch;
      margin-bottom: 16px;
    }
    
    .form-field > label {
      display: block;
      font-weight: 700;
      margin-bottom: 8px;
    }
    
    .form-field > ::slotted(.input) {
      border: 2px solid var(--bw-color-black);
      box-shadow: inset 6px 6px 0 var(--box-shadow-inset);
      color: var(--bw-color-gray-100);
      font-size: 14px;
      height: 40px;
      padding: 0 12px !important;
    }
    
    .form-field > ::slotted(.input:active),
    .form-field > ::slotted(.input:focus) {
      border-color: var(--color-primary-60);
      border-radius: 0;
      outline: none;
    }

    .form-field > ::slotted(select.input) {
      appearance: none;
      background: url('assets/icons/caret-down.svg') no-repeat right;
      padding-right: 16px !important;
    }
  </style>
  <div class="form-field">
    <label for="name">Diga, qual seu nome?</label>
    <slot name="input"></slot>
  </div>
  `;

  class FormField extends HTMLElement {
    constructor() {
      super();
      if (!this.shadowRoot) {
        this.attachShadow({ mode: 'open', delegatesFocus: true });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.labelTag = this.shadowRoot.querySelector('label');
        const slots = this.shadowRoot.querySelector('slot').assignedNodes();
        this.inputTag = slots[0];

        this.inputTag.setAttribute('tabindex', 0);
        this.inputTag.setAttribute('class', 'input');
      }
    }

    connectedCallback() {
      if (this.type === 'password') {
        this.inputTag.setAttribute('minlength', '6');
        this.inputTag.setAttribute('maxlength', '10');
      }
    }

    static get observedAttributes() {
      return ['required', 'label', 'type', 'placeholder', 'name'];
    }

    attributeChangedCallback(name, _, newValue) {
      this._getAttributeChangesCases(name, newValue)();
    }

    _getAttributeChangesCases(name, newValue) {
      return {
        'label': () => this.labelTag.innerText = newValue,
        'type': () => this.inputTag.type = newValue,
        'placeholder': () => this.inputTag.placeholder = newValue,
        'name': () => {
          this.inputTag.name = newValue;
          this.labelTag.htmlFor = newValue;
        },
        'required': () => this.inputTag.setAttribute('required', ''),
        'default': () => console.log('Atributo não definido.'),
      }[name];
    }

    // Getters and setters

    get required() {
      return this.hasAttribute('required');
    }

    set required(value) {
      value = Boolean(value);
      if (value) {
        this.setAttribute('required', '');
      } else {
        this.removeAttribute('required');
      }
    }

    get label() {
      return this.getAttribute('label');
    }

    set label(value) {
      this.setAttribute('label', value);
    }

    get type() {
      return this.getAttribute('type');
    }

    set type(value) {
      this.setAttribute('type', value);
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
  
  const register = () => customElements.define('form-field', FormField);
  window.WebComponents ? window.WebComponents.waitFor(register) : register();
})();
