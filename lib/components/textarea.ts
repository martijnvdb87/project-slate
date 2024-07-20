import { LitElement, css, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { config } from "@/lib/config";
import { mainCss } from "../util/style";
import { getRandomId } from "../util/general";
import { Ref, createRef, ref } from "lit/directives/ref.js";
import { formInput } from "../styles/formInput";

@customElement(`${config.prefix}-textarea`)
export class Textarea extends LitElement {
    public root: Ref<HTMLInputElement> = createRef();
    public input: Ref<HTMLInputElement> = createRef();

    @property({ type: Number })
    protected row = 3;

    @property({ type: String })
    protected name = null;

    @property({ type: String })
    protected type = "text";

    @property({ type: String })
    protected value = "";

    @state()
    protected originalValue = "";

    @property({ type: String })
    protected placeholder: string | null = null;

    @property({ type: String })
    protected label: string | null = null;

    @property({ type: String })
    protected success: string | null = null;

    @property({ type: String })
    protected error: string | null = null;

    @property({ type: Boolean })
    protected disabled = false;

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
    }

    public formResetCallback() {
        this.value = this.originalValue;
        this.internals.setFormValue(this.value);
    }

    protected render() {
        return html`
            <div ${ref(this.root)} part="main">
                <div part="label-container">
                    <label
                        ?hidden="${this.label === null}"
                        part="label"
                        for="${this.elementId}"
                        >${this.label}</label
                    >
                </div>
                <div part="input-container">
                    <div part="input-inner-container">
                        <textarea
                            ${ref(this.input)}
                            id="${this.elementId}"
                            name="${this.name}"
                            rows="${this.row}"
                            part="input"
                            type="${this.type}"
                            placeholder="${this.placeholder}"
                            .value="${this.value}"
                            ?disabled="${this.disabled}"
                            @input="${this.handleInput}"
                        ></textarea>
                    </div>
                </div>
                <div
                    part="validation-message"
                    ?hidden="${!(this.error !== null || this.success !== null)}"
                >
                    ${this.error || this.success || html`&nbsp;`}
                </div>
            </div>
        `;
    }

    protected handleInput(e: Event) {
        const target = e.target as HTMLInputElement;
        this.value = target.value;
        this.internals.setFormValue(this.value);

        target.style.height = "auto";
        const scrollHeight = target.scrollHeight;
        target.style.height = `${scrollHeight}px`;
    }

    public static styles = [
        mainCss,
        formInput,
        css`
            textarea {
                display: flex;
                flex-grow: 1;
                align-items: center;
                justify-content: center;
                vertical-align: middle;
                width: 100%;
                padding: var(--padding-y) var(--padding-x);
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

            textarea::placeholder {
                color: hsla(
                    var(--placeholder-color-h),
                    var(--placeholder-color-s),
                    var(--placeholder-color-l),
                    var(--placeholder-color-a)
                );
                font-weight: var(--placeholder-weight);
            }

            [part="input-container"] {
                position: relative;
                display: flex;
                align-items: center;
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
                    var(--validation-border-color-h, var(--border-color-h)),
                    var(--validation-border-color-s, var(--border-color-s)),
                    var(--validation-border-color-l, var(--border-color-l)),
                    var(--validation-border-color-a, var(--border-color-a))
                );

                outline-width: var(--outline-width-rem);
                outline-offset: calc(0px - var(--border-width));
                outline-style: solid;
                outline-color: hsla(
                    var(--outline-color-h),
                    var(--outline-color-s),
                    var(--outline-color-l),
                    var(--outline-color-a)
                );
            }

            [part="input-inner-container"] {
                position: relative;
                display: flex;
                flex-grow: 1;
                align-items: center;
            }

            [part="input-container"]:focus-within {
                --outline-color-h: var(
                    --validation-border-color-h,
                    var(--primary-color-h)
                );
                --outline-color-s: var(
                    --validation-border-color-s,
                    var(--primary-color-s)
                );
                --outline-color-l: var(
                    --validation-border-color-l,
                    var(--primary-color-l)
                );
                --outline-color-a: 1;
            }
        `,
    ];
}

declare global {
    interface HTMLElementTagNameMap {
        "ds-textarea": Textarea;
    }
}
