import { LitElement, css, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { config } from "@/lib/config";
import { mainCss } from "../util/style";
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
    protected value = null;

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
                                id="${this.elementId}"
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
                                    <label for="${this.elementId}" part="label"
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
        this.checked = target.checked;
        this.internals.setFormValue(this.checked ? "on" : "off");
    }

    public static styles = [
        mainCss,
        formToggle,
        css`
            :host {
                --border-radius: 999rem;
            }

            [part="main"] {
                position: relative;
                font-family: var(--global-font-family);
                font-size: var(--font-size);
                line-height: var(--text-line-height);
            }

            [part="card"] {
                display: flex;
                gap: var(--gap);
                border-width: var(--card-border-width);
                border-style: var(--card-border-style);
                border-radius: var(--card-border-radius);
                border-color: hsla(
                    var(--card-border-color-h),
                    var(--card-border-color-s),
                    var(--card-border-color-l),
                    var(--card-border-color-a)
                );
                border-color: hsla(
                    var(--card-border-color-h),
                    var(--card-border-color-s),
                    var(--card-border-color-l),
                    var(--card-border-color-a)
                );
                background-color: hsla(
                    var(--card-background-color-h),
                    var(--card-background-color-s),
                    var(--card-background-color-l),
                    var(--card-background-color-a)
                );
                padding: var(--card-padding-y) var(--card-padding-x);
                outline-width: var(--outline-width-rem);
                outline-offset: calc(0px - var(--card-border-width));
                outline-style: solid;
                outline-color: hsla(
                    var(--card-outline-color-h),
                    var(--card-outline-color-s),
                    var(--card-outline-color-l),
                    var(--card-outline-color-a)
                );
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
