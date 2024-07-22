import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { config } from "@/lib/config";
import { mainCss, varSize } from "../util/style";
import { Ref, createRef, ref } from "lit/directives/ref.js";

@customElement(`${config.prefix}-alert`)
export class Alert extends LitElement {
    public root: Ref<HTMLInputElement> = createRef();

    @property({ type: String })
    protected header = "";

    protected render() {
        return html`
            <div ${ref(this.root)} part="main">
                <div part="header" ?hidden="${!this.header}">
                    ${this.header}
                </div>
                <slot></slot>
            </div>
        `;
    }

    public static styles = [
        mainCss,
        css`
            :host {
                display: block;

                --label-font-size: ${varSize(
                    "form-label-font-size-medium",
                    true
                )};
                --label-font-weight: var(--form-label-font-weight);
                --font-size: ${varSize("font-size-medium", true)};

                --accent-color-h: var(--alert-info-accent-color-h);
                --accent-color-s: var(--alert-info-accent-color-s);
                --accent-color-l: var(--alert-info-accent-color-l);
                --accent-color-a: var(--alert-info-accent-color-a);

                --background-color-h: var(--alert-info-background-color-h);
                --background-color-s: var(--alert-info-background-color-s);
                --background-color-l: var(--alert-info-background-color-l);
                --background-color-a: var(--alert-info-background-color-a);
            }

            [part="main"] {
                display: flex;
                flex-direction: column;
                gap: ${varSize("alert-row-gap")};
                font-size: var(--font-size);
                color: hsla(
                    var(--accent-color-h),
                    var(--accent-color-s),
                    calc(var(--accent-color-l) + 5%),
                    var(--accent-color-a)
                );
                background-color: hsla(
                    var(--background-color-h),
                    var(--background-color-s),
                    var(--background-color-l),
                    var(--background-color-a)
                );
                padding: ${varSize("alert-padding-y")}
                    ${varSize("alert-padding-x")};

                border-radius: ${varSize("alert-border-radius", true)};
            }

            [part="header"] {
                font-weight: var(--label-font-weight);
                font-size: var(--label-font-size);
                color: hsla(
                    var(--accent-color-h),
                    var(--accent-color-s),
                    calc(var(--accent-color-l) - 5%),
                    var(--accent-color-a)
                );
            }

            :host([size="tiny"]) {
                --label-font-size: ${varSize(
                    "form-label-font-size-tiny",
                    true
                )};
                --font-size: ${varSize("font-size-tiny", true)};
            }

            :host([size="small"]) {
                --label-font-size: ${varSize(
                    "form-label-font-size-small",
                    true
                )};
                --font-size: ${varSize("font-size-medium", true)};
            }

            :host([size="large"]) {
                --label-font-size: ${varSize(
                    "form-label-font-size-large",
                    true
                )};
                --font-size: ${varSize("font-size-huge", true)};
            }

            :host([size="huge"]) {
                --label-font-size: ${varSize(
                    "form-label-font-size-huge",
                    true
                )};
                --font-size: ${varSize("font-size-huge", true)};
            }
        `,
    ];
}

declare global {
    interface HTMLElementTagNameMap {
        "ds-alert": Alert;
    }
}
