import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { config } from "@/lib/config";
import "@/lib/css/fonts.css";
import { mainCss } from "../util/style";
import { renderIcon } from "../util/icons";

@customElement(`${config.prefix}-input`)
export class Input extends LitElement {
    @property({ type: String })
    value = "";

    @property({ type: String })
    placeholder = "";

    @property({ type: String })
    label = "";

    @property({ type: String })
    icon = "";

    @property({ attribute: "icon-right", type: String })
    iconRight = "";

    render() {
        const mainClasses = [];

        if (this.icon) {
            mainClasses.push("has-icon-left");
        }

        if (this.iconRight) {
            mainClasses.push("has-icon-right");
        }

        return html`
            <div part="main" class="${mainClasses.join(" ")}">
                <label part="label" for="input">${this.label}</label>
                <div part="input-container">
                    ${renderIcon(this.icon, ["icon", "icon-left"])}
                    <input
                        id="input"
                        part="input"
                        placeholder="${this.placeholder}"
                        value="${this.value}"
                    />
                    ${renderIcon(this.iconRight, ["icon", "icon-right"])}
                </div>
            </div>
        `;
    }

    static styles = css`
        ${mainCss()}

        :host {
            display: var(--display);
            vertical-align: bottom;

            --display: inline-flex;
            --height: var(--height-medium);
            --padding-x: 0.75rem;
            --gap: var(--gap-medium);
            --icon-size: var(--icon-size-medium);
            --font-size: var(--font-size-medium);

            --icon-color: hsla(
                var(--input-icon-color-h),
                var(--input-icon-color-s),
                var(--input-icon-color-l),
                var(--input-icon-color-a)
            );

            --input-padding-x: var(--input-padding-x-medium);

            --background-color-h: var(--input-background-color-h);
            --background-color-s: var(--input-background-color-s);
            --background-color-l: var(--input-background-color-l);
            --background-color-a: var(--input-background-color-a);

            --border-radius: var(--element-border-radius);
            --border-width: var(--input-border-width);
            --border-color-h: var(--input-border-color-h);
            --border-color-s: var(--input-border-color-s);
            --border-color-l: var(--input-border-color-l);
            --border-color-a: var(--input-border-color-a);
        }

        input {
            display: flex;
            flex-grow: 1;
            align-items: center;
            justify-content: center;
            vertical-align: middle;
            height: calc(var(--height) - 2px);
            padding: 0 var(--input-padding-x);
            background: transparent;
            font-family: var(--font-family);
            font-size: var(--font-size);
            border: none;
            outline: none;
        }

        input::placeholder {
            opacity: 0.75;
        }

        [part="main"] {
            display: flex;
            flex-grow: 1;
            flex-direction: column;
        }

        [part="label"] {
            display: inline-block;
            padding: 0.25rem;
            font-size: 0.875rem;
            font-weight: 600;
            color: hsl(
                var(--default-accent-h),
                var(--default-accent-s),
                var(--default-accent-l)
            );
        }

        [part="icon"] {
            display: flex;
            align-items: center;
            justify-content: center;
            width: var(--icon-size);
            height: var(--icon-size);
            pointer-events: none;
        }

        [part="input-container"] {
            position: relative;
            display: flex;
            align-items: center;
            height: var(--height);
            gap: var(--gap);
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
                var(--border-color-h),
                var(--border-color-s),
                var(--border-color-l),
                var(--border-color-a)
            );
            outline: 0rem solid
                hsla(
                    var(--primary-color-h),
                    var(--primary-color-s),
                    var(--primary-color-l),
                    0
                );
            transition: all 120ms ease-in-out;
        }

        [part="input-container"]:focus-within {
            border-color: hsl(
                var(--primary-color-h),
                var(--primary-color-s),
                var(--primary-color-l)
            );
            outline: 0.25rem solid
                hsla(
                    var(--primary-color-h),
                    var(--primary-color-s),
                    var(--primary-color-l),
                    0.25
                );
        }

        .icon {
            position: absolute;
        }

        .icon.icon-left {
            left: var(--padding-x);
        }

        .icon.icon-right {
            right: var(--padding-x);
        }

        .has-icon-left input {
            padding-left: calc(
                var(--padding-x) + var(--icon-size) + var(--gap)
            );
        }

        .has-icon-right input {
            padding-right: calc(
                var(--padding-x) + var(--icon-size) + var(--gap)
            );
        }

        :host([size="tiny"]) {
            --height: var(--height-tiny);
            --icon-size: var(--icon-size-tiny);
            --padding-x: var(--padding-x-tiny);
            --input-padding-x: var(--input-padding-x-tiny);
            --gap: var(--gap-tiny);
            --font-size: var(--font-size-tiny);
        }

        :host([size="small"]) {
            --height: var(--height-small);
            --icon-size: var(--icon-size-small);
            --padding-x: var(--padding-x-small);
            --input-padding-x: var(--input-padding-x-small);
            --gap: var(--gap-small);
            --font-size: var(--font-size-small);
        }

        :host([size="large"]) {
            --height: var(--height-large);
            --icon-size: var(--icon-size-large);
            --padding-x: var(--padding-x-large);
            --input-padding-x: var(--input-padding-x-large);
            --gap: var(--gap-large);
            --font-size: var(--font-size-large);
        }

        :host([size="huge"]) {
            --height: var(--height-huge);
            --icon-size: var(--icon-size-huge);
            --padding-x: var(--padding-x-huge);
            --input-padding-x: var(--input-padding-x-huge);
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
    `;
}

declare global {
    interface HTMLElementTagNameMap {
        "ds-input": Input;
    }
}
