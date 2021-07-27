(function() {
  const template = document.createElement('template');
  template.innerHTML = `
    <button>
      <slot></slot>
    </button>
  `;
  
  class CustomButton extends HTMLElement {
    constructor() {
      super();
      if (!this.shadowRoot) {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.addStylesheet();
      }
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
