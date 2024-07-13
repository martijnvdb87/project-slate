import { LitElement, css, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { config } from "@/lib/config";
import { mainCss, sizer, varSize } from "@/lib/util/style";
import { renderIcon } from "@/lib/util/icons";
import { Ref, createRef, ref } from "lit/directives/ref.js";

enum State {
    Default = "default",
    Loading = "loading",
}

@customElement(`${config.prefix}-button`)
export class Button extends LitElement {
    public root: Ref<HTMLInputElement> = createRef();
    public input: Ref<HTMLInputElement> = createRef();

    @property({ type: String })
    protected name = null;

    @property({ type: String })
    protected icon: string | null = null;

    @property({ attribute: "icon-right", type: String })
    protected iconRight: string | null = null;

    @property({ type: Boolean })
    protected disabled = false;

    @property({ type: Boolean })
    protected submit = false;

    @property({ type: Boolean })
    protected reset = false;

    @property({ type: String })
    protected state: State = State.Default;

    @state()
    protected internals;

    protected static formAssociated = true;

    public constructor() {
        super();
        this.internals = this.attachInternals();
    }

    protected render() {
        const classes: string[] = [];

        return html`
            <button
                ${ref(this.root)}
                ${ref(this.input)}
                name="${this.name}"
                part="button"
                ?disabled="${this.disabled}"
                type="${this.submit ? "submit" : "button"}"
                @click="${this.handleClick}"
                class="${classes.join(" ")}"
                state="${this.state}"
            >
                <div part="loader">
                    <div part="loader-icon">${renderIcon("loader-alt")}</div>
                </div>
                <div part="content">
                    ${renderIcon(this.icon)}
                    <slot></slot>
                    ${renderIcon(this.iconRight)}
                </div>
            </button>
        `;
    }

    protected handleClick(e: Event) {
        e.preventDefault();

        if (this.submit) {
            this.internals.form?.submit();
        }

        if (this.reset) {
            this.internals.form?.reset();
        }
    }

    public static styles = [
        mainCss,
        css`
            box-icon {
                width: var(--icon-size);
                height: 200%;
                pointer-events: none;
            }

            :host {
                display: var(--display);
                vertical-align: bottom;

                --display: inline-flex;
                --icon-color: hsl(
                    var(--default-accent-h),
                    var(--default-accent-s),
                    var(--default-accent-l)
                );
                --icon-size: ${varSize("button-icon-size")};

                --width: auto;

                --background-color-h: var(--default-color-h);
                --background-color-s: var(--default-color-s);
                --background-color-l: var(--default-color-l);
                --background-color-a: var(--default-color-a);

                --text-color-h: var(--default-accent-h);
                --text-color-s: var(--default-accent-s);
                --text-color-l: var(--default-accent-l);
                --text-color-a: var(--default-accent-a);

                --padding-x: ${varSize("button-padding")};
                --padding-y: ${sizer(4)};

                --font-size: var(--font-size-medium);
                --font-weight: var(--element-font-weight);

                --element-border-radius: var(--border-radius);
                --border-width: 0px;

                --border-color-h: var(--default-color-h);
                --border-color-s: var(--default-color-s);
                --border-color-l: var(--default-color-l);
                --border-color-a: var(--default-color-a);

                --outline-color-h: var(--primary-color-h);
                --outline-color-s: var(--primary-color-s);
                --outline-color-l: var(--primary-color-l);
                --outline-color-a: var(--primary-color-a);

                --outline-offset: ${sizer(0)};
                --outline-colored-offset: ${sizer(2)};

                --outline-width: var(--input-outline-width);
                min-height: calc(var(--base-size-rem) - var(--border-width));
            }

            button {
                position: relative;
                padding: 0;
                font-size: var(--font-size);
                font-family: var(--font-family);
                font-weight: var(--font-weight);
                background: hsla(
                    var(--background-color-h),
                    var(--background-color-s),
                    var(--background-color-l),
                    var(--background-color-a)
                );
                color: hsla(
                    var(--text-color-h),
                    var(--text-color-s),
                    var(--text-color-l),
                    var(--text-color-a)
                );
                border-width: var(--border-width);
                border-style: solid;
                border-color: hsla(
                    var(--border-color-h),
                    var(--border-color-s),
                    var(--border-color-l),
                    var(--border-color-a)
                );
                border-radius: var(--element-border-radius);
                cursor: pointer;
                outline: 0 solid
                    hsla(
                        var(--outline-color-h),
                        var(--outline-color-s),
                        var(--outline-color-l),
                        0
                    );
                outline-offset: var(--outline-offset);
                transition: background 120ms ease-in-out;
            }

            button:hover {
                background: hsla(
                    var(--background-color-h),
                    var(--background-color-s),
                    calc(var(--background-color-l) - 4%),
                    var(--background-color-a)
                );
            }

            button:active {
                background: hsla(
                    var(--background-color-h),
                    var(--background-color-s),
                    calc(var(--background-color-l) - 8%),
                    var(--background-color-a)
                );
            }

            button:focus-visible {
                outline: var(--outline-width) solid
                    hsla(
                        var(--outline-color-h),
                        var(--outline-color-s),
                        var(--outline-color-l),
                        var(--input-outline-opacity)
                    );
            }

            button:focus-visible {
                border-width: var(--input-border-width);
                border-color: hsla(
                    var(--primary-color-h),
                    var(--primary-color-s),
                    var(--primary-color-l),
                    var(--primary-color-a)
                );
                padding: 0 calc(var(--padding-x) - var(--input-border-width));
            }

            :host([type="secondary"]) button:focus-visible {
                border-color: hsla(
                    var(--secondary-color-h),
                    var(--secondary-color-s),
                    var(--secondary-color-l),
                    var(--secondary-color-a)
                );
            }

            :host([type="ghost"]) button:focus-visible {
                padding: 0 var(--padding-x);
            }

            :host([type="primary"]) {
                --icon-color: hsla(
                    var(--primary-accent-h),
                    var(--primary-accent-s),
                    var(--primary-accent-l),
                    var(--primary-accent-a)
                );
                --background-color-h: var(--primary-color-h);
                --background-color-s: var(--primary-color-s);
                --background-color-l: var(--primary-color-l);
                --background-color-a: var(--primary-color-a);

                --text-color-h: var(--primary-accent-h);
                --text-color-s: var(--primary-accent-s);
                --text-color-l: var(--primary-accent-l);
                --text-color-a: var(--primary-accent-a);

                --border-color-h: var(--primary-color-h);
                --border-color-s: var(--primary-color-s);
                --border-color-l: var(--primary-color-l);
                --border-color-a: var(--primary-color-a);

                --outline-width: calc(
                    var(--input-outline-width) + var(--input-border-width)
                );
                --outline-offset: var(--outline-colored-offset);
            }

            :host([type="secondary"]) {
                --icon-color: hsla(
                    var(--secondary-accent-h),
                    var(--secondary-accent-s),
                    var(--secondary-accent-l),
                    var(--secondary-accent-a)
                );
                --background-color-h: var(--secondary-color-h);
                --background-color-s: var(--secondary-color-s);
                --background-color-l: var(--secondary-color-l);
                --background-color-a: var(--secondary-color-a);

                --text-color-h: var(--secondary-accent-h);
                --text-color-s: var(--secondary-accent-s);
                --text-color-l: var(--secondary-accent-l);
                --text-color-a: var(--secondary-accent-a);

                --border-color-h: var(--secondary-color-h);
                --border-color-s: var(--secondary-color-s);
                --border-color-l: var(--secondary-color-l);
                --border-color-a: var(--secondary-color-a);

                --outline-width: calc(
                    var(--input-outline-width) + var(--input-border-width)
                );
                --outline-offset: var(--outline-colored-offset);
            }

            :host([type="ghost"]) {
                --background-color-a: 0;
                --border-width: var(--input-border-width);
                --border-color-h: var(--input-border-color-h);
                --border-color-s: var(--input-border-color-s);
                --border-color-l: var(--input-border-color-l);
                --border-color-a: var(--input-border-color-a);
            }

            :host([type="ghost"]) button:hover {
                --border-color-h: var(--input-border-color-h);
                --border-color-s: var(--input-border-color-s);
                --border-color-l: calc(var(--input-border-color-l) - 8%);
                --border-color-a: var(--input-border-color-a);
            }

            :host([type="ghost"]) button:active {
                --border-color-h: var(--input-border-color-h);
                --border-color-s: var(--input-border-color-s);
                --border-color-l: calc(var(--input-border-color-l) - 24%);
                --border-color-a: var(--input-border-color-a);
            }

            :host([type="link"]) {
                --background-color-h: var(--input-border-color-h);
                --background-color-s: var(--input-border-color-s);
                --background-color-l: var(--input-border-color-l);
                --background-color-a: 0;

                --border-color-a: 0;
            }

            :host([type="link"]) button:hover {
                --background-color-a: 0.25;
            }

            :host([type="link"]) button:active {
                --background-color-a: 0.4;
            }

            [part="content"] {
                display: flex;
                flex: auto;
                align-items: center;
                justify-content: center;
                width: var(--width);
                padding: calc(var(--padding-y) - var(--border-width))
                    var(--padding-x);
                gap: ${varSize("button-gap")};
                transition: opacity 160ms;
            }

            [part="loader"] {
                position: absolute;
                top: 0;
                left: 0;
                height: 100%;
                width: 100%;
                opacity: 0;
                pointer-events: none;
                display: flex;
                justify-content: center;
                align-items: center;
                transition: opacity 160ms;
            }

            [state="loading"] [part="loader"] {
                opacity: 1;
            }

            [state="loading"] [part="content"] {
                opacity: 0;
            }

            [part="loader-icon"] {
                display: flex;
                align-items: center;
                height: var(--icon-size);
                width: var(--icon-size);
                transform-origin: center;
                animation: rotate 840ms linear infinite;
            }

            :host([width="full"]) {
                --display: flex;
            }

            :host([shape="square"]) {
                --element-border-radius: 0;
            }

            :host([shape="pill"]) {
                --element-border-radius: var(--shape-pill-radius);
            }

            :host([shape="circle"]) {
                --padding-x: 0;
                --padding-y: 0;
                --element-border-radius: 50%;
                --width: var(--base-size-rem);
            }

            :host([disabled]),
            :host([state="loading"]) {
                opacity: 0.75;
                --text-color-a: 0.5;
                pointer-events: none;
            }

            [part="icon"] {
                display: flex;
                align-items: center;
                justify-content: center;
                width: var(--icon-size);
                height: var(--icon-size);
                pointer-events: none;
            }
        `,
    ];
}

declare global {
    interface HTMLElementTagNameMap {
        "ds-button": Button;
    }
}
