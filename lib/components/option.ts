import { LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { config } from "@/lib/config";

@customElement(`${config.prefix}-option`)
export class Option extends LitElement {
    @property({ type: String })
    value = "";

    @state()
    description = "";

    @state()
    content = "";

    @state()
    label = "";

    constructor() {
        super();

        this.description =
            this.querySelector("[slot='description']")?.innerHTML ?? "";

        this.content = this.querySelector("[slot='content']")?.innerHTML ?? "";

        const temp = document.createElement("div");
        temp.innerHTML = this.innerHTML;

        temp.querySelectorAll("[slot]").forEach((slot) => slot.remove());
        this.label = temp.innerHTML;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "ds-option": Option;
    }
}
