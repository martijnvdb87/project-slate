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

                --accent-color-h: var(--alert-info-accent-h);
                --accent-color-s: var(--alert-info-accent-s);
                --accent-color-l: var(--alert-info-accent-l);
                --accent-color-a: var(--alert-info-accent-a);

                --background-color-h: var(--alert-info-color-h);
                --background-color-s: var(--alert-info-color-s);
                --background-color-l: var(--alert-info-color-l);
                --background-color-a: var(--alert-info-color-a);
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

            [part="content"] {
                opacity: var(--alert-content-opacity);
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
                --accent-color-h: var(--alert-success-accent-h);
                --accent-color-s: var(--alert-success-accent-s);
                --accent-color-l: var(--alert-success-accent-l);
                --accent-color-a: var(--alert-success-accent-a);

                --background-color-h: var(--alert-success-color-h);
                --background-color-s: var(--alert-success-color-s);
                --background-color-l: var(--alert-success-color-l);
                --background-color-a: var(--alert-success-color-a);
            }

            :host([type="warning"]) {
                --accent-color-h: var(--alert-warning-accent-h);
                --accent-color-s: var(--alert-warning-accent-s);
                --accent-color-l: var(--alert-warning-accent-l);
                --accent-color-a: var(--alert-warning-accent-a);

                --background-color-h: var(--alert-warning-color-h);
                --background-color-s: var(--alert-warning-color-s);
                --background-color-l: var(--alert-warning-color-l);
                --background-color-a: var(--alert-warning-color-a);
            }

            :host([type="error"]) {
                --accent-color-h: var(--alert-error-accent-h);
                --accent-color-s: var(--alert-error-accent-s);
                --accent-color-l: var(--alert-error-accent-l);
                --accent-color-a: var(--alert-error-accent-a);

                --background-color-h: var(--alert-error-color-h);
                --background-color-s: var(--alert-error-color-s);
                --background-color-l: var(--alert-error-color-l);
                --background-color-a: var(--alert-error-color-a);
            }
        `,
    ];
}

declare global {
    interface HTMLElementTagNameMap {
        "ds-alert": Alert;
    }
}
