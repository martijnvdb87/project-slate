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
            <div part="tabs">
                <slot name="tabs"></slot>
                <div part="indicator"></div>
            </div>
            <div part="panels">
                <slot name="panels"></slot>
            </div>
        </div>`;
    }

    updated() {
        this.setActive(this.activeIndex);

        for (const tab of this.getAllTabs() as HTMLElement[]) {
            tab.addEventListener("click", () => {
                this.allowTransition();
                const activeIndex = this.tabToIndex(tab);
                this.setActive(activeIndex);
            });
        }
    }

    setActive(index: number) {
        this.activeIndex = index;

        for (const tab of this.getAllTabs()) {
            tab.removeAttribute("active");
        }

        for (const panel of this.getAllPanels()) {
            panel.removeAttribute("active");
            panel.setAttribute("aria-hidden", "true");
            panel.setAttribute("tabindex", "-1");
        }

        this.moveIndicatorToTab(this.activeIndex);
        const activeTab = this.getTab(this.activeIndex);
        const activePanel = this.getPanel(this.activeIndex);

        activeTab.setAttribute("active", "true");

        activePanel.setAttribute("active", "true");
        activePanel.setAttribute("aria-hidden", "false");
        activePanel.setAttribute("tabindex", "");
    }

    tabToIndex(tab: HTMLElement) {
        return this.getAllTabs().indexOf(tab);
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

        return Array.from(slots[0].children) as HTMLElement[];
    }

    getTab(index: number) {
        return this.getAllTabs()[index];
    }

    getActiveTab() {
        return this.getTab(this.activeIndex);
    }

    moveIndicatorToTab(index: number) {
        const tab = this.getTab(index);
        const indicator = this.shadowRoot?.querySelector(
            "[part='indicator']"
        ) as HTMLDivElement;

        if (!indicator || !tab) {
            return;
        }

        this.style.setProperty("--tab-width", `${tab.offsetWidth}px`);
        this.style.setProperty("--tab-height", `${tab.offsetHeight}px`);

        this.style.setProperty(
            "--tab-left",
            `${tab.offsetLeft - (tab.parentElement?.offsetLeft ?? 0)}px`
        );

        this.style.setProperty(
            "--tab-top",
            `${tab.offsetTop - (tab.parentElement?.offsetTop ?? 0)}px`
        );
    }

    getAllPanels() {
        const slotQuery = this.shadowRoot?.querySelector(
            "slot[name='panels']"
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

        return Array.from(slots[0].children) as HTMLElement[];
    }

    getPanel(index: number) {
        return this.getAllPanels()[index];
    }

    allowTransition() {
        this.style.setProperty(
            "--transition",
            "var(--tab-indicator-transition)"
        );
    }

    disableTransation() {
        this.style.setProperty("--transition", "none");
    }

    static styles = [
        mainCss,
        css`
            :host {
                --indicator-height: var(--tab-indicator-height);

                --indicator-color-h: var(--primary-color-h);
                --indicator-color-s: var(--primary-color-h);
                --indicator-color-l: var(--primary-color-h);
                --indicator-color-a: var(--primary-color-h);
            }

            [part="main"] {
            }

            [part="tabs"] {
                position: relative;
                display: flex;
                list-style: none;
                margin: 0;
                padding: 0;
                width: 100%;
                border-bottom: var(--input-border-width) solid
                    hsla(
                        var(--input-border-color-h),
                        var(--input-border-color-s),
                        var(--input-border-color-l),
                        var(--input-border-color-a)
                    );
            }

            [part="indicator"] {
                position: absolute;
                top: var(--tab-top, 0);
                left: var(--tab-left, 0);
                width: var(--tab-width);
                height: var(--tab-height);
                pointer-events: none;

                transition: var(--transition);
            }

            [part="indicator"]::after {
                content: "";
                position: absolute;
                left: 0;
                bottom: calc(0px - var(--input-border-width));
                width: 100%;
                height: var(--indicator-height);
                background-color: hsla(
                    var(--primary-color-h),
                    var(--primary-color-s),
                    var(--primary-color-l),
                    var(--primary-color-a)
                );
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
        `,
    ];
}

declare global {
    interface HTMLElementTagNameMap {
        "ds-tabs": Tabs;
    }
}
