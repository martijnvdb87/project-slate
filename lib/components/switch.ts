import { LitElement, css, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { config } from "@/lib/config";
import { mainCss, size } from "../util/style";
import { getRandomId } from "../util/general";
import { Ref, createRef, ref } from "lit/directives/ref.js";
import { formToggle } from "../styles/formToggle";

@customElement(`${config.prefix}-switch`)
export class Switch extends LitElement {
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
                <div part="handle-container">
                    <div part="handle"></div>
                </div>
                <div part="text-container">
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
        formToggle,
        css`
            :host {
                display: flex;
                vertical-align: bottom;

                --element-border-radius: var(--border-radius);
                --border-width: var(--form-field-border-width);

                --background-color-h: var(--form-field-border-color-h);
                --background-color-s: var(--form-field-border-color-s);
                --background-color-l: var(--form-field-border-color-l);
                --background-color-a: var(--form-field-border-color-a);

                --gap: ${size(16)};

                --font-size: var(--font-size-medium);

                --handle-size: ${size(20)};
            }

            [part="handle-container"] {
                position: relative;
                flex-shrink: 0;
                display: flex;
                width: calc(
                    var(--handle-size) * 1.75 + var(--border-width) * 2
                );
                height: calc(var(--handle-size) + var(--border-width) * 2);
                border-radius: 999rem;

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
                transition: border-color 160ms ease, background-color 160ms ease;
            }

            [part="input"] {
                position: absolute;
                top: 0;
                left: 0;
                width: calc(var(--handle-size) * 1.75);
                height: var(--handle-size);
                opacity: 0;
                z-index: 999;
                cursor: pointer;
            }

            [part="input"]:focus-visible + [part="handle-container"] {
                outline: calc(
                        var(--form-field-outline-width) +
                            var(--form-field-border-width)
                    )
                    solid
                    hsla(
                        var(--primary-color-h),
                        var(--primary-color-s),
                        var(--primary-color-l),
                        var(--form-field-outline-opacity)
                    );
            }

            [part="icon-container"] {
                display: flex;
                opacity: 0;
            }

            [part="input"]:checked + [part="handle-container"] {
                --background-color-h: var(--primary-color-h);
                --background-color-s: var(--primary-color-s);
                --background-color-l: var(--primary-color-l);
                --background-color-a: var(--primary-color-a);
            }

            [part="input"]:checked + [part="handle-container"] [part="handle"] {
                left: calc(var(--handle-size) * 0.75 + var(--border-width));
            }

            [part="handle"] {
                position: absolute;
                top: calc(0px + var(--border-width));
                left: calc(0px + var(--border-width));
                display: flex;
                align-items: center;
                justify-content: center;
                pointer-events: none;
                width: var(--handle-size);
                height: var(--handle-size);
                transition: left 160ms ease;
            }

            [part="handle"]::before {
                content: "";
                display: block;
                width: calc(100% - var(--border-width) * 2);
                height: calc(100% - var(--border-width) * 2);
                border-radius: var(--element-border-radius);
                border-radius: 999rem;
                background-color: hsla(
                    var(--form-field-background-color-h),
                    var(--form-field-background-color-s),
                    var(--form-field-background-color-l),
                    var(--form-field-background-color-a)
                );
                transition: background-color 160ms ease;
            }

            [part="icon"] {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 100%;
                height: 100%;
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

            [part="text-container"] {
                display: block;
                color: hsla(
                    var(--form-field-label-color-h),
                    var(--form-field-label-color-s),
                    var(--form-field-label-color-l),
                    var(--form-field-label-color-a)
                );
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
                --handle-size: ${size(16)};
            }

            :host([size="large"]) {
                --font-size: var(--font-size-large);
                --handle-size: ${size(24)};
            }

            :host([size="huge"]) {
                --font-size: var(--font-size-huge);
                --handle-size: ${size(28)};
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
        "ds-switch": Switch;
    }
}
