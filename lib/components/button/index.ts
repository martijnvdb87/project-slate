import { css, html } from "@/lib/util/syntax";
import BaseElement from "@/lib/components/base";
import { size } from "@/lib/util/style";

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
                padding: ${size(3)} ${size(6)};
                font-size: ${size(4)};
                border-radius: ${size(1.5)};
                font-family: var(--font-family);
                background-color: #e7e7e7;
                border: none;
                cursor: pointer;
            }
        `;
    }
}
