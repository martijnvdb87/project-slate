import reset from "@/lib/css/reset.css?inline";
import main from "@/lib/css/main.css?inline";

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

        const mainStyle = document.createElement("style");
        mainStyle.innerHTML = `${main}`;

        this.shadowRoot?.appendChild(resetStyle);
        this.shadowRoot?.appendChild(template.content.cloneNode(true));
        this.shadowRoot?.appendChild(style);
        this.shadowRoot?.appendChild(mainStyle);
    }

    protected abstract template(): string;
    protected abstract styles(): string;
}
