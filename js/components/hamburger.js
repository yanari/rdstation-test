(function() {
  const template = document.createElement('template');
  template.innerHTML = `
  <style>
    :host {
      display: flex;
      height: 24px;
      width: 24px;
    }

    #nav {
      height: 100%;
      width: 100%;
    }
    
    #nav:before,
    #nav:after,
    #nav div {
      background: var(--color-primary-60);
      content: "";
      display: block;
      height: 4px;
      border-radius: 3px;
      margin: 4px 0;
      transition: 0.5s;
    }

    #nav:before {
      margin-top: 0;
    }

    #nav:after {
      margin-bottom: 0;
    }

    :host([open]) #nav:before {
      transform: translateY(8px) rotate(135deg);
    }

    :host([open]) #nav:after {
      transform: translateY(-8px) rotate(-135deg);
    }

    :host([open]) #nav div {
      transform: scale(0);
    }

    @media (min-width: 768px) {
      :host {
        display: none;
      }
    }
  </style>
  <div id="nav">
    <div></div>
  </div>
  `;

  class HamburgerMenu extends HTMLElement {
    constructor() {
      super();
      if (!this.shadowRoot) {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
      }
    }

    connectedCallback() {
      this.addEventListener('click', this._onClick);
    }

    static get observedAttributes() {
      return ['open'];
    }

    get open() {
      return this.hasAttribute('open');
    }

    set open(value) {
      value = Boolean(value);
      if (value)
        this.setAttribute('open', '');
      else
        this.removeAttribute('open');
    }

    _onClick() {
      this.open = !this.open;
    }

    disconnectCallback() {
      this.removeEventListener('click', this._onClick);
    }
  }
  
  const register = () => customElements.define('hamburger-menu', HamburgerMenu);
  window.WebComponents ? window.WebComponents.waitFor(register) : register();
})();
