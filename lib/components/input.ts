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

    render() {
        return html`
            <input
                part="input"
                placeholder="${this.placeholder}"
                value="${this.value}"
            />
        `;
    }

    static styles = css`
        ${mainCss()}

        :host {
            --display: inline-flex;
            --border-radius: 0.25rem;
            --border-size: 1px;
            --height: 2.75rem;
            --padding: 0.75rem;
        }

        input {
            display: var(--display);
            align-items: center;
            justify-content: center;
            vertical-align: middle;
            height: var(--height);
            padding: 0 var(--padding);
            border-radius: var(--border-radius);
            border: var(--border-size) solid transparent;
            border-color: hsl(
                var(--default-color-h),
                var(--default-color-s),
                calc(var(--default-color-l) - 10%)
            );
            background: var(--background);
            font-family: var(--font-family);
            font-size: 1rem;
            font-weight: var(--font-weight);
            letter-spacing: var(--letter-spacing);
            line-height: var(--line-height);
            outline: none;
        }
    `;
}

declare global {
    interface HTMLElementTagNameMap {
        "ds-input": Input;
    }
}
