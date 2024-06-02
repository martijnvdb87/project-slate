import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";
import { config } from "@/lib/config";
import "@/lib/css/fonts.css";
import { mainCss } from "@/lib/util/style";

@customElement(`${config.prefix}-app`)
export class App extends LitElement {
    render() {
        return html`
            <main>
                <slot></slot>
            </main>
        `;
    }

    static styles = css`
        ${mainCss()}
    `;
}

declare global {
    interface HTMLElementTagNameMap {
        "ds-app": App;
    }
}
