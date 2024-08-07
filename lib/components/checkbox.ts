import { LitElement, css, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { config } from "@/lib/config";
import {
    mainCss,
    varPercent,
    varPercentContrast,
    varSize,
} from "../util/style";
import { renderIcon } from "../util/icons";
import { getRandomId } from "../util/general";
import { Ref, createRef, ref } from "lit/directives/ref.js";
import { formToggle } from "../styles/formToggle";

@customElement(`${config.prefix}-checkbox`)
export class Checkbox extends LitElement {
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
                            ${renderIcon(this.icon)}
                        </div>
                    </div>
                    <div part="text-container">
                        <div part="label-container">
                            <label for="${this.elementId}" part="label"
                                ><slot></slot
                            ></label>
                        </div>
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
                --icon-color-h: var(--primary-color-h);
                --icon-color-s: ${varPercent("primary-color-s")};
                --icon-color-l: ${varPercentContrast(
                    "primary-color-l",
                    "primary-color-c"
                )};
                --icon-color-a: var(--primary-color-a);

                --icon-color: hsla(
                    var(--icon-color-h),
                    var(--icon-color-s),
                    var(--icon-color-l),
                    var(--icon-color-a)
                );

                --icon-size: ${varSize("checkbox-icon-size")};
            }

            [part="icon-container"] {
                display: flex;
                opacity: 0;
            }

            [part="input"]:checked + [part="card"] {
                --background-color-h: var(--primary-color-h);
                --background-color-s: var(--primary-color-s);
                --background-color-l: var(--primary-color-l);
                --background-color-a: var(--primary-color-a);

                --border-color-h: var(--primary-color-h);
                --border-color-s: var(--primary-color-s);
                --border-color-l: var(--primary-color-l);
                --border-color-a: var(--primary-color-a);
            }

            [part="input"]:checked + [part="card"] [part="icon-container"] {
                opacity: 1;
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
        `,
    ];
}

declare global {
    interface HTMLElementTagNameMap {
        "ds-checkbox": Checkbox;
    }
}
