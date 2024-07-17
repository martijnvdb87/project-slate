import { LitElement, css, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { config } from "@/lib/config";
import { mainCss, varSize } from "../util/style";
import { renderIcon } from "../util/icons";
import { getRandomId } from "../util/general";
import { Ref, createRef, ref } from "lit/directives/ref.js";

@customElement(`${config.prefix}-checkbox`)
export class Input extends LitElement {
    public root: Ref<HTMLInputElement> = createRef();
    public input: Ref<HTMLInputElement> = createRef();

    @property({ type: String })
    protected name = null;

    @property({ type: Boolean })
    protected checked = false;

    @state()
    protected originalChecked = false;

    @property({ type: String })
    protected icon = "check";

    @property({ type: Boolean })
    protected disabled = false;

    @state()
    protected elementId = "";

    @state()
    protected internals;

    protected static formAssociated = true;

    public constructor() {
        super();

        this.originalChecked = this.getAttribute("checked") !== null;

        this.internals = this.attachInternals();
        this.internals.setFormValue(this.checked ? "on" : "off");

        this.elementId = getRandomId();
    }

    public formResetCallback() {
        this.checked = this.originalChecked;
        this.internals.setFormValue(this.checked ? "on" : "off");
    }

    protected render() {
        return html`
            <div ${ref(this.root)} part="main">
                <div part="checkbox-container">
                    <input
                        ${ref(this.input)}
                        type="checkbox"
                        part="input"
                        id="${this.elementId}"
                        name="${this.name}"
                        .checked="${this.checked}"
                        ?disabled="${this.disabled}"
                        @input="${this.handleInput}"
                    />
                    <div part="input-container">${renderIcon(this.icon)}</div>
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
        const target = e.target as HTMLInputElement;
        this.checked = target.checked;
        this.internals.setFormValue(this.checked ? "on" : "off");
    }

    public static styles = [
        mainCss,
        css`
            :host {
                display: flex;
                vertical-align: bottom;

                --field-size: var(--base-size-rem);
                --box-size: ${varSize("checkbox-size")};

                --border-radius: ${varSize("checkbox-border-radius")};
                --border-width: ${varSize("checkbox-border-width")};

                --border-color-h: var(--form-field-border-color-h);
                --border-color-s: var(--form-field-border-color-s);
                --border-color-l: var(--form-field-border-color-l);
                --border-color-a: var(--form-field-border-color-a);

                --background-color-h: var(--form-field-background-color-h);
                --background-color-s: var(--form-field-background-color-s);
                --background-color-l: var(--form-field-background-color-l);
                --background-color-a: var(--form-field-background-color-a);

                --icon-color-h: var(--form-field-checkbox-icon-color-h);
                --icon-color-s: var(--form-field-checkbox-icon-color-s);
                --icon-color-l: var(--form-field-checkbox-icon-color-l);
                --icon-color-a: var(--form-field-checkbox-icon-color-a);

                --icon-color: hsla(
                    var(--icon-color-h),
                    var(--icon-color-s),
                    var(--icon-color-l),
                    var(--icon-color-a)
                );

                --icon-size: ${varSize("checkbox-icon-size")};

                --gap: ${varSize("checkbox-gap")};

                --font-size: var(--font-size-medium);

                --outline-color-h: var(--primary-color-h);
                --outline-color-s: var(--primary-color-s);
                --outline-color-l: var(--primary-color-l);
                --outline-color-a: 0;
            }

            [part="main"] {
                position: relative;
                display: flex;
                gap: var(--gap);
                font-family: var(--global-font-family);
                font-size: var(--font-size);
                line-height: var(--text-line-height);
            }

            [part="checkbox-container"] {
                position: relative;
                display: flex;
                justify-content: center;
                align-items: center;
                width: var(--field-size);
                height: var(--field-size);
                flex-shrink: 0;
                flex-grow: 0;
            }

            [part="input"] {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                opacity: 0;
                z-index: 999;
                cursor: pointer;
            }

            [part="input"]:focus-visible + [part="input-container"] {
                --outline-color-a: 1;
            }

            [part="icon-container"] {
                display: flex;
                opacity: 0;
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

            [part="input"]:checked
                + [part="input-container"]
                [part="icon-container"] {
                opacity: 1;
            }

            [part="input-container"] {
                display: flex;
                align-items: center;
                justify-content: center;
                pointer-events: none;
                width: var(--box-size);
                height: var(--box-size);

                border-radius: var(--border-radius);
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

                outline-width: var(--outline-width-rem);
                outline-offset: calc(
                    0px - var(--border-width) +
                        ${varSize("checkbox-outline-offset")}
                );
                outline-style: solid;
                outline-color: hsla(
                    var(--outline-color-h),
                    var(--outline-color-s),
                    var(--outline-color-l),
                    var(--outline-color-a)
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
                display: flex;
                align-items: center;
                justify-content: center;
                width: 100%;
                height: 100%;
                max-width: 100%;
                max-height: 100%;
                pointer-events: none;
                overflow: hidden;
            }

            [part="label-container"] {
                display: flex;
                flex-direction: column;
                justify-content: center;
                color: hsla(
                    var(--form-field-label-color-h),
                    var(--form-field-label-color-s),
                    var(--form-field-label-color-l),
                    var(--form-field-label-color-a)
                );
                padding: calc(
                        (var(--base-size-rem) - ${varSize("checkbox-size")}) / 2
                    )
                    0;
            }

            [part="label"] {
                display: inline-flex;
                cursor: pointer;
                margin-bottom: ${varSize("checkbox-label-margin-bottom")};
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
            }

            :host([size="large"]) {
                --font-size: var(--font-size-large);
            }

            :host([size="huge"]) {
                --font-size: var(--font-size-huge);
            }

            :host([shape="square"]) {
                --border-radius: 0;
            }

            :host([shape="pill"]) {
                --border-radius: var(--shape-pill-radius);
            }

            :host([shape="circle"]) {
                --border-radius: 50%;
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
        "ds-checkbox": Input;
    }
}
