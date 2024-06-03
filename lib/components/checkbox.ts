import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { config } from "@/lib/config";
import { mainCss } from "../util/style";
import { renderIcon } from "../util/icons";

@customElement(`${config.prefix}-checkbox`)
export class Input extends LitElement {
    @property({ type: String })
    name = null;

    @property({ type: Boolean })
    checked = false;

    @property({ type: String })
    icon = "check";

    @property({ attribute: "icon-padding", type: String })
    iconPadding = "10px";

    @property({ type: Boolean })
    disabled = false;

    render() {
        return html`
            <label part="main">
                <div part="checkbox-container">
                    <input
                        type="checkbox"
                        part="input"
                        ?checked=${this.checked}
                        name=${this.name}
                    />
                    <div part="input-container">${renderIcon(this.icon)}</div>
                </div>
                <div part="label-container">
                    <slot></slot>
                    <slot name="description"></slot>
                </div>
            </label>
        `;
    }

    static styles = css`
        ${mainCss()}

        :host {
            display: var(--display);
            vertical-align: bottom;
            margin-bottom: var(--margin-bottom);

            --display: flex;
            --height: var(--height-medium);
            --margin-bottom: var(--element-margin-bottom);

            --border-radius: var(--element-border-radius);
            --border-width: var(--input-border-width);
            --border-color-h: var(--input-border-color-h);
            --border-color-s: var(--input-border-color-s);
            --border-color-l: var(--input-border-color-l);
            --border-color-a: var(--input-border-color-a);

            --background-color-h: var(--input-background-color-h);
            --background-color-s: var(--input-background-color-s);
            --background-color-l: var(--input-background-color-l);
            --background-color-a: var(--input-background-color-a);

            --icon-color-h: var(--primary-accent-h);
            --icon-color-s: var(--primary-accent-s);
            --icon-color-l: var(--primary-accent-l);
            --icon-color-a: var(--primary-accent-a);

            --icon-color: hsla(
                var(--icon-color-h),
                var(--icon-color-s),
                var(--icon-color-l),
                var(--icon-color-a)
            );

            --sub-text-color-h: var(--input-sub-text-color-h);
            --sub-text-color-s: var(--input-sub-text-color-s);
            --sub-text-color-l: var(--input-sub-text-color-l);
            --sub-text-color-a: var(--input-sub-text-color-a);

            --icon-size: 100%;

            --gap: var(--gap-medium);

            --font-size: var(--font-size-medium);

            --checkbox-size: var(--sub-height-medium);

            --outline-width: var(--input-outline-width);

            --outline-offset: var(--element-outline-offset);
            --outline-colored-offset: var(--element-colored-outline-offset);

            --focus-outline-width: var(--input-focus-outline-width);
        }

        [part="main"] {
            position: relative;
            display: flex;
            gap: var(--gap);
            font-family: var(--font-family);
            font-size: var(--font-size);
        }

        [part="input"] {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: 0;
            z-index: 999;
            cursor: pointer;
        }

        [part="input"]:focus-visible + [part="input-container"] {
            border-color: hsl(
                var(--primary-color-h),
                var(--primary-color-s),
                var(--primary-color-l)
            );
            outline: calc(
                    var(--input-outline-width) + var(--input-border-width)
                )
                solid
                hsla(
                    var(--primary-color-h),
                    var(--primary-color-s),
                    var(--primary-color-l),
                    var(--input-outline-opacity)
                );
            outline-offset: var(--outline-offset);
        }

        [part="icon-container"] {
            display: flex;
            opacity: 0;
        }

        [part="input"]:checked + [part="input-container"] {
            --background-color-h: var(--primary-color-h);
            --background-color-s: var(--primary-color-s);
            --background-color-l: var(--primary-color-l);
            --background-color-a: var(--primary-color-a);

            --border-color-h: var(--primary-color-h);
            --border-color-s: var(--primary-color-s);
            --border-color-l: var(--primary-color-l);
            --border-color-a: var(--primary-color-a);

            --outline-offset: var(--outline-colored-offset);
        }

        [part="input"]:checked
            + [part="input-container"]
            [part="icon-container"] {
            opacity: 1;
        }

        [part="input-container"] {
            display: flex;
            align-items: center;
            justify-content: center;
            pointer-events: none;
            width: var(--checkbox-size);
            height: var(--checkbox-size);

            border-radius: var(--border-radius);
            border-width: var(--border-width);
            border-style: solid;
            border-color: hsla(
                var(--border-color-h),
                var(--border-color-s),
                var(--border-color-l),
                var(--border-color-a)
            );

            background-color: hsla(
                var(--background-color-h),
                var(--background-color-s),
                var(--background-color-l),
                var(--background-color-a)
            );
            outline: 0 solid
                hsla(
                    var(--primary-color-h),
                    var(--primary-color-s),
                    var(--primary-color-l),
                    0
                );
            transition: all var(--transition-duration) ease-in-out;
        }

        [part="icon"] {
            display: flex;
            align-items: center;
            justify-content: center;
            width: var(--icon-size);
            height: var(--icon-size);
            max-width: 100%;
            max-height: 100%;
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
            transition: all var(--transition-duration) ease-in-out;
        }

        [part="label-container"] {
            display: flex;
            flex-direction: column;
            gap: var(--gap);
        }

        ::slotted([slot="description"]) {
            color: hsla(
                var(--sub-text-color-h),
                var(--sub-text-color-s),
                var(--sub-text-color-l),
                var(--sub-text-color-a)
            );
            margin-bottom: var(--margin-bottom);
        }

        :host([size="small"]) {
            --height: var(--height-small);
            --font-size: var(--font-size-small);
            --checkbox-size: var(--sub-height-small);
        }

        :host([size="large"]) {
            --height: var(--height-large);
            --font-size: var(--font-size-large);
            --checkbox-size: var(--sub-height-large);
        }

        :host([size="huge"]) {
            --height: var(--height-huge);
            --font-size: var(--font-size-huge);
            --checkbox-size: var(--sub-height-huge);
        }
    `;
}

declare global {
    interface HTMLElementTagNameMap {
        "ds-checkbox": Input;
    }
}
