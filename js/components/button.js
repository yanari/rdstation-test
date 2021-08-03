(function() {
  const template = document.createElement('template');
  template.innerHTML = `
    <button>
      <slot></slot>
    </button>
    <div></div>
  `;
  
  class CustomButton extends HTMLElement {
    constructor() {
      super();
      if (!this.shadowRoot) {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.visibleButton = this.shadowRoot.querySelector('button');
        const allAttributes = this.getAttributeNames();
        allAttributes.forEach(attribute => this.visibleButton.setAttribute(attribute, attribute));
        this.addStylesheet();
      }
    }

    attributeChangedCallback(name, _, newValue) {
      this.visibleButton[name] = newValue;
    }

    connectedCallback() {
      if (this.type === 'submit') {
        this.hiddenButton = document.createElement('button');
        this.hiddenButton.setAttribute('hidden', '');
        this.hiddenButton.setAttribute('type', 'submit');
        this.appendChild(this.hiddenButton);

        this.visibleButton.addEventListener('click', this._onClick);
      }
    }

    disconnectCallback() {
      if (this.type === 'submit') {
        this.visibleButton.removeEventListener('click', this._onClick);
      }
    }

    _onClick = () => {
      this.hiddenButton.click();
    }

    get type() {
      return this.getAttribute('type');
    }

    set type(value) {
      this.setAttribute('type', value);
    }
  
    addStylesheet() {
      const link = document.createElement('link');
      link.setAttribute('rel', 'stylesheet');
      link.setAttribute('type', 'text/css');
      link.setAttribute('href', 'js/components/button.css');
  
      this.shadowRoot.appendChild(link);
    }
  }
  
  const register = () => customElements.define('custom-button', CustomButton);
  window.WebComponents ? window.WebComponents.waitFor(register) : register();
})();
