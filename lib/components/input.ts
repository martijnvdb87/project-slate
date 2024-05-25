import { LitElement, css, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { config } from "@/lib/config";
import "@/lib/css/fonts.css";
import { mainCss } from "../util/style";
import { renderIcon } from "../util/icons";

@customElement(`${config.prefix}-input`)
export class Input extends LitElement {
    @property({ type: String })
    type = "text";

    @state()
    showPassword = false;

    @property({ type: String })
    value: string | null = null;

    @property({ type: String })
    placeholder: string | null = null;

    @property({ type: String })
    label: string | null = null;

    @property({ type: String })
    icon: string | null = null;

    @property({ attribute: "icon-right", type: String })
    iconRight: string | null = null;

    @property({ type: String })
    success: string | null = null;

    @property({ type: String })
    error: string | null = null;

    @property({ attribute: "show-validation-icon", type: Boolean })
    showValidationIcon = false;

    @property({ type: Boolean })
    disabled = false;

    render() {
        const mainClasses = [];

        if (this.icon) {
            mainClasses.push("has-icon-left");
        }

        if (this.iconRight) {
            mainClasses.push("has-icon-right");
        }

        const inputType = (() => {
            if (this.type === "password") {
                return this.showPassword ? "text" : this.type;
            }

            return this.type;
        })();

        return html`
            <div part="main" class="${mainClasses.join(" ")}">
                <label part="label" for="input">${this.label}</label>
                <div part="input-container">
                    <div part="input-inner-container">
                        ${renderIcon(this.icon, "icon-left")}
                        <input
                            id="input"
                            part="input"
                            type="${inputType}"
                            placeholder="${this.placeholder}"
                            value="${this.value}"
                            ?disabled="${this.disabled}"
                        />
                        ${renderIcon(this.iconRight, "icon-right")}
                        ${this.validationIcon()}
                    </div>
                    ${this.passwordIcon()}
                </div>
                <div part="validation-message" ?hidden="${!this.error}">
                    ${this.error}
                </div>
            </div>
        `;
    }

    static styles = css`
        ${mainCss()}

        :host {
            display: var(--display);
            vertical-align: bottom;

            --display: inline-flex;
            --height: var(--height-medium);
            --gap: var(--gap-medium);
            --icon-size: var(--icon-size-medium);
            --icon-container-size: calc(
                var(--height) - var(--border-width) * 2
            );
            --font-size: var(--font-size-medium);
            --font-weight: var(--input-font-weight);

            --text-color-h: var(--input-text-color-h);
            --text-color-s: var(--input-text-color-s);
            --text-color-l: var(--input-text-color-l);
            --text-color-a: var(--input-text-color-a);

            --placeholder-color-h: var(--input-placeholder-color-h);
            --placeholder-color-s: var(--input-placeholder-color-s);
            --placeholder-color-l: var(--input-placeholder-color-l);
            --placeholder-color-a: var(--input-placeholder-color-a);
            --placeholder-weight: var(--input-placeholder-weight);

            --label-padding: var(--input-label-padding);
            --label-font-weight: var(--input-label-font-weight);
            --label-font-size: var(--input-label-font-size);

            --label-color-h: var(--input-label-color-h);
            --label-color-s: var(--input-label-color-s);
            --label-color-l: var(--input-label-color-l);
            --label-color-a: var(--input-label-color-a);

            --icon-color: hsla(
                var(--input-icon-color-h),
                var(--input-icon-color-s),
                var(--input-icon-color-l),
                var(--input-icon-color-a)
            );

            --input-padding-x: var(--input-padding-x-medium);

            --background-color-h: var(--input-background-color-h);
            --background-color-s: var(--input-background-color-s);
            --background-color-l: var(--input-background-color-l);
            --background-color-a: var(--input-background-color-a);

            --border-radius: var(--element-border-radius);
            --border-width: var(--input-border-width);
            --border-color-h: var(--input-border-color-h);
            --border-color-s: var(--input-border-color-s);
            --border-color-l: var(--input-border-color-l);
            --border-color-a: var(--input-border-color-a);
        }

        input {
            display: flex;
            flex-grow: 1;
            align-items: center;
            justify-content: center;
            vertical-align: middle;
            height: calc(var(--height) - var(--border-width) * 2);
            padding: 0 var(--input-padding-x);
            background: transparent;
            font-family: var(--font-family);
            font-size: var(--font-size);
            font-weight: var(--font-weight);
            color: hsla(
                var(--text-color-h),
                var(--text-color-s),
                var(--text-color-l),
                var(--text-color-a)
            );
            border: none;
            outline: none;
        }

        input::placeholder {
            color: hsla(
                var(--placeholder-color-h),
                var(--placeholder-color-s),
                var(--placeholder-color-l),
                var(--placeholder-color-a)
            );
            font-weight: var(--placeholder-weight);
        }

        [part="main"] {
            position: relative;
            display: flex;
            flex-grow: 1;
            flex-direction: column;
        }

        [part="label"] {
            display: inline-block;
            padding: var(--label-padding);
            font-size: var(--label-font-size);
            font-weight: var(--label-font-weight);

            color: hsla(
                var(--label-color-h),
                var(--label-color-s),
                var(--label-color-l),
                var(--label-color-a)
            );
        }

        [part="validation-message"] {
            position: absolute;
            top: 100%;
            left: 0;
            padding: 0.25rem;
            font-size: 0.8125rem;
            color: hsl(
                var(--validation-border-color-h),
                var(--validation-border-color-s),
                var(--validation-border-color-l),
                var(--validation-border-color-a)
            );
        }

        [part="icon"] {
            display: flex;
            align-items: center;
            justify-content: center;
            width: var(--icon-size);
            height: var(--icon-size);
            pointer-events: none;
        }

        [part="icon-container"] {
            position: absolute;
            display: flex;
            align-items: center;
            justify-content: center;
            width: var(--icon-container-size);
            height: var(--icon-container-size);
            pointer-events: none;
        }

        [part="input-container"] {
            position: relative;
            display: flex;
            align-items: center;
            height: var(--height);
            background: hsla(
                var(--background-color-h),
                var(--background-color-s),
                var(--background-color-l),
                var(--background-color-a)
            );
            border-radius: var(--border-radius);
            border-width: var(--border-width);
            border-style: solid;
            border-color: hsla(
                var(--validation-border-color-h, var(--border-color-h)),
                var(--validation-border-color-s, var(--border-color-s)),
                var(--validation-border-color-l, var(--border-color-l)),
                var(--validation-border-color-a, var(--border-color-a))
            );
            outline: 0rem solid
                hsla(
                    var(--validation-border-color-h, var(--primary-color-h)),
                    var(--validation-border-color-s, var(--primary-color-s)),
                    var(--validation-border-color-l, var(--primary-color-l)),
                    0
                );
            transition: all 120ms ease-in-out;
        }

        [part="input-inner-container"] {
            position: relative;
            display: flex;
            flex-grow: 1;
            align-items: center;
        }

        [part="input-container"]:focus-within {
            border-color: hsl(
                var(--validation-border-color-h, var(--primary-color-h)),
                var(--validation-border-color-s, var(--primary-color-s)),
                var(--validation-border-color-l, var(--primary-color-l))
            );
            outline: 0.25rem solid
                hsla(
                    var(--validation-border-color-h, var(--primary-color-h)),
                    var(--validation-border-color-s, var(--primary-color-s)),
                    var(--validation-border-color-l, var(--primary-color-l)),
                    0.25
                );
        }

        .button-show-password {
            display: flex;
            align-items: center;
            justify-content: center;
            width: var(--icon-container-size);
            height: var(--icon-container-size);
            background: transparent;
            border: none;
            cursor: pointer;
        }

        .icon-container {
            position: absolute;
        }

        .icon-left {
            left: 0;
        }

        .icon-right,
        .icon-validation {
            right: 0;
        }

        .icon-validation-error,
        .icon-validation-success {
            --icon-color: hsla(
                var(--validation-icon-color-h),
                var(--validation-icon-color-s),
                var(--validation-icon-color-l),
                var(--validation-icon-color-a)
            );
        }

        .has-icon-left input {
            padding-left: var(--icon-container-size);
        }

        .has-icon-right input,
        :host([show-validation-icon]) input {
            padding-right: var(--icon-container-size);
        }

        .has-icon-right .icon-validation {
            right: var(--icon-container-size);
        }

        :host([show-validation-icon]) .has-icon-right input {
            padding-right: calc(var(--icon-container-size) * 2);
        }

        :host([size="tiny"]) {
            --height: var(--height-tiny);
            --icon-size: var(--icon-size-tiny);
            --input-padding-x: var(--input-padding-x-tiny);
            --gap: var(--gap-tiny);
            --font-size: var(--font-size-tiny);
        }

        :host([size="small"]) {
            --height: var(--height-small);
            --icon-size: var(--icon-size-small);
            --input-padding-x: var(--input-padding-x-small);
            --gap: var(--gap-small);
            --font-size: var(--font-size-small);
        }

        :host([size="large"]) {
            --height: var(--height-large);
            --icon-size: var(--icon-size-large);
            --input-padding-x: var(--input-padding-x-large);
            --gap: var(--gap-large);
            --font-size: var(--font-size-large);
        }

        :host([size="huge"]) {
            --height: var(--height-huge);
            --icon-size: var(--icon-size-huge);
            --input-padding-x: var(--input-padding-x-huge);
            --gap: var(--gap-huge);
            --font-size: var(--font-size-huge);
        }

        :host([width="full"]) {
            --display: flex;
        }

        :host([shape="square"]) {
            --border-radius: 0;
        }

        :host([shape="pill"]) {
            --border-radius: 999rem;
        }

        :host([disabled]) {
            opacity: 0.75;
            --text-color-a: 0.5;
            pointer-events: none;
        }

        :host([error]) {
            --validation-border-color-h: var(--error-color-h);
            --validation-border-color-s: var(--error-color-s);
            --validation-border-color-l: var(--error-color-l);
            --validation-border-color-a: var(--error-color-a);

            --validation-icon-color-h: var(--error-color-h);
            --validation-icon-color-s: var(--error-color-s);
            --validation-icon-color-l: var(--error-color-l);
            --validation-icon-color-a: var(--error-color-a);
        }

        :host([success]) {
            --validation-icon-color-h: var(--success-color-h);
            --validation-icon-color-s: var(--success-color-s);
            --validation-icon-color-l: var(--success-color-l);
            --validation-icon-color-a: var(--success-color-a);
        }
    `;

    passwordIcon() {
        if (this.type !== "password") {
            return;
        }

        return html`<button
            class="button-show-password"
            @click="${() => {
                this.showPassword = !this.showPassword;
            }}"
        >
            ${renderIcon(
                this.showPassword ? "hide" : "show",
                "icon-show-password"
            )}
        </button>`;
    }

    validationIcon() {
        if (!this.showValidationIcon) {
            return;
        }

        if (this.error !== null) {
            return renderIcon("error", [
                "icon-validation",
                "icon-validation-error",
            ]);
        }

        if (this.success !== null) {
            return renderIcon("check", [
                "icon-validation",
                "icon-validation-success",
            ]);
        }
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "ds-input": Input;
    }
}
