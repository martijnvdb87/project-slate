import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { config } from "@/lib/config";
import "@/lib/css/fonts.css";
import { cssSize, cssVar } from "../util/style";

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
            padding: ${cssSize(4)} ${cssSize(6)};
            font-size: ${cssSize(4)};
            border-radius: ${cssSize(1.5)};
            font-family: ${cssVar("font-family")};
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
