import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { config } from "@/lib/config";
import { mainCss, size } from "../util/style";
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
            <div part="main">
                <div part="checkbox-container">
                    <input
                        type="checkbox"
                        part="input"
                        id="input"
                        name="${this.name}"
                        ?checked="${this.checked}"
                        ?disabled="${this.disabled}"
                    />
                    <div part="input-container">${renderIcon(this.icon)}</div>
                </div>
                <div part="label-container">
                    <label for="input" part="label"><slot></slot></label>
                    <slot name="description"></slot>
                </div>
            </div>
        `;
    }

    firstUpdated() {
        this.setupInput();
    }

    setupInput() {
        this.getPart("input").addEventListener("change", (e) => {
            const isChecked = (e.target as HTMLInputElement).checked;

            if (isChecked) {
                this.setAttribute("checked", "");
            } else {
                this.removeAttribute("checked");
            }
        });
    }

    getPart(name: string) {
        return this.shadowRoot?.querySelector(
            `[part='${name}']`
        ) as HTMLElement;
    }

    static styles = [
        mainCss,
        css`
            :host {
                display: var(--display);
                vertical-align: bottom;
                margin-bottom: var(--margin-bottom);

                --display: flex;
                --height: ${size(32)};
                --margin-bottom: var(--element-margin-bottom);

                --element-border-radius: var(--border-radius);
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

                --icon-size: 100%;

                --gap: ${size(16)};

                --font-size: var(--font-size-medium);

                --checkbox-size: ${size(20)};

                --outline-width: var(--input-outline-width);

                --outline-offset: calc(0 - var(--border-width));
                --outline-colored-offset: ${size(2)};

                --focus-outline-width: var(--input-focus-outline-width);
            }

            [part="main"] {
                position: relative;
                display: flex;
                gap: var(--gap);
                font-family: var(--font-family);
                font-size: var(--font-size);
                line-height: var(--text-line-height);
            }

            [part="checkbox-container"] {
                position: relative;
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

                border-radius: var(--element-border-radius);
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
            }

            [part="label-container"] {
                display: flex;
                flex-direction: column;
                color: var(--input-label-color);
            }

            [part="label"] {
                display: inline-flex;
                cursor: pointer;
            }

            slot:not([name]) {
                font-weight: var(--input-label-font-weight);

                font-size: var(--input-label-font-size);
            }

            ::slotted([slot="description"]) {
                color: var(--text-color);
                margin-bottom: var(--margin-bottom);
            }

            :host([size="small"]) {
                --height: ${size(24)};
                --font-size: var(--font-size-small);
                --checkbox-size: ${size(16)};
            }

            :host([size="large"]) {
                --height: ${size(40)};
                --font-size: var(--font-size-large);
                --checkbox-size: ${size(24)};
            }

            :host([size="huge"]) {
                --height: ${size(48)};
                --font-size: var(--font-size-huge);
                --checkbox-size: ${size(28)};
            }

            :host([disabled]) {
                opacity: 0.75;
                pointer-events: none;
            }
        `,
    ];
}

declare global {
    interface HTMLElementTagNameMap {
        "ds-checkbox": Input;
    }
}
