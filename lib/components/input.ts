import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { config } from "@/lib/config";
import "@/lib/css/fonts.css";
import { mainCss } from "../util/style";

@customElement(`${config.prefix}-input`)
export class Input extends LitElement {
    @property({ type: String })
    value = "";

    @property({ type: String })
    placeholder = "";

    @property({ type: String })
    label = "";

    render() {
        return html`
            <div part="main">
                <label part="label" for="input">${this.label}</label>
                <div part="input-container">
                    <input
                        id="input"
                        part="input"
                        placeholder="${this.placeholder}"
                        value="${this.value}"
                    />
                </div>
            </div>
        `;
    }

    static styles = css`
        ${mainCss()}

        :host {
            display: inline-flex;
            vertical-align: bottom;

            --height: 2.5rem;
            --padding-x: 0.75rem;

            --border-radius: var(--element-border-radius);
            --border-width: var(--input-border-width);
            --border-color-h: var(--input-border-color-h);
            --border-color-s: var(--input-border-color-s);
            --border-color-l: var(--input-border-color-l);
            --border-color-a: var(--input-border-color-a);
        }

        input {
            display: flex;
            align-items: center;
            justify-content: center;
            vertical-align: middle;
            height: calc(var(--height) - 2px);
            padding: 0 var(--padding-x);
            background: transparent;
            font-family: var(--font-family);
            font-size: 1rem;
            border: none;
            outline: none;
        }

        input::placeholder {
            opacity: 0.75;
        }

        [part="label"] {
            display: inline-block;
            padding: 0.25rem;
            font-size: 0.875rem;
            font-weight: 600;
            color: hsl(
                var(--default-accent-h),
                var(--default-accent-s),
                var(--default-accent-l)
            );
        }

        [part="input-container"] {
            height: var(--height);
            border-radius: var(--border-radius);
            border-width: var(--border-width);
            border-style: solid;
            border-color: hsla(
                var(--border-color-h),
                var(--border-color-s),
                var(--border-color-l),
                var(--border-color-a)
            );
            outline: 0rem solid
                hsla(
                    var(--primary-color-h),
                    var(--primary-color-s),
                    var(--primary-color-l),
                    0
                );
            transition: all 120ms ease-in-out;
        }

        [part="input-container"]:focus-within {
            border-color: hsl(
                var(--primary-color-h),
                var(--primary-color-s),
                var(--primary-color-l)
            );
            outline: 0.25rem solid
                hsla(
                    var(--primary-color-h),
                    var(--primary-color-s),
                    var(--primary-color-l),
                    0.25
                );
        }
    `;
}

declare global {
    interface HTMLElementTagNameMap {
        "ds-input": Input;
    }
}
