import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";
import { config } from "@/lib/config";
import { mainCss } from "../util/style";

@customElement(`${config.prefix}-panel`)
export class Panel extends LitElement {
    render() {
        return html` <div part="main">
            <slot></slot>
        </div>`;
    }

    static styles = css`
        ${mainCss()}

        :host {
        }
    `;
}

declare global {
    interface HTMLElementTagNameMap {
        "ds-panel": Panel;
    }
}
