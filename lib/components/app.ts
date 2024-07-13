import { LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { config } from "@/lib/config";
import { Ref, createRef } from "lit/directives/ref.js";

@customElement(`${config.prefix}-app`)
export class App extends LitElement {
    public root: Ref<HTMLInputElement> = createRef();

    @property({ type: String })
    protected theme = "system";

    protected createRenderRoot() {
        return this;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "ds-app": App;
    }
}
