import { LitElement, css, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { config } from "@/lib/config";
import { mainCss, size } from "../util/style";
import { getRandomId } from "../util/general";
import { Ref, createRef, ref } from "lit/directives/ref.js";

@customElement(`${config.prefix}-radio`)
export class Radio extends LitElement {
    public root: Ref<HTMLInputElement> = createRef();
    public input: Ref<HTMLInputElement> = createRef();

    @property({ type: String })
    protected name = "";

    @property({ type: String })
    protected value = "";

    @property({ type: Boolean })
    protected checked = false;

    @state()
    protected originalChecked = false;

    @property({ type: Boolean })
    protected disabled = false;

    @state()
    protected elementId = "";

    @state()
    protected internals;

    protected static formAssociated = true;

    public constructor() {
        super();

        this.originalChecked = Boolean(this.getAttribute("checked"));

        this.internals = this.attachInternals();

        if (this.originalChecked) {
            this.internals.setFormValue(this.value);
        }

        this.elementId = getRandomId();
    }

    public formResetCallback() {
        this.checked = this.originalChecked;
        this.internals.setFormValue(this.value);
    }

    public formDisabledCallback(disabled: boolean) {
        this.disabled = disabled;
    }

    public formAssociatedCallback() {
        this.internals.setFormValue(this.checked ? this.value : "");
    }

    protected render() {
        return html`
            <div ${ref(this.root)} part="main">
                <div part="radio-container">
                    <input
                        ${ref(this.input)}
                        type="radio"
                        part="input"
                        id="${this.elementId}"
                        name="${this.name}"
                        value="${this.value}"
                        .checked="${this.checked}"
                        ?disabled="${this.disabled}"
                        @input="${this.handleInput}"
                    />
                    <div part="input-container"></div>
                </div>
                <div part="label-container">
                    <label for="${this.elementId}" part="label"
                        ><slot></slot
                    ></label>
                    <slot name="description"></slot>
                </div>
            </div>
        `;
    }

    protected handleInput(e: Event) {
        for (const radio of this.internals.form?.[this.name]) {
            radio.checked = radio.value === this.value;

            radio.internals.setFormValue(radio === this ? this.value : null);
        }
    }

    public static styles = [
        mainCss,
        css`
            :host {
                display: flex;
                vertical-align: bottom;
                margin-bottom: var(--margin-bottom);

                --margin-bottom: var(--element-margin-bottom);

                --element-border-radius: var(--border-radius);
                --border-width: var(--input-border-width);
                --border-color-h: var(--input-border-color-h);
                --border-color-s: var(--input-border-color-s);
                --border-color-l: var(--input-border-color-l);
                --border-color-a: var(--input-border-color-a);

                --background-color-h: var(--input-background-color-h);
                --background-color-s: var(--input-background-color-s);
                --background-color-l: var(--input-background-color-l);
                --background-color-a: var(--input-background-color-a);

                --gap: ${size(16)};

                --font-size: var(--font-size-medium);

                --radio-size: ${size(20)};
                --radio-inner-size: ${size(8)};
            }

            [part="main"] {
                position: relative;
                display: flex;
                gap: var(--gap);
                font-family: var(--font-family);
                font-size: var(--font-size);
                line-height: var(--text-line-height);
            }

            [part="radio-container"] {
                position: relative;
            }

            [part="input"] {
                position: absolute;
                top: 0;
                left: 0;
                width: var(--radio-size);
                height: var(--radio-size);
                opacity: 0;
                z-index: 999;
                cursor: pointer;
            }

            [part="input"]:focus-visible + [part="input-container"] {
                border-color: hsl(
                    var(--primary-color-h),
                    var(--primary-color-s),
                    var(--primary-color-l)
                );
                outline: calc(
                        var(--input-outline-width) + var(--input-border-width)
                    )
                    solid
                    hsla(
                        var(--primary-color-h),
                        var(--primary-color-s),
                        var(--primary-color-l),
                        var(--input-outline-opacity)
                    );
            }

            [part="input"]:checked + [part="input-container"] {
                --background-color-h: var(--primary-color-h);
                --background-color-s: var(--primary-color-s);
                --background-color-l: var(--primary-color-l);
                --background-color-a: var(--primary-color-a);

                --border-color-h: var(--primary-color-h);
                --border-color-s: var(--primary-color-s);
                --border-color-l: var(--primary-color-l);
                --border-color-a: var(--primary-color-a);
            }

            [part="input-container"] {
                display: flex;
                align-items: center;
                justify-content: center;
                pointer-events: none;
                width: var(--radio-size);
                height: var(--radio-size);

                border-radius: 999rem;
                border-width: var(--border-width);
                border-style: solid;
                border-color: hsla(
                    var(--border-color-h),
                    var(--border-color-s),
                    var(--border-color-l),
                    var(--border-color-a)
                );

                background-color: hsla(
                    var(--background-color-h),
                    var(--background-color-s),
                    var(--background-color-l),
                    var(--background-color-a)
                );
                outline: 0 solid
                    hsla(
                        var(--primary-color-h),
                        var(--primary-color-s),
                        var(--primary-color-l),
                        0
                    );
                outline-offset: ${size(2)};
            }

            [part="input-container"]::after {
                content: "";
                display: block;
                width: var(--radio-inner-size);
                height: var(--radio-inner-size);
                border-radius: 999rem;
                background-color: hsla(
                    var(--input-background-color-h),
                    var(--input-background-color-s),
                    var(--input-background-color-l),
                    var(--input-background-color-a)
                );
                opacity: 0;
            }

            [part="input"]:checked + [part="input-container"]::after {
                opacity: 1;
            }

            [part="label-container"] {
                display: block;
                color: hsla(
                    var(--input-label-color-h),
                    var(--input-label-color-s),
                    var(--input-label-color-l),
                    var(--input-label-color-a)
                );
            }

            [part="label"] {
                display: inline-flex;
                cursor: pointer;
            }

            slot:not([name]) {
                font-weight: var(--form-label-font-weight);
                font-size: var(--form-label-font-size);
            }

            ::slotted([slot="description"]) {
                color: hsla(
                    var(--text-color-h),
                    var(--text-color-s),
                    var(--text-color-l),
                    var(--text-color-a)
                );
                margin-bottom: var(--margin-bottom);
            }

            :host([size="small"]) {
                --font-size: var(--font-size-small);
                --radio-size: ${size(16)};
                --radio-inner-size: ${size(6)};
            }

            :host([size="large"]) {
                --font-size: var(--font-size-large);
                --radio-size: ${size(24)};
                --radio-inner-size: ${size(10)};
            }

            :host([size="huge"]) {
                --font-size: var(--font-size-huge);
                --radio-size: ${size(28)};
                --radio-inner-size: ${size(12)};
            }

            :host([disabled]) {
                opacity: 0.75;
                pointer-events: none;
            }
        `,
    ];
}

declare global {
    interface HTMLElementTagNameMap {
        "ds-radio": Radio;
    }
}
