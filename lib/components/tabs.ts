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
        this.moveIndicatorToTab(this.activeIndex);

        for (const tab of this.getAllTabs() as HTMLElement[]) {
            tab.addEventListener("click", () => {
                this.allowAnimation();

                for (const tab of this.getAllTabs()) {
                    tab.removeAttribute("active");
                }

                tab.setAttribute("active", "true");
                this.moveIndicatorToTab(this.tabToIndex(tab));
            });
        }
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

    allowAnimation() {
        this.style.setProperty(
            "--active-transition-duration",
            "var(--transition-duration)"
        );
    }

    static styles = css`
        ${mainCss()}

        :host {
            --indicator-height: var(--tab-indicator-height);

            --indicator-color-h: var(--primary-color-h);
            --indicator-color-s: var(--primary-color-h);
            --indicator-color-l: var(--primary-color-h);
            --indicator-color-a: var(--primary-color-h);

            --active-transition-duration: 0ms;
        }

        [part="main"] {
        }

        [part="tabs"] {
            position: relative;
            display: flex;
            list-style: none;
            margin: 0;
            padding: 0;
        }

        [part="indicator"] {
            position: absolute;
            top: var(--tab-top, 0);
            left: var(--tab-left, 0);
            width: var(--tab-width);
            height: var(--tab-height);
            pointer-events: none;

            transition: var(--tab-indicator-transition);
        }

        [part="indicator"]::after {
            content: "";
            position: absolute;
            left: 0;
            bottom: 0;
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
    `;
}

declare global {
    interface HTMLElementTagNameMap {
        "ds-tabs": Tabs;
    }
}
