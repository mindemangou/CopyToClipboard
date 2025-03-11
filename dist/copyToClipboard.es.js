class s extends HTMLElement {
  constructor() {
    super(), this.handleClick = this.handleClick.bind(this);
  }
  connectedCallback() {
    this.hasAttribute("disabled") || this.addEventListener("click", this.handleClick);
  }
  disconnectedCallback() {
    this.removeEventListener("click", this.handleClick);
  }
  getTemplate() {
    const t = this == null ? void 0 : this.querySelector("template"), e = this.getAttribute("target"), n = e ? document.querySelector(e) : null;
    return t || n;
  }
  isTemplateElement(t) {
    return "content" in t;
  }
  async handleClick() {
    const t = this.getTemplate();
    if (t === null)
      return console.warn("The template tag or attribut target are not found"), !1;
    const e = this.isTemplateElement(t) ? t == null ? void 0 : t.content.textContent : t.textContent;
    if (e) {
      const n = this.hasAttribute("trim") ? e == null ? void 0 : e.trim() : e;
      navigator.clipboard.writeText(n).then(() => {
        this.setAttribute("data-copy", ""), this.dispatchCopyEvent();
      }).catch((i) => {
        this.hasAttribute("data-copy") && this.removeAttribute("data-copy"), console.error(i.message);
      });
    }
  }
  /**
   * Dispatch event copytoclipboard:copy if copy is successful
   */
  dispatchCopyEvent() {
    const t = new CustomEvent("copytoclipboard:copy", { cancelable: !0 });
    this.dispatchEvent(t);
  }
}
customElements.define("copyto-clipboard", s);
export {
  s as CopyToClipboard
};
