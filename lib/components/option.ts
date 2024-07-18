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
    label = "";

    constructor() {
        super();
        this.description =
            this.querySelector("[slot='description']")?.innerHTML ?? "";

        this.querySelectorAll("[slot]").forEach((slot) => slot.remove());
        this.label = this.innerHTML;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "ds-option": Option;
    }
}
