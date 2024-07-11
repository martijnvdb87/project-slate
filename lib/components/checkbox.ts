import { LitElement, css, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { config } from "@/lib/config";
import { mainCss, size } from "../util/style";
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

                --icon-color-h: var(--input-checkbox-icon-color-h);
                --icon-color-s: var(--input-checkbox-icon-color-s);
                --icon-color-l: var(--input-checkbox-icon-color-l);
                --icon-color-a: var(--input-checkbox-icon-color-a);

                --icon-color: hsla(
                    var(--icon-color-h),
                    var(--icon-color-s),
                    var(--icon-color-l),
                    var(--icon-color-a)
                );

                --icon-size: 100%;

                --gap: ${size(16)};

                --font-size: var(--font-size-medium);

                --checkbox-size: ${size(20)};
            }

            [part="main"] {
                position: relative;
                display: flex;
                gap: var(--gap);
                font-family: var(--font-family);
                font-size: var(--font-size);
                line-height: var(--text-line-height);
            }

            [part="checkbox-container"] {
                position: relative;
            }

            [part="input"] {
                position: absolute;
                top: 0;
                left: 0;
                width: var(--checkbox-size);
                height: var(--checkbox-size);
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
                width: var(--checkbox-size);
                height: var(--checkbox-size);

                border-radius: var(--element-border-radius);
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

            [part="icon"] {
                display: flex;
                align-items: center;
                justify-content: center;
                width: var(--icon-size);
                height: var(--icon-size);
                max-width: 100%;
                max-height: 100%;
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
                font-weight: var(--input-label-font-weight);

                font-size: var(--input-label-font-size);
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
                --checkbox-size: ${size(16)};
            }

            :host([size="large"]) {
                --font-size: var(--font-size-large);
                --checkbox-size: ${size(24)};
            }

            :host([size="huge"]) {
                --font-size: var(--font-size-huge);
                --checkbox-size: ${size(28)};
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
