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
            --border-size: 1px;
            --height: 2.875rem;
            --padding: 0rem 1.5rem;
            --font-size: 0.875rem;
            --font-size: 0.9375rem;
            --font-weight: 600;
            --letter-spacing: 0.025em;
            --transform: none;
            --transform-hover: none;
            --transform-active: scale(0.95);
            --transition: all 200ms ease-in-out;
        }

        button {
            display: var(--display);
            align-items: center;
            height: var(--height);
            padding: var(--padding);
            font-size: var(--font-size);
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
            border: var(--border-size) solid transparent;
            border-radius: var(--border-radius);
            cursor: pointer;
            transition: var(--transition);
            transform: var(--transform);
        }

        button:hover {
            background: hsl(
                var(--default-color-h),
                var(--default-color-s),
                calc(var(--default-color-l) - 8%)
            );
            transform: var(--transform-hover);
        }

        button:active {
            background: hsl(
                var(--default-color-h),
                var(--default-color-s),
                calc(var(--default-color-l) - 10%)
            );
            transform: var(--transform-active);
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
                calc(var(--primary-color-l) - 8%)
            );
        }

        :host([type="secondary"]) button {
            background: hsl(
                var(--secondary-color-h),
                var(--secondary-color-s),
                var(--secondary-color-l)
            );
            color: hsl(
                var(--secondary-accent-h),
                var(--secondary-accent-s),
                var(--secondary-accent-l)
            );
        }

        :host([type="secondary"]) button:hover {
            background: hsl(
                var(--secondary-color-h),
                var(--secondary-color-s),
                calc(var(--secondary-color-l) - 8%)
            );
        }

        :host([type="ghost"]) button {
            background: transparent;
            border-color: hsl(
                var(--default-color-h),
                var(--default-color-s),
                var(--default-color-l)
            );
        }

        :host([type="ghost"]) button:hover {
            border-color: hsl(
                var(--default-color-h),
                var(--default-color-s),
                calc(var(--default-color-l) - 16%)
            );
        }

        :host([type="link"]) button {
            background: transparent;
            color: hsl(
                var(--default-accent-h),
                var(--default-accent-s),
                var(--default-accent-l)
            );
        }

        :host([type="link"]) button:hover {
            background: hsla(
                var(--default-color-h),
                var(--default-color-s),
                var(--default-color-l),
                0.5
            );
        }

        :host([shape="square"]) button {
            border-radius: 0;
        }

        :host([shape="pill"]) button {
            border-radius: 999rem;
        }

        :host([shape="circle"]) button {
            border-radius: 50%;
            width: var(--height);
            padding: 0;
        }
    `;
}

declare global {
    interface HTMLElementTagNameMap {
        "ds-button": Button;
    }
}
