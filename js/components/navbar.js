(function() {
  const template = document.createElement('template');
  template.innerHTML = `
    <nav>
      <ul>
        <li>Menu 1</li>
        <li>Menu 2</li>
        <li>Menu 3</li>
        <li>Menu 4</li>
      </ul>
    </nav>
    <div class="header__container__buttons">
      <custom-button secondary>Button</custom-button>
      <custom-button primary>Button</custom-button>
    </div>
  `;

  class NavbarContent extends HTMLElement {
    constructor() {
      super();
      if (!this.shadowRoot) {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.addStylesheet();
      }
    }

    static get observedAttributes() {
      return ['open', 'mobile'];
    }

    get open() {
      return this.getAttribute('open');
    }

    get mobile() {
      return this.getAttribute('mobile');
    }

    set open(value) {
      value = Boolean(value);
      if (value)
        this.setAttribute('open', '');
      else
        this.removeAttribute('open');
    }
  
    addStylesheet() {
      const link = document.createElement('link');
      link.setAttribute('rel', 'stylesheet');
      link.setAttribute('type', 'text/css');
      link.setAttribute('href', 'js/components/navbar.css');
  
      this.shadowRoot.appendChild(link);
    }
  }
  
  const register = () => customElements.define('navbar-content', NavbarContent);
  window.WebComponents ? window.WebComponents.waitFor(register) : register();
})();
