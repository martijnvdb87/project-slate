import { LitElement, css, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { config } from "@/lib/config";
import { mainCss, varSize } from "../util/style";
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
        const hasDescription = Boolean(
            Boolean(this.querySelector("[slot='description']"))
        );

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
                <div part="card">
                    <div part="toggle-container">
                        <div part="input-container">
                            <div part="handle"></div>
                        </div>
                    </div>
                    <div part="text-container">
                        <label for="${this.elementId}" part="label"
                            ><slot></slot
                        ></label>
                        ${hasDescription
                            ? html`<div part="description">
                                  <slot name="description"></slot>
                              </div>`
                            : null}
                    </div>
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

                --background-color-h: var(--form-field-border-color-h);
                --background-color-s: var(--form-field-border-color-s);
                --background-color-l: var(--form-field-border-color-l);
                --background-color-a: var(--form-field-border-color-a);

                --handle-color-h: var(--form-field-background-color-h);
                --handle-color-s: var(--form-field-background-color-s);
                --handle-color-l: var(--form-field-background-color-l);
                --handle-color-a: var(--form-field-background-color-a);

                --handle-size: ${varSize("switch-handle-size")};
            }

            [part="toggle-container"] {
                position: relative;
                flex-shrink: 0;
                display: flex;
                width: var(--field-size);
                height: var(--field-size);
            }

            [part="input-container"] {
                position: absolute;
                width: ${varSize("switch-size")};
                height: calc(
                    ${varSize("switch-handle-size")} +
                        ${varSize("switch-handle-offset")} * 2
                );
                border-radius: var(--element-border-radius);
                border-width: 0;
                border-radius: 999rem;

                background-color: hsla(
                    var(--background-color-h),
                    var(--background-color-s),
                    var(--background-color-l),
                    var(--background-color-a)
                );
                transition: background-color 160ms ease;
            }

            [part="handle"] {
                position: absolute;
                top: ${varSize("switch-handle-offset")};
                left: ${varSize("switch-handle-offset")};
                width: var(--handle-size);
                height: var(--handle-size);
                border-radius: 999rem;
                background-color: hsla(
                    var(--handle-color-h),
                    var(--handle-color-s),
                    var(--handle-color-l),
                    var(--handle-color-a)
                );
                transition: left 160ms ease;
            }

            [part="input"]:checked + [part="card"] {
                --background-color-h: var(--primary-color-h);
                --background-color-s: var(--primary-color-s);
                --background-color-l: var(--primary-color-l);
                --background-color-a: var(--primary-color-a);
            }

            [part="input"]:checked + [part="card"] [part="handle"] {
                left: calc(
                    ${varSize("switch-size")} - ${varSize("switch-handle-size")} -
                        ${varSize("switch-handle-offset")}
                );
            }
        `,
    ];
}

declare global {
    interface HTMLElementTagNameMap {
        "ds-switch": Switch;
    }
}
