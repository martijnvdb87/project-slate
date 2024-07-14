import { LitElement, css, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { config } from "@/lib/config";
import { mainCss, size, varSize } from "../util/style";
import { getRandomId } from "../util/general";
import { Ref, createRef, ref } from "lit/directives/ref.js";

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
                <label
                    ?hidden="${this.label === null}"
                    part="label"
                    for="${this.elementId}"
                    >${this.label}</label
                >
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
        css`
            :host {
                display: var(--display);
                vertical-align: bottom;

                --display: flex;
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

                --label-font-weight: var(--form-label-font-weight);
                --label-font-size: var(--form-label-font-size);

                --label-color-h: var(--input-label-color-h);
                --label-color-s: var(--input-label-color-s);
                --label-color-l: var(--input-label-color-l);
                --label-color-a: var(--input-label-color-a);

                --input-padding: ${size(8)} ${size(12)};

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

                --validation-font-size: ${size(12)};
            }

            textarea {
                display: flex;
                flex-grow: 1;
                align-items: center;
                justify-content: center;
                vertical-align: middle;
                width: 100%;
                padding: var(--input-padding);
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

            [part="main"] {
                position: relative;
                flex-grow: 1;
            }

            [part="label"] {
                display: inline-block;
                margin-bottom: ${varSize("form-label-margin-bottom")};
                font-size: var(--label-font-size);
                font-weight: var(--label-font-weight);

                color: hsla(
                    var(--label-color-h),
                    var(--label-color-s),
                    var(--label-color-l),
                    var(--label-color-a)
                );
            }

            [part="validation-message"] {
                padding-top: ${size(6)};
                font-size: var(--validation-font-size);
                color: hsl(
                    var(--validation-border-color-h),
                    var(--validation-border-color-s),
                    var(--validation-border-color-l),
                    var(--validation-border-color-a)
                );
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
                border-radius: var(--element-border-radius);
                border-width: var(--border-width);
                border-style: solid;
                border-color: hsla(
                    var(--validation-border-color-h, var(--border-color-h)),
                    var(--validation-border-color-s, var(--border-color-s)),
                    var(--validation-border-color-l, var(--border-color-l)),
                    var(--validation-border-color-a, var(--border-color-a))
                );
                outline: 0 solid
                    hsla(
                        var(
                            --validation-border-color-h,
                            var(--primary-color-h)
                        ),
                        var(
                            --validation-border-color-s,
                            var(--primary-color-s)
                        ),
                        var(
                            --validation-border-color-l,
                            var(--primary-color-l)
                        ),
                        0
                    );
            }

            [part="input-inner-container"] {
                position: relative;
                display: flex;
                flex-grow: 1;
                align-items: center;
            }

            [part="input-container"]:focus-within {
                border-color: hsl(
                    var(--validation-border-color-h, var(--primary-color-h)),
                    var(--validation-border-color-s, var(--primary-color-s)),
                    var(--validation-border-color-l, var(--primary-color-l))
                );
                outline: var(--input-outline-width) solid
                    hsla(
                        var(
                            --validation-border-color-h,
                            var(--primary-color-h)
                        ),
                        var(
                            --validation-border-color-s,
                            var(--primary-color-s)
                        ),
                        var(
                            --validation-border-color-l,
                            var(--primary-color-l)
                        ),
                        var(--input-outline-opacity)
                    );
            }

            :host([size="small"]) {
                --input-padding: ${size(6)} ${size(10)};
                --gap: ${size(4)};
                --font-size: var(--font-size-small);
                --validation-font-size: ${size(11)};
            }

            :host([size="large"]) {
                --input-padding: ${size(10)} ${size(14)};
                --gap: ${size(8)};
                --font-size: var(--font-size-large);
                --validation-font-size: ${size(14)};
            }

            :host([size="huge"]) {
                --input-padding: ${size(12)} ${size(16)};
                --gap: ${size(10)};
                --font-size: var(--font-size-huge);
                --validation-font-size: ${size(16)};
            }

            :host([shape="square"]) {
                --element-border-radius: 0;
            }

            :host([disabled]) {
                opacity: 0.75;
                --text-color-a: 0.5;
                pointer-events: none;
            }

            :host([error]) {
                --validation-border-color-h: var(--error-color-h);
                --validation-border-color-s: var(--error-color-s);
                --validation-border-color-l: var(--error-color-l);
                --validation-border-color-a: var(--error-color-a);
            }
        `,
    ];
}

declare global {
    interface HTMLElementTagNameMap {
        "ds-textarea": Textarea;
    }
}
