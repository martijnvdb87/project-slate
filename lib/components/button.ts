import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { config } from "@/lib/config";
import "@/lib/css/fonts.css";
import { mainCss } from "../util/style";

@customElement(`${config.prefix}-button`)
export class Button extends LitElement {
    @property({ type: String })
    icon = "";

    @property({ type: String })
    ["icon-right"] = "";

    render() {
        return html`
            <button part="button">
                ${this.renderIcon(this.icon)}
                <slot></slot>
                ${this.renderIcon(this["icon-right"])}
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
            --icon-size: 1.125rem;
            --height: 2.5rem;
            --width: auto;

            --background-color-h: var(--default-color-h);
            --background-color-s: var(--default-color-s);
            --background-color-l: var(--default-color-l);
            --background-color-a: var(--default-color-a);

            --text-color-h: var(--default-accent-h);
            --text-color-s: var(--default-accent-s);
            --text-color-l: var(--default-accent-l);
            --text-color-a: var(--default-accent-a);

            --padding-x: 1rem;
            --gap: 0.5rem;

            --font-size: 0.9375rem;

            --border-radius: var(--element-border-radius);
            --border-width: 0px;
            --border-color-h: var(--input-border-color-h);
            --border-color-s: var(--input-border-color-s);
            --border-color-l: var(--input-border-color-l);
            --border-color-a: var(--input-border-color-a);

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
            transition: all 120ms ease-in-out;
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
        }

        :host([type="link"]) button:hover {
            --background-color-a: 0.25;
        }

        :host([type="link"]) button:active {
            --background-color-a: 0.4;
        }

        :host([size="tiny"]) {
            --height: 1.5rem;
            --icon-size: 0.75rem;
            --padding-x: 0.375rem;
            --gap: 0.25rem;
            --font-size: 0.75rem;
        }

        :host([size="small"]) {
            --height: 2rem;
            --icon-size: 0.875rem;
            --padding-x: 0.75em;
            --gap: 0.375rem;
            --font-size: 0.875rem;
        }

        :host([size="large"]) {
            --height: 3rem;
            --icon-size: 1.375rem;
            --padding-x: 1.125rem;
            --gap: 0.675rem;
            --font-size: 1.5rem;
        }

        :host([size="huge"]) {
            --height: 3.75rem;
            --icon-size: 1.5rem;
            --padding-x: 1.5rem;
            --gap: 0.75rem;
            --font-size: 1.75rem;
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

        [part="icon"] {
            display: flex;
            align-items: center;
            overflow: hidden;
            height: var(--icon-size);
            width: var(--icon-size);
        }
    `;

    private renderIcon(value: string) {
        if (!value) {
            return html``;
        }

        const parts = value.split(":");
        const name = parts[0];
        const type = parts[1] ?? "regular";

        return html`<div part="icon">
            <box-icon
                name="${name}"
                color="var(--icon-color)"
                type="${type}"
            ></box-icon>
        </div>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "ds-button": Button;
    }
}
