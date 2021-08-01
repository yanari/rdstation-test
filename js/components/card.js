(function() {
  const template = document.createElement('template');
  template.innerHTML = `
  <style>
  </style>
  <div id="card">
    <div></div>
  </div>
  `;

  class CardItem extends HTMLElement {
    constructor() {
      super();
      if (!this.shadowRoot) {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
      }
    }
  }
  
  const register = () => customElements.define('card-item', CardItem);
  window.WebComponents ? window.WebComponents.waitFor(register) : register();
})();
