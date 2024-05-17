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
            display: inline-flex;
            vertical-align: bottom;
        }

        button {
            display: flex;
            flex: auto;
            align-items: center;
            justify-content: center;
            height: 2.5rem;
            padding: 0 1rem;
            font-size: 0.9375rem;
            font-family: var(--font-family);
            font-weight: 500;
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
            border: 0 solid transparent;
            border-radius: 0.375rem;
            cursor: pointer;
            transition: all 120ms ease-in-out;
        }

        button:hover {
            background: hsl(
                var(--default-color-h),
                var(--default-color-s),
                calc(var(--default-color-l) - 4%)
            );
        }

        button:active {
            background: hsl(
                var(--default-color-h),
                var(--default-color-s),
                calc(var(--default-color-l) - 8%)
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
                calc(var(--primary-color-l) - 4%)
            );
        }

        :host([type="primary"]) button:active {
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
                calc(var(--secondary-color-l) - 4%)
            );
        }

        :host([type="secondary"]) button:active {
            background: hsl(
                var(--secondary-color-h),
                var(--secondary-color-s),
                calc(var(--secondary-color-l) - 8%)
            );
        }

        :host([type="ghost"]) button {
            background: transparent;
            border-width: 1px;
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
                calc(var(--default-color-l) - 8%)
            );
        }

        :host([type="ghost"]) button:active {
            border-color: hsl(
                var(--default-color-h),
                var(--default-color-s),
                calc(var(--default-color-l) - 24%)
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

        :host([type="link"]) button:active {
            background: hsla(
                var(--default-color-h),
                var(--default-color-s),
                var(--default-color-l),
                0.75
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
            width: 2.5rem
            padding: 0;
        }

        :host([size="tiny"]) button {
            height: 1.5rem;
            padding: 0 0.5rem;
            font-size: 0.75rem;
        }

        :host([size="small"]) button {
            height: 2rem;
            padding: 0 0.75em;
            font-size: 0.875rem;
        }

        :host([size="large"]) button {
            height: 3rem;
            padding: 0 1.5rem;
            font-size: 1.5rem;
        }

        :host([size="huge"]) button {
            height: 3.75rem;
            padding: 0 1.75rem;
            font-size: 1.75rem;
        }

        :host([width="full"]) {
            display: flex;
        }

        :host([type="primary"][shadow]) button {
            box-shadow: 0 0.25rem 1rem 0.125rem
                hsl(
                    var(--primary-color-h),
                    var(--primary-color-s),
                    calc(var(--primary-color-l) - 25%),
                    0.25
                );
        }

        :host([type="secondary"][shadow]) button {
            box-shadow: 0 0.25rem 1rem 0.125rem
                hsl(
                    var(--secondary-color-h),
                    var(--secondary-color-s),
                    calc(var(--secondary-color-l) - 25%),
                    0.25
                );
        }
    `;
}

declare global {
    interface HTMLElementTagNameMap {
        "ds-button": Button;
    }
}
