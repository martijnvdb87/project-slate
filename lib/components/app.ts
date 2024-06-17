import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { config } from "@/lib/config";
import { Ref, createRef, ref } from "lit/directives/ref.js";

@customElement(`${config.prefix}-app`)
export class App extends LitElement {
    public root: Ref<HTMLInputElement> = createRef();

    protected render() {
        return html`
            <main ${ref(this.root)}>
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
