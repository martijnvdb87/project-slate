import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";
import { config } from "@/lib/config";

@customElement(`${config.prefix}-app`)
export class App extends LitElement {
    protected render() {
        return html`
            <main>
                <slot></slot>
            </main>
        `;
    }

    protected createRenderRoot() {
        return this;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "ds-app": App;
    }
}
