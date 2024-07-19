import { LitElement, css, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { config } from "@/lib/config";
import { mainCss, sizer, varSize } from "../util/style";
import { renderIcon } from "../util/icons";
import { getRandomId } from "../util/general";
import { Ref, createRef, ref } from "lit/directives/ref.js";
import { formInput } from "../styles/formInput";

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
                <div part="form-field-container">
                    <div part="form-field-inner-container">
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
        formInput,
        css`
            :host {
                --padding-left: ${varSize("form-field-padding-x")};
                --padding-right: ${varSize("form-field-padding-x")};
            }

            input {
                display: flex;
                flex-grow: 1;
                align-items: center;
                justify-content: center;
                vertical-align: middle;
                height: var(--field-size);
                width: 100%;
                padding: 0 var(--padding-right) 0 var(--padding-left);
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

            [part="form-field-container"] {
                position: relative;
                display: flex;
                align-items: center;
                height: var(--field-size);
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

                outline-width: var(--outline-width-rem);
                outline-offset: calc(0px - var(--border-width));
                outline-style: solid;
                outline-color: hsla(
                    var(--outline-color-h),
                    var(--outline-color-s),
                    var(--outline-color-l),
                    var(--outline-color-a)
                );
            }

            [part="form-field-inner-container"] {
                position: relative;
                display: flex;
                flex-grow: 1;
                align-items: center;
            }

            [part="form-field-container"]:focus-within {
                --outline-color-h: var(
                    --validation-border-color-h,
                    var(--primary-color-h)
                );
                --outline-color-s: var(
                    --validation-border-color-s,
                    var(--primary-color-s)
                );
                --outline-color-l: var(
                    --validation-border-color-l,
                    var(--primary-color-l)
                );
                --outline-color-a: 1;
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
                width: calc(
                    var(--field-size) -
                        (${varSize("form-field-border-width")} * 2) -
                        ${sizer(8)}
                );
                height: calc(
                    var(--field-size) -
                        (${varSize("form-field-border-width")} * 2) -
                        ${sizer(8)}
                );
                background: transparent;
                border-radius: 999rem;
                border: none;
                cursor: pointer;
            }

            .button-show-password button:focus-visible {
                --outline-color-h: var(
                    --validation-border-color-h,
                    var(--primary-color-h)
                );
                --outline-color-s: var(
                    --validation-border-color-s,
                    var(--primary-color-s)
                );
                --outline-color-l: var(
                    --validation-border-color-l,
                    var(--primary-color-l)
                );
                --outline-color-a: 1;
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

            .has-icon-left {
                --padding-left: var(--icon-container-size);
            }

            .has-icon-right,
            :host([show-validation-icon]) {
                --padding-right: calc(var(--icon-container-size) * 2);
            }

            .has-icon-right .icon-validation {
                right: var(--icon-container-size);
            }

            :host([show-validation-icon]) .has-icon-right {
                --padding-right: calc(
                    ${varSize("form-field-padding-x")} +
                        var(--icon-container-size) * 2
                );
            }
        `,
    ];
}

declare global {
    interface HTMLElementTagNameMap {
        "ds-input": Input;
    }
}
