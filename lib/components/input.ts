import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";
import { config } from "@/lib/config";
import "@/lib/css/fonts.css";
import { mainCss } from "../util/style";

@customElement(`${config.prefix}-input`)
export class Input extends LitElement {
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
            --border-radius: 0.25rem;
            --border-style: solid;
            --border-color: transparent;
            --border-width: 1px;
            --padding: 0.875rem 1.75rem;
            --font-size: 1rem;
            --font-weight: 600;
            --letter-spacing: 0.025em;
            --cursor: pointer;
            --transition: all 200ms ease-in-out;
            --transform: none;
            --transform-hover: none;
            --transform-active: scale(0.95);

            --background: var(--default-color);
            --background-hover: var(--default-color-hover);
            --background-active: var(--default-color-active);
            --color: var(--default-accent);
            --color-hover: var(--default-accent-hover);
            --color-active: var(--default-accent-active);
        }

        button {
            display: var(--display);
            padding: var(--padding);
            font-size: var(--font-size);
            border-radius: var(--border-radius);
            font-family: var(--font-family);
            font-weight: var(--font-weight);
            letter-spacing: var(--letter-spacing);
            background: var(--background);
            color: var(--color);
            border-style: var(--border-style);
            border-width: var(--border-width);
            border-color: var(--border-color);
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

        :host([shape="pill"]) button {
            border-radius: 9999px;
        }

        :host([shape="rect"]) button {
            border-radius: 0;
        }

        :host([color="primary"]) {
            --background: var(--primary-color);
            --background-hover: var(--primary-color-hover);
            --background-active: var(--primary-color-active);
            --color: var(--primary-accent);
            --color-hover: var(--primary-accent-hover);
            --color-active: var(--primary-accent-active);
        }

        :host([type="ghost"]) {
            --background: transparent;
            --background-hover: transparent;
            --background-active: transparent;
            --color: var(--default-accent);
            --color-hover: var(--default-accent);
            --color-active: var(--default-accent);
            --border-color: var(--default-color);
        }

        :host([type="ghost"]) button:hover {
            --border-color: var(--default-color-hover);
        }

        :host([type="ghost"]) button:active {
            --border-color: var(--default-color-active);
        }

        :host([type="ghost"][color="primary"]) {
            --color: var(--primary-color);
            --color-hover: var(--primary-color-hover);
            --color-active: var(--primary-color-active);
            --border-color: var(--primary-color);
        }

        :host([type="ghost"][color="primary"]) button:hover {
            --border-color: var(--primary-color-hover);
        }

        :host([type="ghost"][color="primary"]) button:active {
            --border-color: var(--primary-color-active);
        }
    `;
}

declare global {
    interface HTMLElementTagNameMap {
        "ds-input": Input;
    }
}
