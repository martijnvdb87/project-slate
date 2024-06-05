import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";
import { config } from "@/lib/config";
import { mainCss } from "../util/style";

@customElement(`${config.prefix}-tab`)
export class Tab extends LitElement {
    render() {
        return html`
            <div part="main">
                <slot></slot>
            </div>
        `;
    }

    static styles = css`
        ${mainCss()}

        :host {
        }

        [part="main"] {
            padding: 2rem;
        }
    `;
}

declare global {
    interface HTMLElementTagNameMap {
        "ds-tab": Tab;
    }
}
