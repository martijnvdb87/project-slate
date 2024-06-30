import { LitElement, css, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { config } from "@/lib/config";
import { mainCss, size } from "../util/style";
import { renderIcon } from "../util/icons";
import { getRandomId } from "../util/general";
import { Ref, createRef, ref } from "lit/directives/ref.js";

@customElement(`${config.prefix}-input`)
export class Input extends LitElement {
    public root: Ref<HTMLInputElement> = createRef();
    public input: Ref<HTMLInputElement> = createRef();

    @property({ type: String })
    protected name = null;

    @property({ type: String })
    protected type = "text";

    @state()
    protected showPassword = false;

    @property({ type: String })
    protected value = "";

    @state()
    protected originalValue = "";

    @property({ type: String })
    protected placeholder: string | null = null;

    @property({ type: String })
    protected label: string | null = null;

    @property({ type: String })
    protected icon: string | null = null;

    @property({ attribute: "icon-right", type: String })
    protected iconRight: string | null = null;

    @property({ type: String })
    protected success: string | null = null;

    @property({ type: String })
    protected error: string | null = null;

    @property({ attribute: "show-validation-icon", type: Boolean })
    protected showValidationIcon = false;

    @property({ type: Boolean })
    protected readonly = false;

    @property({ type: Boolean })
    protected disabled = false;

    @property({ type: Boolean })
    protected required = false;

    @property({ type: Boolean, attribute: "autofocus" })
    protected inputAutofocus = false;

    @property({ type: Number, attribute: "maxlength" })
    protected maxLength = null;

    @property({ type: Number })
    protected min = null;

    @property({ type: Number })
    protected max = null;

    @property({ type: Number })
    protected step = null;

    @state()
    protected elementId = "";

    @state()
    protected internals;

    protected static formAssociated = true;

    public constructor() {
        super();

        this.originalValue = this.getAttribute("value") ?? "";

        this.internals = this.attachInternals();
        this.internals.setFormValue(this.value);

        this.elementId = getRandomId();
    }

    public formResetCallback() {
        this.value = this.originalValue;
        this.internals.setFormValue(this.value);
    }

    protected render() {
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
            <div ${ref(this.root)} part="main" class="${mainClasses.join(" ")}">
                <label
                    ?hidden="${this.label === null}"
                    part="label"
                    for="${this.elementId}"
                    >${this.label}</label
                >
                <div part="input-container">
                    <div part="input-inner-container">
                        ${renderIcon(this.icon, "icon-left")}
                        <input
                            ${ref(this.input)}
                            id="${this.elementId}"
                            name="${this.name}"
                            part="input"
                            type="${inputType}"
                            placeholder="${this.placeholder}"
                            .value="${this.value}"
                            ?readonly="${this.readonly}"
                            ?disabled="${this.disabled}"
                            ?required="${this.required}"
                            ?autofocus="${this.inputAutofocus}"
                            maxlength="${this.maxLength}"
                            min="${this.min}"
                            max="${this.max}"
                            step="${this.step}"
                            @input="${this.handleInput}"
                        />
                        ${renderIcon(this.iconRight, "icon-right")}
                        ${this.validationIcon()}
                    </div>
                    ${this.passwordIcon()}
                </div>
                <div
                    part="validation-message"
                    ?hidden="${!(this.error !== null || this.success !== null)}"
                >
                    ${this.error || this.success || html`&nbsp;`}
                </div>
            </div>
        `;
    }

    protected handleInput(e: Event) {
        const target = e.target as HTMLInputElement;
        this.value = target.value;
        this.internals.setFormValue(this.value);
    }

    protected passwordIcon() {
        if (this.type !== "password") {
            return;
        }

        return html`<div class="button-show-password">
            <button
                @click="${() => {
                    this.showPassword = !this.showPassword;
                }}"
            >
                ${renderIcon(
                    this.showPassword ? "hide" : "show",
                    "icon-show-password"
                )}
            </button>
        </div>`;
    }

    protected validationIcon() {
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

    public static styles = [
        mainCss,
        css`
            :host {
                display: var(--display);
                vertical-align: bottom;

                --display: inline-flex;
                --height: ${size(36)};
                --gap: ${size(6)};
                --icon-size: ${size(16)};
                --icon-container-size: calc(
                    var(--height) - var(--border-width) * 2
                );
                --font-size: var(--font-size-medium);
                --font-weight: var(--input-font-weight);

                --sub-height: ${size(20)};

                --text-color-h: var(--input-text-color-h);
                --text-color-s: var(--input-text-color-s);
                --text-color-l: var(--input-text-color-l);
                --text-color-a: var(--input-text-color-a);

                --placeholder-color-h: var(--input-placeholder-color-h);
                --placeholder-color-s: var(--input-placeholder-color-s);
                --placeholder-color-l: var(--input-placeholder-color-l);
                --placeholder-color-a: var(--input-placeholder-color-a);
                --placeholder-weight: var(--input-placeholder-weight);

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

                --input-padding-x: ${size(12)};

                --background-color-h: var(--input-background-color-h);
                --background-color-s: var(--input-background-color-s);
                --background-color-l: var(--input-background-color-l);
                --background-color-a: var(--input-background-color-a);

                --element-border-radius: var(--border-radius);
                --border-width: var(--input-border-width);
                --border-color-h: var(--input-border-color-h);
                --border-color-s: var(--input-border-color-s);
                --border-color-l: var(--input-border-color-l);
                --border-color-a: var(--input-border-color-a);

                --outline-width: var(--input-outline-width);

                --validation-font-size: ${size(12)};
            }

            input {
                display: flex;
                flex-grow: 1;
                align-items: center;
                justify-content: center;
                vertical-align: middle;
                height: calc(var(--height) - var(--border-width) * 2);
                width: 100%;
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
                flex-grow: 1;
            }

            [part="label"] {
                display: inline-block;
                padding-bottom: ${size(8)};
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
                padding-top: ${size(6)};
                font-size: var(--validation-font-size);
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
                border-radius: var(--element-border-radius);
                border-width: var(--border-width);
                border-style: solid;
                border-color: hsla(
                    var(--validation-border-color-h, var(--border-color-h)),
                    var(--validation-border-color-s, var(--border-color-s)),
                    var(--validation-border-color-l, var(--border-color-l)),
                    var(--validation-border-color-a, var(--border-color-a))
                );
                outline: 0 solid
                    hsla(
                        var(
                            --validation-border-color-h,
                            var(--primary-color-h)
                        ),
                        var(
                            --validation-border-color-s,
                            var(--primary-color-s)
                        ),
                        var(
                            --validation-border-color-l,
                            var(--primary-color-l)
                        ),
                        0
                    );
                box-shadow: var(--box-shadow);
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
                outline: var(--input-outline-width) solid
                    hsla(
                        var(
                            --validation-border-color-h,
                            var(--primary-color-h)
                        ),
                        var(
                            --validation-border-color-s,
                            var(--primary-color-s)
                        ),
                        var(
                            --validation-border-color-l,
                            var(--primary-color-l)
                        ),
                        var(--input-outline-opacity)
                    );
            }

            .button-show-password {
                display: flex;
                align-items: center;
                justify-content: center;
                width: var(--icon-container-size);
                height: var(--icon-container-size);
            }

            .button-show-password button {
                display: flex;
                align-items: center;
                justify-content: center;
                width: var(--sub-height);
                height: var(--sub-height);
                background: transparent;
                border-radius: var(--element-border-radius);
                border-radius: 999rem;
                border: none;
                cursor: pointer;
            }

            .button-show-password button:focus-visible {
                border-color: hsl(
                    var(--validation-border-color-h, var(--primary-color-h)),
                    var(--validation-border-color-s, var(--primary-color-s)),
                    var(--validation-border-color-l, var(--primary-color-l))
                );
                outline: calc(var(--input-outline-width) + var(--outline-width))
                    solid
                    hsla(
                        var(
                            --validation-border-color-h,
                            var(--primary-color-h)
                        ),
                        var(
                            --validation-border-color-s,
                            var(--primary-color-s)
                        ),
                        var(
                            --validation-border-color-l,
                            var(--primary-color-l)
                        ),
                        var(--input-outline-opacity)
                    );
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

            :host([size="small"]) {
                --height: ${size(28)};
                --icon-size: ${size(12)};
                --input-padding-x: ${size(10)};
                --gap: ${size(4)};
                --font-size: var(--font-size-small);
                --validation-font-size: ${size(11)};
                --sub-height: ${size(16)};
            }

            :host([size="large"]) {
                --height: ${size(44)};
                --icon-size: ${size(18)};
                --input-padding-x: ${size(14)};
                --gap: ${size(8)};
                --font-size: var(--font-size-large);
                --validation-font-size: ${size(14)};
                --sub-height: ${size(24)};
            }

            :host([size="huge"]) {
                --height: ${size(52)};
                --icon-size: ${size(24)};
                --input-padding-x: ${size(16)};
                --gap: ${size(10)};
                --font-size: var(--font-size-huge);
                --validation-font-size: ${size(16)};
                --sub-height: ${size(28)};
            }

            :host([width="full"]) {
                --display: flex;
            }

            :host([shape="square"]) {
                --element-border-radius: 0;
            }

            :host([shape="pill"]) {
                --element-border-radius: var(--shape-pill-radius);
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
        `,
    ];
}

declare global {
    interface HTMLElementTagNameMap {
        "ds-input": Input;
    }
}
