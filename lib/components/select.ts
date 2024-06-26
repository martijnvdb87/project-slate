import { LitElement, css, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { config } from "@/lib/config";
import { mainCss, size } from "../util/style";
import { getRandomId } from "../util/general";
import { Ref, createRef, ref } from "lit/directives/ref.js";
import { renderIcon } from "../util/icons";

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
        css`
            :host {
                display: var(--display);
                vertical-align: bottom;

                --display: inline-flex;
                --height: ${size(36)};
                --icon-color: hsl(
                    var(--default-accent-h),
                    var(--default-accent-s),
                    var(--default-accent-l)
                );
                --icon-size: ${size(16)};
                --gap: ${size(6)};
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

                --label-font-weight: var(--input-label-font-weight);
                --label-font-size: var(--input-label-font-size);

                --label-color-h: var(--input-label-color-h);
                --label-color-s: var(--input-label-color-s);
                --label-color-l: var(--input-label-color-l);
                --label-color-a: var(--input-label-color-a);

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

                --focus-outline-width: var(--input-focus-outline-width);
            }

            select {
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
                box-shadow: var(--box-shadow);
            }

            [part="value-container"] {
                position: absolute;
                display: flex;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                border-radius: var(--element-border-radius);
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
                padding: 0 var(--input-padding-x);
                font-family: var(--font-family);
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
                height: calc(var(--height) - var(--border-width) * 2);
                width: calc(var(--height) - var(--border-width) * 2);
            }

            [part="input-container"]:focus-within {
                border-color: hsl(
                    var(--primary-color-h),
                    var(--primary-color-s),
                    var(--primary-color-l)
                );
                outline: var(--input-outline-width) solid
                    hsla(
                        var(--primary-color-h),
                        var(--primary-color-s),
                        var(--primary-color-l),
                        var(--input-outline-opacity)
                    );
            }

            :host([size="small"]) {
                --height: ${size(28)};
                --icon-size: ${size(12)};
                --input-padding-x: ${size(10)};
                --gap: ${size(4)};
                --font-size: var(--font-size-small);
            }

            :host([size="large"]) {
                --height: ${size(44)};
                --icon-size: ${size(18)};
                --input-padding-x: ${size(14)};
                --gap: ${size(8)};
                --font-size: var(--font-size-large);
            }

            :host([size="huge"]) {
                --height: ${size(52)};
                --icon-size: ${size(24)};
                --input-padding-x: ${size(16)};
                --gap: ${size(10)};
                --font-size: var(--font-size-huge);
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

            :host([disabled]) select,
            :host([disabled]) [part="handle"] {
                opacity: 0;
            }

            [part="icon"] {
                display: flex;
                align-items: center;
                justify-content: center;
                width: var(--icon-size);
                height: var(--icon-size);
                pointer-events: none;
            }
        `,
    ];
}

declare global {
    interface HTMLElementTagNameMap {
        "ds-select": Select;
    }
}
