import { LitElement, css, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { config } from "@/lib/config";
import { mainCss, varSize } from "../util/style";
import { getRandomId } from "../util/general";
import { Ref, createRef, ref } from "lit/directives/ref.js";
import { renderIcon } from "../util/icons";
import { formField } from "../styles/formField";

@customElement(`${config.prefix}-select`)
export class Select extends LitElement {
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
        Array.from(this.querySelectorAll("option")).forEach((option) => {
            if (option.value === this.value) {
                option.setAttribute("selected", "selected");
            } else {
                option.removeAttribute("selected");
            }
        });

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
                        ${Array.from(
                            this.querySelectorAll("*:not([slot])")
                        ).map((child) => child.cloneNode(true))}
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
        const value = this.value;
        const options = Array.from(this.querySelectorAll("option"));
        return options.find((option) => option.value === value)?.textContent;
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
        formField,
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
                margin-bottom: ${varSize("form-label-margin-bottom")};
                font-size: var(--label-font-size);
                font-weight: var(--label-font-weight);

                color: hsla(
                    var(--label-color-h),
                    var(--label-color-s),
                    var(--label-color-l),
                    var(--label-color-a)
                );
            }

            [part="input-container"] {
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
                    var(--border-color-h),
                    var(--border-color-s),
                    var(--border-color-l),
                    var(--border-color-a)
                );
                outline: 0 solid
                    hsla(
                        var(--primary-color-h),
                        var(--primary-color-s),
                        var(--primary-color-l),
                        0
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
                    var(--background-color-s),
                    var(--background-color-l),
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
                    var(--text-color-s),
                    var(--text-color-l),
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
                border-color: hsl(
                    var(--primary-color-h),
                    var(--primary-color-s),
                    var(--primary-color-l)
                );
                outline: var(--form-field-outline-width) solid
                    hsla(
                        var(--primary-color-h),
                        var(--primary-color-s),
                        var(--primary-color-l),
                        var(--form-field-outline-opacity)
                    );
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
        "ds-select": Select;
    }
}
