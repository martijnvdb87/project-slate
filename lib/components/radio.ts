import { LitElement, css, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { config } from "@/lib/config";
import { mainCss, varSize } from "../util/style";
import { getOptions, getRandomId } from "../util/general";
import { Ref, createRef, ref } from "lit/directives/ref.js";
import { formToggle } from "../styles/formToggle";

@customElement(`${config.prefix}-radio`)
export class Radio extends LitElement {
    public root: Ref<HTMLInputElement> = createRef();
    public input: Ref<HTMLInputElement> = createRef();

    @property({ type: String })
    protected name = null;

    @property({ type: String })
    protected value = "";

    @property({ type: Boolean })
    protected checked = false;

    @state()
    protected originalValue = "";

    @property({ type: Boolean })
    protected disabled = false;

    @state()
    protected elementId = "";

    @state()
    protected internals;

    protected static formAssociated = true;

    public constructor() {
        super();

        this.value = this.getAttribute("value") ?? "";
        this.originalValue = this.value;

        this.internals = this.attachInternals();
        this.internals.setFormValue(this.value);

        this.elementId = getRandomId();
    }

    public formResetCallback() {
        this.value = this.originalValue;
        this.internals.setFormValue(this.value);
    }

    protected render() {
        const options = getOptions(this);

        return html`
            <div part="group">
                ${options.map((option) => {
                    return html`
                        <div ${ref(this.root)} part="main">
                            <input
                                ${ref(this.input)}
                                type="radio"
                                part="input"
                                id="${this.elementId}-${option.value}"
                                name="${this.name}"
                                .checked="${this.value === option.value}"
                                ?disabled="${this.disabled}"
                                @input="${this.handleInput}"
                                value="${option.value}"
                            />
                            <div ${ref(this.root)} part="card">
                                <div part="toggle-container">
                                    <div part="input-container"></div>
                                </div>
                                <div part="label-container">
                                    <label for="${this.elementId}-${
                        option.value
                    }" part="label"
                                        >${option.label.text}</label
                                    ></label>
                                    ${
                                        option.description
                                            ? html`${option.description.text}`
                                            : null
                                    }
                                </div>
                            </div>
                        </div>
                    `;
                })}
            </div>
        `;
    }

    protected handleInput(e: Event) {
        const target = e.target as HTMLInputElement;
        this.value = target.value;
        this.internals.setFormValue(this.value);
    }

    public static styles = [
        mainCss,
        formToggle,
        css`
            :host {
                --border-radius: 999rem;
            }

            [part="group"] {
                display: flex;
                flex-direction: var(--radio-card-direction);
                gap: ${varSize("radio-card-gap")};
            }

            [part="main"] {
                position: relative;
                font-family: var(--global-font-family);
                font-size: var(--font-size);
                line-height: var(--text-line-height);
            }

            [part="input-container"]::before {
                content: "";
                position: absolute;
                top: calc(-${varSize("radio-dot-size")} / 2);
                left: calc(-${varSize("radio-dot-size")} / 2);
                width: ${varSize("radio-dot-size")};
                height: ${varSize("radio-dot-size")};
                border-radius: var(--border-radius);
                background-color: white;
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

            :host([card]) [part="input"]:focus-visible + [part="card"] {
                --outline-color-a: 0;
                --card-outline-color-a: 1;
            }
        `,
    ];
}

declare global {
    interface HTMLElementTagNameMap {
        "ds-radio": Radio;
    }
}
