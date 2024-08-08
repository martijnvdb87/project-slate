import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { config } from "@/lib/config";
import {
    mainCss,
    varPercent,
    varPercentContrast,
    varSize,
} from "../util/style";
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
                <div part="content">
                    <slot></slot>
                </div>
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

                --main-color-h: var(--primary-color-h);
                --main-color-s: var(--primary-color-s);
                --main-color-l: var(--primary-color-l);
                --main-color-a: var(--primary-color-a);
                --main-color-c: var(--primary-color-c);

                --background-color-h: var(--main-color-h);
                --background-color-s: ${varPercent("main-color-s")};
                --background-color-l: ${varPercent("main-color-l")};
                --background-color-a: 1;

                --accent-color-h: var(--main-color-h);
                --accent-color-s: ${varPercent("main-color-s")};
                --accent-color-l: ${varPercentContrast(
                    "main-color-l",
                    "main-color-c"
                )};
                --accent-color-a: var(--main-color-a);
            }

            [part="main"] {
                display: flex;
                flex-direction: column;
                gap: ${varSize("alert-row-gap")};
                font-size: var(--font-size);
                color: hsla(
                    var(--accent-color-h),
                    var(--accent-color-s),
                    var(--accent-color-l),
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
                    var(--accent-color-l),
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

            :host([type="success"]) {
                --main-color-h: var(--success-color-h);
                --main-color-s: var(--success-color-s);
                --main-color-l: var(--success-color-l);
                --main-color-a: var(--success-color-a);
                --main-color-c: var(--success-color-c);
            }

            :host([type="warning"]) {
                --main-color-h: var(--warning-color-h);
                --main-color-s: var(--warning-color-s);
                --main-color-l: var(--warning-color-l);
                --main-color-a: var(--warning-color-a);
                --main-color-c: var(--warning-color-a);
            }

            :host([type="error"]) {
                --main-color-h: var(--error-color-h);
                --main-color-s: var(--error-color-s);
                --main-color-l: var(--error-color-l);
                --main-color-a: var(--error-color-a);
                --main-color-c: var(--error-color-c);
            }
        `,
    ];
}

declare global {
    interface HTMLElementTagNameMap {
        "ds-alert": Alert;
    }
}
