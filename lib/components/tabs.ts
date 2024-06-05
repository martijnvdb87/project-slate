import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { config } from "@/lib/config";
import { mainCss } from "../util/style";

@customElement(`${config.prefix}-tabs`)
export class Tabs extends LitElement {
    @property({ attribute: "active-index", type: Number })
    activeIndex = 0;

    render() {
        return html` <div part="main">
            <slot name="tabs"></slot>
            <slot name="panels"></slot>
        </div>`;
    }

    updated() {
        for (const tab of this.getAllTabs()) {
            tab.addEventListener("click", () => {
                for (const tab of this.getAllTabs()) {
                    tab.removeAttribute("active");
                }

                tab.setAttribute("active", "true");
            });
        }
        console.dir(this.getTab(this.activeIndex));
    }

    getAllTabs() {
        const slotQuery = this.shadowRoot?.querySelector(
            "slot[name='tabs']"
        ) as HTMLSlotElement;

        if (!slotQuery) {
            return [];
        }

        const slots = [...slotQuery.assignedNodes()].filter(
            (node) => node.nodeType === Node.ELEMENT_NODE
        ) as HTMLElement[];

        if (slots.length === 0) {
            return [];
        }

        return slots[0].children;
    }

    getTab(index: number) {
        return this.getAllTabs()[index];
    }

    static styles = css`
        ${mainCss()}

        :host {
        }

        ::slotted([slot="tabs"]) {
            display: flex;
            list-style: none;
            margin: 0;
            padding: 0;
        }

        ::slotted([slot="panels"]) {
            display: flex;
            list-style: none;
            margin: 0;
            padding: 0;
        }
    `;
}

declare global {
    interface HTMLElementTagNameMap {
        "ds-tabs": Tabs;
    }
}
