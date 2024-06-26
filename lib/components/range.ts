import { LitElement, css, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { config } from "@/lib/config";
import { mainCss, size } from "../util/style";
import { getPart, getRandomId } from "../util/general";
import { Ref, createRef, ref } from "lit/directives/ref.js";

@customElement(`${config.prefix}-range`)
export class Range extends LitElement {
    public root: Ref<HTMLInputElement> = createRef();
    public input: Ref<HTMLInputElement> = createRef();

    @property({ type: String })
    protected name = null;

    @property({ type: String })
    protected type = "single";

    @property({ type: String })
    protected value = "";

    @state()
    protected originalValue = "";

    @property({ type: String })
    protected label: string | null = null;

    @property({ type: Boolean })
    protected readonly = false;

    @property({ type: Boolean })
    protected disabled = false;

    @property({ type: Boolean })
    protected required = false;

    @property({ type: Boolean, attribute: "autofocus" })
    protected inputAutofocus = false;

    @property({ type: Number })
    protected min = null;

    @property({ type: Number })
    protected max = null;

    @property({ type: Number })
    protected step = null;

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
                    <input
                        ${ref(this.input)}
                        id="${this.elementId}"
                        name="${this.name}"
                        part="input"
                        type="range"
                        .value="${this.value}"
                        ?readonly="${this.readonly}"
                        ?disabled="${this.disabled}"
                        ?required="${this.required}"
                        ?autofocus="${this.inputAutofocus}"
                        min="${this.min}"
                        max="${this.max}"
                        step="${this.step}"
                        @input="${this.handleInput}"
                    />
                    <div part="slider-container">
                        <div part="slider-filled"></div>
                        <div part="slider-handle"></div>
                    </div>
                </div>
            </div>
        `;
    }

    protected handleInput(e: Event) {
        const target = e.target as HTMLInputElement;
        this.value = target.value;
        this.internals.setFormValue(this.value);

        getPart(this, "main").style.setProperty(
            "--value-percent",
            `${this.value}%`
        );
    }

    public static styles = [
        mainCss,
        css`
            :host {
                display: var(--display);
                vertical-align: bottom;

                --value-percent: 0%;

                --display: inline-flex;
                --height: ${size(36)};
                --gap: ${size(6)};
                --font-size: var(--font-size-medium);
                --font-weight: var(--input-font-weight);

                --handle-height: ${size(20)};
                --slider-height: ${size(12)};

                --text-color-h: var(--input-text-color-h);
                --text-color-s: var(--input-text-color-s);
                --text-color-l: var(--input-text-color-l);
                --text-color-a: var(--input-text-color-a);

                --label-font-weight: var(--input-label-font-weight);
                --label-font-size: var(--input-label-font-size);

                --label-color-h: var(--input-label-color-h);
                --label-color-s: var(--input-label-color-s);
                --label-color-l: var(--input-label-color-l);
                --label-color-a: var(--input-label-color-a);

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

                --outline-width: var(--input-outline-width);

                --focus-outline-width: var(--input-focus-outline-width);
            }

            input {
            }

            [part="main"] {
                position: relative;
                flex-grow: 1;
            }

            [part="label"] {
                display: inline-block;
                padding-bottom: ${size(8)};
                font-size: var(--label-font-size);
                font-weight: var(--label-font-weight);

                color: hsla(
                    var(--label-color-h),
                    var(--label-color-s),
                    var(--label-color-l),
                    var(--label-color-a)
                );
            }

            [part="slider-container"] {
                position: relative;
                height: var(--slider-height);
                background: hsla(
                    var(--background-color-h),
                    var(--background-color-s),
                    var(--background-color-l),
                    var(--background-color-a)
                );
                border-radius: 999rem;
                border-color: hsla(
                    var(--border-color-h),
                    var(--border-color-s),
                    var(--border-color-l),
                    var(--border-color-a)
                );
                border-style: solid;
                border-width: var(--border-width);
            }

            [part="slider-filled"] {
                position: absolute;
                top: calc(0px - var(--border-width));
                left: calc(0px - var(--border-width));
                right: calc(0px - var(--border-width));
                height: var(--slider-height);
                width: var(--value-percent);
                background-color: hsla(
                    var(--primary-color-h),
                    var(--primary-color-s),
                    calc(var(--primary-color-l) + 15%),
                    1
                );
                border-radius: 999rem 0 0 999rem;
            }

            [part="slider-handle"] {
                position: absolute;
                top: calc(
                    var(--slider-height) / 2 - var(--handle-height) / 2 -
                        var(--border-width)
                );
                bottom: 0;
                left: calc(
                    var(--value-percent) - var(--handle-height) / 2 -
                        var(--border-width)
                );
                right: 0;
                height: var(--handle-height);
                width: var(--handle-height);
                background-color: hsla(
                    var(--primary-color-h),
                    var(--primary-color-s),
                    var(--primary-color-l),
                    var(--primary-color-a)
                );
                border-radius: 999rem;
            }

            :host([size="small"]) {
                --height: ${size(28)};
                --gap: ${size(4)};
                --font-size: var(--font-size-small);
                --validation-font-size: ${size(11)};
                --handle-height: ${size(16)};
            }

            :host([size="large"]) {
                --height: ${size(44)};
                --gap: ${size(8)};
                --font-size: var(--font-size-large);
                --validation-font-size: ${size(14)};
                --handle-height: ${size(24)};
            }

            :host([size="huge"]) {
                --height: ${size(52)};
                --gap: ${size(10)};
                --font-size: var(--font-size-huge);
                --validation-font-size: ${size(16)};
                --handle-height: ${size(28)};
            }

            :host([width="full"]) {
                --display: flex;
            }

            :host([disabled]) {
                opacity: 0.75;
                --text-color-a: 0.5;
                pointer-events: none;
            }
        `,
    ];
}

declare global {
    interface HTMLElementTagNameMap {
        "ds-range": Range;
    }
}
