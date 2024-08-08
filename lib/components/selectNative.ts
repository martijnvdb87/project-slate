import { LitElement, css, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { config } from "@/lib/config";
import { mainCss, varPercent } from "../util/style";
import { getOptions, getRandomId } from "../util/general";
import { Ref, createRef, ref } from "lit/directives/ref.js";
import { renderIcon } from "../util/icons";
import { formInput } from "../styles/formInput";

@customElement(`${config.prefix}-select-native`)
export class SelectNative extends LitElement {
    public root: Ref<HTMLInputElement> = createRef();
    public input: Ref<HTMLInputElement> = createRef();

    @property({ type: String })
    protected name = null;

    @property({ type: String })
    protected value = "";

    @state()
    protected originalValue = "";

    @property({ type: String })
    protected label: string | null = null;

    @property({ type: Boolean })
    protected disabled = false;

    @property({ type: Boolean })
    protected required = false;

    @property({ type: Boolean, attribute: "autofocus" })
    protected inputAutofocus = false;

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
        this.getDefaultValue();
    }

    public formResetCallback() {
        this.value = this.originalValue;
        this.internals.setFormValue(this.value);
    }

    protected render() {
        const options = getOptions(this);

        return html`
            <div ${ref(this.root)} part="main">
                <label
                    ?hidden="${this.label === null}"
                    part="label"
                    for="${this.elementId}"
                    >${this.label}</label
                >
                <div part="input-container">
                    <div part="value-container">
                        <div part="value">${this.getValueLabel()}</div>
                        <div part="handle">${renderIcon("chevron-down")}</div>
                    </div>
                    <select
                        ${ref(this.input)}
                        id="${this.elementId}"
                        name="${this.name}"
                        part="input"
                        .value="${this.value}"
                        ?disabled="${this.disabled}"
                        ?required="${this.required}"
                        ?autofocus="${this.inputAutofocus}"
                        @input="${this.handleInput}"
                    >
                        ${options.map((option) => {
                            return html`
                                <option
                                    value="${option.value}"
                                    ?selected="${this.value === option.value}"
                                >
                                    ${option.label.text}
                                </option>
                            `;
                        })}
                    </select>
                </div>
            </div>
        `;
    }

    protected handleInput(e: Event) {
        const target = e.target as HTMLInputElement;
        this.value = target.value;
        this.internals.setFormValue(this.value);
    }

    private getValueLabel() {
        const options = getOptions(this);
        const current = options.find((option) => option.value === this.value);

        return current?.label.text ?? options[0]?.label.text ?? "";
    }

    private getDefaultValue() {
        const defaultSlot = Array.from(this.querySelectorAll("*:not([slot])"));
        const temp = document.createElement("select");

        defaultSlot.forEach((child) => {
            temp.appendChild(child.cloneNode(true));
        });

        this.value = temp.value;
        this.internals.setFormValue(this.value);
    }

    public static styles = [
        mainCss,
        formInput,
        css`
            select {
                display: flex;
                flex-grow: 1;
                align-items: center;
                justify-content: center;
                vertical-align: middle;
                height: 100%;
                width: 100%;
                padding: 0 var(--padding-x);
                background: transparent;
                font-family: var(--font-family);
                font-size: var(--font-size);
                font-weight: var(--font-weight);
                color: hsla(
                    var(--text-color-h),
                    ${varPercent("text-color-s")},
                    ${varPercent("text-color-l")},
                    var(--text-color-a)
                );
                border: none;
                outline: none;
            }

            input::placeholder {
                color: hsla(
                    var(--placeholder-color-h),
                    ${varPercent("placeholder-color-s")},
                    ${varPercent("placeholder-color-l")},
                    var(--placeholder-color-a)
                );
                font-weight: var(--placeholder-weight);
            }

            [part="input-container"] {
                position: relative;
                display: flex;
                align-items: center;
                height: var(--field-size);
                background: hsla(
                    var(--background-color-h),
                    ${varPercent("background-color-s")},
                    ${varPercent("background-color-l")},
                    var(--background-color-a)
                );
                border-radius: var(--border-radius);
                border-width: var(--border-width);
                border-style: solid;
                border-color: hsla(
                    var(--border-color-h),
                    ${varPercent("border-color-s")},
                    ${varPercent("border-color-l")},
                    var(--border-color-a)
                );

                outline-width: var(--outline-width-rem);
                outline-offset: calc(0px - var(--border-width));
                outline-style: solid;
                outline-color: hsla(
                    var(--outline-color-h),
                    ${varPercent("outline-color-s")},
                    ${varPercent("outline-color-l")},
                    var(--outline-color-a)
                );
            }

            [part="value-container"] {
                position: absolute;
                display: flex;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                border-radius: var(--border-radius);
                background-color: hsla(
                    var(--background-color-h),
                    ${varPercent("background-color-s")},
                    ${varPercent("background-color-l")},
                    var(--background-color-a)
                );
                overflow: hidden;
            }

            [part="value"] {
                display: flex;
                flex-grow: 1;
                align-items: center;
                vertical-align: middle;
                padding: 0 var(--padding-x);
                font-family: var(--global-font-family);
                font-size: var(--font-size);
                font-weight: var(--font-weight);
                color: hsla(
                    var(--text-color-h),
                    ${varPercent("text-color-s")},
                    ${varPercent("text-color-l")},
                    var(--text-color-a)
                );
            }

            [part="handle"] {
                display: flex;
                align-items: center;
                justify-content: center;
                height: calc(var(--field-size) - var(--border-width) * 2);
                width: calc(var(--field-size) - var(--border-width) * 2);
            }

            [part="input-container"]:focus-within {
                --outline-color-a: 1;
            }

            :host([disabled]) select,
            :host([disabled]) [part="handle"] {
                opacity: 0;
            }
        `,
    ];
}

declare global {
    interface HTMLElementTagNameMap {
        "ds-select-native": SelectNative;
    }
}
