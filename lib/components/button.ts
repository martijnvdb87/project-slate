import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { config } from "@/lib/config";
import "@/lib/css/fonts.css";
import { mainCss } from "@/lib/util/style";
import { renderIcon } from "@/lib/util/icons";

@customElement(`${config.prefix}-button`)
export class Button extends LitElement {
    @property({ type: String })
    icon = "";

    @property({ attribute: "icon-right", type: String })
    iconRight = "";

    @property({ type: Boolean })
    disabled = false;

    render() {
        return html`
            <button part="button" ?disabled="${this.disabled}">
                ${renderIcon(this.icon)}
                <slot></slot>
                ${renderIcon(this.iconRight)}
            </button>
        `;
    }

    static styles = css`
        ${mainCss()}

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
            --icon-size: var(--icon-size-medium);
            --height: var(--height-medium);
            --width: auto;

            --background-color-h: var(--default-color-h);
            --background-color-s: var(--default-color-s);
            --background-color-l: var(--default-color-l);
            --background-color-a: var(--default-color-a);

            --text-color-h: var(--default-accent-h);
            --text-color-s: var(--default-accent-s);
            --text-color-l: var(--default-accent-l);
            --text-color-a: var(--default-accent-a);

            --padding-x: var(--padding-x-medium);
            --gap: var(--gap-medium);

            --font-size: var(--font-size-medium);

            --border-radius: var(--element-border-radius);
            --border-width: 0px;

            --border-color-h: var(--default-color-h);
            --border-color-s: var(--default-color-s);
            --border-color-l: var(--default-color-l);
            --border-color-a: var(--default-color-a);

            --outline-color-h: var(--primary-color-h);
            --outline-color-s: var(--primary-color-s);
            --outline-color-l: var(--primary-color-l);
            --outline-color-a: var(--primary-color-a);

            --box-shadow: none;
        }

        button {
            display: flex;
            flex: auto;
            align-items: center;
            justify-content: center;
            height: var(--height);
            width: var(--width);
            padding: 0 var(--padding-x);
            gap: var(--gap);
            font-size: var(--font-size);
            font-family: var(--font-family);
            font-weight: 500;
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
            border-radius: var(--border-radius);
            box-shadow: var(--box-shadow);
            cursor: pointer;
            outline: 0.125rem none
                hsla(
                    var(--outline-color-h),
                    var(--outline-color-s),
                    var(--outline-color-l),
                    var(--outline-color-a)
                );
            transition: all 120ms ease-in-out, border-width 0s, padding 0s;
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
            outline: 0.25rem solid
                hsla(
                    var(--outline-color-h),
                    var(--outline-color-s),
                    var(--outline-color-l),
                    0.25
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

            --outline-color-h: var(--secondary-color-h);
            --outline-color-s: var(--secondary-color-s);
            --outline-color-l: var(--secondary-color-l);
            --outline-color-a: var(--secondary-color-a);

            --border-color-h: var(--secondary-color-h);
            --border-color-s: var(--secondary-color-s);
            --border-color-l: var(--secondary-color-l);
            --border-color-a: var(--secondary-color-a);
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

        :host([size="tiny"]) {
            --height: var(--height-tiny);
            --icon-size: var(--icon-size-tiny);
            --padding-x: var(--padding-x-tiny);
            --gap: var(--gap-tiny);
            --font-size: var(--font-size-tiny);
        }

        :host([size="small"]) {
            --height: var(--height-small);
            --icon-size: var(--icon-size-small);
            --padding-x: var(--padding-x-small);
            --gap: var(--gap-small);
            --font-size: var(--font-size-small);
        }

        :host([size="large"]) {
            --height: var(--height-large);
            --icon-size: var(--icon-size-large);
            --padding-x: var(--padding-x-large);
            --gap: var(--gap-large);
            --font-size: var(--font-size-large);
        }

        :host([size="huge"]) {
            --height: var(--height-huge);
            --icon-size: var(--icon-size-huge);
            --padding-x: var(--padding-x-huge);
            --gap: var(--gap-huge);
            --font-size: var(--font-size-huge);
        }

        :host([width="full"]) {
            --display: flex;
        }

        :host([shape="square"]) {
            --border-radius: 0;
        }

        :host([shape="pill"]) {
            --border-radius: 999rem;
        }

        :host([shape="circle"]) {
            --padding-x: 0;
            --border-radius: 50%;
            --width: var(--height);
        }

        :host([shadow]) {
            --box-shadow: 0 0.25rem 1rem 0.125rem
                hsl(
                    var(--background-color-h),
                    var(--background-color-s),
                    calc(var(--background-color-l) - 15%),
                    0.25
                );
        }

        :host([disabled]) {
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
    `;
}

declare global {
    interface HTMLElementTagNameMap {
        "ds-button": Button;
    }
}
