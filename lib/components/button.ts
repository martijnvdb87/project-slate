import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { config } from "@/lib/config";
import "@/lib/css/fonts.css";
import { mainCss } from "../util/style";

@customElement(`${config.prefix}-button`)
export class DsButton extends LitElement {
    @property({ type: Number })
    count = 0;

    render() {
        return html`
            <button part="button">
                <slot></slot>
            </button>
        `;
    }

    static styles = css`
        ${mainCss()}

        :host {
            --display: inline-flex;
            --radius: var(--border-radius);
            --border: none;
            --padding: 0.75rem 1.5rem;
            --cursor: pointer;
            --transition: all 200ms ease-in-out;

            --transform: none;
            --transform-hover: none;
            --transform-active: scale(0.95);

            --font-size: 1rem;
            --font-family: var(--font-family);
            --font-weight: var(--font-weight-medium);

            --background: var(--default-color);
            --background-hover: var(--default-color-hover);
            --background-active: var(--default-color-active);
            --color: var(--default-accent);
            --color-hover: var(--default-accent-hover);
            --color-active: var(--default-accent-active);
        }

        :host(.primary) {
            --background: var(--primary-color);
            --background-hover: var(--primary-color-hover);
            --background-active: var(--primary-color-active);
            --color: var(--primary-accent);
            --color-hover: var(--primary-accent-hover);
            --color-active: var(--primary-accent-active);
        }

        button {
            display: var(--display);
            padding: var(--padding);
            font-size: var(--font-size);
            border-radius: var(--radius);
            font-family: var(--font-family);
            font-weight: var(--font-weight);
            background: var(--background);
            color: var(--color);
            border: var(--border);
            cursor: var(--cursor);
            transition: var(--transition);
            transform: var(--transform);
        }

        button:hover {
            background: var(--background-hover);
            color: var(--color-hover);
            transform: var(--transform-hover);
        }

        button:active {
            background: var(--background-active);
            color: var(--color-active);
            transform: var(--transform-active);
        }
    `;
}

declare global {
    interface HTMLElementTagNameMap {
        "ds-button": DsButton;
    }
}
