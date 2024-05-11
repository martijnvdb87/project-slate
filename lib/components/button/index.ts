import { css, html } from "@/lib/util/syntax";
import BaseElement from "@/lib/components/base";

export default class Button extends BaseElement {
    protected template() {
        return html`
            <button>
                <slot />
            </button>
        `;
    }

    protected styles() {
        return css`
            button {
                display: inline-flex;
                padding: 0.5rem 1rem;
                border-radius: 0.25rem;
                font-family: Inter, sans-serif;
                background-color: var(--ds-button-background-color, #e7e7e7);
                border: none;
                cursor: pointer;
            }
        `;
    }
}
