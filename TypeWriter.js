const template = document.createElement("template");
template.innerHTML = `

  <style>
    .txt {
      color: var(--color, #666);
      background: var(--background, transparent);
      font-size: var(--font-size, 1.5rem);
      font-family: var(--font-family, "Courier New", Courier, monospace);
   
    }

    .type-writer {
      display: inline-block;
      height: 100%;
      border-right: 0.15em solid #666;
      animation: blink-caret var(--indicator-speed, 0.75s) step-end infinite;
    
    }

    .hide-caret {
      border-right: none;
      animation: none;
    }
    
    @keyframes blink-caret {
      from,
      to {
        border-color: transparent;
      }
      50% {
        border-color: #666;
      }
    }
         
  </style>
<span class="type-writer"></span>
`;

class TypeWriter extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    this.shadow.appendChild(template.content.cloneNode(true));
    this.txtContainer = this.shadow.querySelector(".type-writer");
    this.words = JSON.parse(
      this.getAttribute("data-words") ?? '["First", "Second", "Third"]'
    );
    this.wait = parseInt(this.getAttribute("data-wait") ?? 2000, 10);
    this.forwardDelay = parseInt(this.getAttribute("data-forward") ?? 200, 10);
    this.backwardDelay = parseInt(
      this.getAttribute("data-backward") ?? 100,
      10
    );
    this.txt = "";
    this.wordIndex = 0;
    this.typeTimeout = null;
    this.isDeleting = false;

    const indicatorSpeed = this.getAttribute("data-indicator-speed") || "0.75s";
    this.txtContainer.style.setProperty("--indicator-speed", indicatorSpeed);
  }

  static get observedAttributes() {
    return ["indicator"];
  }

  connectedCallback() {
    this.type();
  }

  disconnectedCallback() {
    clearTimeout(this.typeTimeout);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "indicator") {
      if (newValue === "false") {
        this.txtContainer.classList.add("hide-caret");
      } else {
        this.txtContainer.classList.remove("hide-caret");
      }
    }
  }

  type() {
    const current = this.wordIndex % this.words.length;
    const fullTxt = this.words[current];
    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.txtContainer.innerHTML = `<span class="txt">${this.txt}</span>`;

    let typeSpeed;
    if (this.isDeleting) {
      typeSpeed = this.backwardDelay;
    } else if (this.txt.length === fullTxt.length) {
      typeSpeed = this.wait;
      this.isDeleting = true;
    } else {
      typeSpeed = this.forwardDelay;
    }

    this.typeTimeout = setTimeout(() => this.type(), typeSpeed);

    // Start deleting the word after a brief pause once it's fully typed
    if (this.txt.length === fullTxt.length && !this.isDeleting) {
      setTimeout(() => {
        this.isDeleting = true;
      }, this.wait);
    }

    // Start typing the next word after deleting the current word
    if (this.txt.length === 0 && this.isDeleting) {
      this.wordIndex++;
      this.isDeleting = false;
      clearTimeout(this.typeTimeout);
      setTimeout(() => {
        this.type();
      }, this.forwardDelay);
    }
  }
}

window.customElements.define("type-writer", TypeWriter);

// const template = document.createElement("template");
// template.innerHTML = `
//   <style>
//     .txt {

//     }

//     .type-writer {
//       border-right: 0.08em solid #666;
//       animation: blink-caret 0.75s step-end infinite;
//     }

//     @keyframes blink-caret {
//       from,
//       to {
//         border-color: transparent;
//       }
//       50% {
//         border-color: #666;
//       }
//     }

//   </style>
//   <span class="type-writer"></span>
// `;

// class TypeWriter extends HTMLElement {
//   constructor() {
//     super();
//     this.shadow = this.attachShadow({ mode: "open" });
//     this.shadow.appendChild(template.content.cloneNode(true));
//     this.txtContainer = this.shadow.querySelector(".type-writer");
//     this.words = JSON.parse(this.getAttribute("data-words"));
//     this.wait = parseInt(this.getAttribute("data-wait"), 10) || 2000;
//     this.forwardDelay = parseInt(this.getAttribute("data-forward"), 10) || 200;
//     this.backwardDelay =
//       parseInt(this.getAttribute("data-backward"), 10) || 200;
//     this.txt = "";
//     this.wordIndex = 0;
//     this.typeTimeout = null;
//     this.isDeleting = false;
//   }

//   connectedCallback() {
//     this.type();
//   }

//   disconnectedCallback() {
//     clearTimeout(this.typeTimeout);
//   }

//   type() {
//     const current = this.wordIndex % this.words.length;
//     const fullTxt = this.words[current];

//     if (this.isDeleting) {
//       this.txt = fullTxt.substring(0, this.txt.length - 1);
//     } else {
//       this.txt = fullTxt.substring(0, this.txt.length + 1);
//     }

//     this.txtContainer.innerHTML = `<span class="txt">${this.txt}</span>`;

//     let typeSpeed;
//     if (this.isDeleting) {
//       typeSpeed = this.backwardDelay;
//     } else if (this.txt.length === fullTxt.length) {
//       typeSpeed = this.wait;
//       this.isDeleting = true;
//     } else {
//       typeSpeed = this.forwardDelay;
//     }

//     this.typeTimeout = setTimeout(() => this.type(), typeSpeed);

//     // Start deleting the word after a brief pause once it's fully typed
//     if (this.txt.length === fullTxt.length && !this.isDeleting) {
//       setTimeout(() => {
//         this.isDeleting = true;
//       }, this.wait);
//     }

//     // Start typing the next word after deleting the current word
//     if (this.txt.length === 0 && this.isDeleting) {
//       this.wordIndex++;
//       this.isDeleting = false;
//       clearTimeout(this.typeTimeout);
//       setTimeout(() => {
//         this.type();
//       }, this.forwardDelay);
//     }
//   }
// }

// window.customElements.define("type-writer", TypeWriter);

// const template = document.createElement("template");
// template.innerHTML = `
//   <style>
//     .txt {
//       border-right: 0.08em solid #666;
//     }
//   </style>
//   <span class="type-writer"></span>
// `;

// class TypeWriter extends HTMLElement {
//   constructor() {
//     super();
//     this.shadow = this.attachShadow({ mode: "open" });
//     this.shadow.appendChild(template.content.cloneNode(true));
//     this.txtContainer = this.shadow.querySelector(".type-writer");
//     this.words = JSON.parse(this.getAttribute("data-words"));
//     this.wait = parseInt(this.getAttribute("data-wait"), 10) || 2000;
//     this.forwardDelay = parseInt(this.getAttribute("data-forward"), 10) || 200;
//     this.backwardDelay =
//       parseInt(this.getAttribute("data-backward"), 10) || 200;
//     this.txt = "";
//     this.wordIndex = 0;
//     this.typeTimeout = null;
//     this.isDeleting = false;
//     this.typos = parseInt(this.getAttribute("data-typos"), 10) || 0;
//   }

//   connectedCallback() {
//     this.type();
//   }

//   disconnectedCallback() {
//     clearTimeout(this.typeTimeout);
//   }

//   type() {
//     const current = this.wordIndex % this.words.length;
//     const fullTxt = this.words[current];

//     if (this.isDeleting) {
//       this.txt = fullTxt.substring(0, this.txt.length - 1);
//     } else {
//       if (
//         this.typos > 0 &&
//         this.txt.length === Math.floor(fullTxt.length / 2)
//       ) {
//         // Vertippen
//         let typoTxt = "";
//         for (let i = 0; i < this.typos; i++) {
//           typoTxt += String.fromCharCode(Math.floor(Math.random() * 26) + 97);
//         }
//         this.txt = fullTxt.substring(0, this.txt.length) + typoTxt;
//       } else {
//         this.txt = fullTxt.substring(0, this.txt.length + 1);
//       }
//     }

//     this.txtContainer.innerHTML = `<span class="txt">${this.txt}</span>`;

//     let typeSpeed;
//     if (this.isDeleting) {
//       typeSpeed = this.backwardDelay;
//     } else if (this.txt.length === fullTxt.length) {
//       typeSpeed = this.wait;
//       this.isDeleting = true;
//     } else {
//       typeSpeed = this.forwardDelay;
//     }

//     if (this.isDeleting && this.txt === "") {
//       // Pause zwischen den Wörtern
//       typeSpeed = 500;
//       this.isDeleting = false;
//       this.wordIndex++;
//     }

//     this.typeTimeout = setTimeout(() => this.type(), typeSpeed);
//   }
// }

// window.customElements.define("type-writer", TypeWriter);
