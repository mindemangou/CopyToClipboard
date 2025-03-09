class n extends HTMLElement {
  constructor() {
    super(), this.handleClick = this.handleClick.bind(this);
  }
  connectedCallback() {
    this.addEventListener("click", this.handleClick);
  }
  disconnectedCallback() {
    this.removeEventListener("click", this.handleClick);
  }
  async handleClick() {
    const t = this == null ? void 0 : this.querySelector("template");
    if (t === null)
      return console.warn("The template tag is not found"), !1;
    const e = t == null ? void 0 : t.content.textContent;
    if (e) {
      const c = this.hasAttribute("trim") ? e == null ? void 0 : e.trim() : e;
      navigator.clipboard.writeText(c).then(() => {
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
customElements.define("copyto-clipboard", n);
export {
  n as CopyToClipboard
};
