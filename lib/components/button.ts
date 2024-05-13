import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import config from "@/lib/config.json" assert { type: "json" };
import "@/lib/css/fonts.css";

@customElement(`${config.prefix}-button`)
export class DsButton extends LitElement {
    @property({ type: Number })
    count = 0;

    render() {
        return html`
            <button>
                <slot></slot>
            </button>
        `;
    }

    static styles = css`
        button {
            display: inline-flex;
            padding: 1rem 1.5rem;
            font-size: 1rem;
            border-radius: 0.5rem;
            fontfamily: var(--font-family);
            background-color: #e7e7e7;
            border: none;
            cursor: pointer;
        }
    `;
}

declare global {
    interface HTMLElementTagNameMap {
        "ds-button": DsButton;
    }
}
