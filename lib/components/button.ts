import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";
import { config } from "@/lib/config";
import "@/lib/css/fonts.css";
import { mainCss } from "../util/style";

@customElement(`${config.prefix}-button`)
export class Button extends LitElement {
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
        }

        button {
            display: var(--display);
            padding: var(--padding);
            font-size: var(--font-size);
            border-radius: var(--border-radius);
            font-family: var(--font-family);
            font-weight: var(--font-weight);
            letter-spacing: var(--letter-spacing);
            background: hsl(
                var(--default-color-h),
                var(--default-color-s),
                var(--default-color-l)
            );
            color: hsl(
                var(--default-accent-h),
                var(--default-accent-s),
                var(--default-accent-l)
            );
            border-style: var(--border-style);
            border-width: var(--border-width);
            border-color: var(--border-color);
            cursor: var(--cursor);
            transition: var(--transition);
            transform: var(--transform);
        }

        button:hover {
            background: hsl(
                var(--default-color-h),
                var(--default-color-s),
                calc(var(--default-color-l) - 5%)
            );
        }

        button:active {
            background: hsl(
                var(--default-color-h),
                var(--default-color-s),
                calc(var(--default-color-l) - 10%)
            );
        }

        :host([type="primary"]) button {
            background: hsl(
                var(--primary-color-h),
                var(--primary-color-s),
                var(--primary-color-l)
            );
            color: hsl(
                var(--primary-accent-h),
                var(--primary-accent-s),
                var(--primary-accent-l)
            );
        }

        :host([type="primary"]) button:hover {
            background: hsl(
                var(--primary-color-h),
                var(--primary-color-s),
                calc(var(--primary-color-l) - 5%)
            );
        }

        :host([type="primary"]) button:active {
            background: hsl(
                var(--primary-color-h),
                var(--primary-color-s),
                calc(var(--primary-color-l) - 10%)
            );
        }

        :host([type="secondary"]) button {
            background: hsl(
                var(--secondary-color-h),
                var(--secondary-color-s),
                var(--secondary-color-l)
            );
            color: hsl(
                var(--secondary-accent-s),
                var(--secondary-accent-l) var(--secondary-accent-h)
            );
        }

        :host([type="secondary"]) button:hover {
            background: hsl(
                var(--secondary-color-h),
                var(--secondary-color-s),
                calc(var(--secondary-color-l) - 5%)
            );
        }

        :host([type="secondary"]) button:active {
            background: hsl(
                var(--secondary-color-h),
                var(--secondary-color-s),
                calc(var(--secondary-color-l) - 10%)
            );
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

        :host([type="ghost"]) {
            --color: var(--primary-color);
            --color-hover: var(--primary-color-hover);
            --color-active: var(--primary-color-active);
            --border-color: var(--primary-color);
        }

        :host([type="ghost"]) button:hover {
            --border-color: var(--primary-color-hover);
        }

        :host([type="ghost"]) button:active {
            --border-color: var(--primary-color-active);
        }
    `;
}

declare global {
    interface HTMLElementTagNameMap {
        "ds-button": Button;
    }
}
