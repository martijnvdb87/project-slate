import { html } from "@/lib/util/syntax";
import BaseElement from "@/lib/components/base";
import { css, size } from "@/lib/util/style";

export default class Button extends BaseElement {
    protected template() {
        return html`
            <button>
                <slot />
            </button>
        `;
    }

    protected styles() {
        return [
            css("button", {
                display: "inline-flex",
                padding: `${size(3)} ${size(6)}`,
                fontSize: size(4),
                borderRadius: size(1.5),
                fontFamily: "var(--font-family)",
                backgroundColor: "#e7e7e7",
                border: "none",
                cursor: "pointer",
            }),
        ];
    }
}
