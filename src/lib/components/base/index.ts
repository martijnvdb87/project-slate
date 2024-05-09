import reset from "@/lib/css/reset.css?inline";

export default abstract class BaseElement extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: "open" });

        const resetStyle = document.createElement("style");
        resetStyle.innerHTML = `${reset}`;

        const template = document.createElement("template");
        template.innerHTML = this.template();

        const style = document.createElement("style");
        style.textContent = this.styles();

        this.shadowRoot?.appendChild(resetStyle);
        this.shadowRoot?.appendChild(template.content.cloneNode(true));
        this.shadowRoot?.appendChild(style);
    }

    protected abstract template(): string;
    protected abstract styles(): string;
}
