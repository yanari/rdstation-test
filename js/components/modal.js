(function() {
  const template = document.createElement('template');
  template.innerHTML = `
    <style>
      #overlay {
        // display: none;
        background-color: rgba(0, 0, 0, 0.5);
        height: 100%;
        inset: 0;
        overflow: hidden;
        position: fixed;
        width: 100%;
        z-index: 10;
      }

      #overlay > .content {
        height: 100%;
        width: 100%;
      }

      #overlay > .content > iframe {
        height: 30%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100%;
      }

      @media (min-width: 768px) {
        #overlay > .content > iframe {
          height: 50%;
          width: 50%;
        }
      }
    </style>
    <div id="overlay">
      <div class="content">
        <iframe
          src="https://www.youtube.com/embed/lGCesaaLi4s"
          title="Conheça o RD Station Marketing"
          frameborder="0"
          allow="accelerometer;
            autoplay;
            clipboard-write;
            encrypted-media;
            gyroscope;
            picture-in-picture"
          allowfullscreen>
        </iframe>
      </div>
    </div>
  `;

  class VideoModal extends HTMLElement {
    constructor() {
      super();
      if (!this.shadowRoot) {
        this.attachShadow({ mode: 'open' });
        const emitters = document.querySelectorAll('[open-modal]');
        emitters.forEach(el => el.addEventListener('click', this._onOpenModal));

        this.addEventListener('click', this._onCloseModal)
      }
    }
    
    _onOpenModal = () => {
      this.shadowRoot.appendChild(template.content.cloneNode(true));
    };

    _onCloseModal = () => {
      this.shadowRoot.innerHTML = '';
    }

    get open() {
      return this.getAttribute('open');
    }

    set open(value) {
      value = Boolean(value);
      if (value)
        this.setAttribute('open', '');
      else
        this.removeAttribute('open');
    }
  }
  
  const register = () => customElements.define('video-modal', VideoModal);
  window.WebComponents ? window.WebComponents.waitFor(register) : register();
})();
