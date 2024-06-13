import { LitElement, css, html } from "lit";
import {
    customElement,
    property,
    queryAssignedElements,
} from "lit/decorators.js";
import { config } from "@/lib/config";
import { mainCss } from "../util/style";

@customElement(`${config.prefix}-tabs`)
export class Tabs extends LitElement {
    @property({ attribute: "active-index", type: Number })
    activeIndex = 0;

    @queryAssignedElements({ slot: "tab" })
    tabs!: HTMLElement[];

    @queryAssignedElements({ slot: "panel" })
    panels!: HTMLElement[];

    render() {
        return html` <div part="main">
            <div part="head">
                <slot name="tab"></slot>
                <div part="tabs"></div>
                <div part="transition-indicator"></div>
            </div>
            <div part="content">
                <slot name="panel"></slot>
                <div part="panels"></div>
            </div>
        </div>`;
    }

    firstUpdated() {
        this.renderTabs();
        this.renderPanels();
        this.setupTransitionIndicator();

        this.setActive(this.activeIndex);
    }

    renderTabs() {
        const root = this.shadowRoot?.querySelector(
            "[part='tabs']"
        ) as HTMLElement;

        root.innerHTML = "";

        this.tabs.forEach((tab, index) => {
            const tabRoot = document.createElement("div");
            tabRoot.setAttribute("part", "tab");
            tabRoot.appendChild(tab);

            const indicator = document.createElement("div");
            indicator.setAttribute("part", "indicator");
            tabRoot.appendChild(indicator);

            tabRoot.addEventListener("click", () => {
                this.disableTransition();
                this.moveIndicatorToTab(this.activeIndex);
                this.setPanelsHeight(this.activeIndex);
                this.enableTransition();
                this.setActive(index);
            });

            root.appendChild(tabRoot);
        });
    }

    renderPanels() {
        const root = this.shadowRoot?.querySelector(
            "[part='panels']"
        ) as HTMLElement;

        root.innerHTML = "";

        this.panels.forEach((panel) => {
            const panelRoot = document.createElement("div");
            panelRoot.setAttribute("part", "panel");
            panelRoot.appendChild(panel);
            root.appendChild(panelRoot);
        });
    }

    setupTransitionIndicator() {
        const root = this.shadowRoot?.querySelector(
            "[part='transition-indicator']"
        ) as HTMLElement;

        root.addEventListener("transitionend", () => {
            this.disableTransition();
            this.resetPanelsHeight();
        });
    }

    setActive(index: number) {
        this.activeIndex = index;

        for (const tab of this.getAllTabs()) {
            tab.removeAttribute("active");
        }

        for (const panel of this.getAllPanels()) {
            panel.removeAttribute("active");
            panel.setAttribute("aria-hidden", "true");
        }

        this.moveIndicatorToTab(this.activeIndex);
        this.setPanelsHeight(this.activeIndex);

        const activeTab = this.getTab(this.activeIndex);
        const activePanel = this.getPanel(this.activeIndex);

        activeTab.setAttribute("active", "true");

        activePanel.setAttribute("active", "true");
        activePanel.setAttribute("aria-hidden", "false");
    }

    tabToIndex(tab: HTMLElement) {
        return this.getAllTabs().indexOf(tab);
    }

    getAllTabs() {
        const root = this.shadowRoot?.querySelector(
            "[part='tabs']"
        ) as HTMLElement;

        if (!root) {
            return [];
        }

        const tabs = [...root.children].filter(
            (node) => node.nodeType === Node.ELEMENT_NODE
        ) as HTMLElement[];

        if (tabs.length === 0) {
            return [];
        }

        return tabs;
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
            "[part='transition-indicator']"
        ) as HTMLElement;

        if (!indicator || !tab) {
            return;
        }

        this.getMain().style.setProperty("--tab-width", `${tab.offsetWidth}px`);
        this.getMain().style.setProperty(
            "--tab-height",
            `${tab.offsetHeight}px`
        );

        this.getMain().style.setProperty(
            "--tab-left",
            `${tab.offsetLeft - (tab.parentElement?.offsetLeft ?? 0)}px`
        );

        this.getMain().style.setProperty(
            "--tab-top",
            `${tab.offsetTop - (tab.parentElement?.offsetTop ?? 0)}px`
        );
    }

    getAllPanels() {
        const root = this.shadowRoot?.querySelector(
            "[part='panels']"
        ) as HTMLElement;

        if (!root) {
            return [];
        }

        const panels = [...root.children].filter(
            (node) => node.nodeType === Node.ELEMENT_NODE
        ) as HTMLElement[];

        if (panels.length === 0) {
            return [];
        }

        return panels;
    }

    getPanel(index: number) {
        return this.getAllPanels()[index];
    }

    enableTransition() {
        this.shadowRoot
            ?.querySelector("[part='main']")
            ?.setAttribute("animating", "");
    }

    disableTransition() {
        this.shadowRoot
            ?.querySelector("[part='main']")
            ?.removeAttribute("animating");
    }

    setPanelsHeight(index: number) {
        const panel = this.getPanel(index);
        this.getMain().style.setProperty(
            "--panel-height",
            `${panel?.offsetHeight}px`
        );
    }

    resetPanelsHeight() {
        this.getMain().style.removeProperty("--panel-height");
    }

    getMain() {
        return this.shadowRoot?.querySelector("[part='main']") as HTMLElement;
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

            [part="head"] {
                position: relative;
            }

            slot[name="tab"],
            slot[name="panel"] {
                display: none;
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

            [part="tab"] {
                position: relative;
                padding: var(--tab-padding);
                cursor: pointer;
            }

            [part="indicator"] {
                display: none;
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
            }

            [part="tab"][active] [part="indicator"] {
                display: block;
            }

            [part="main"][animating] [part="tab"][active] [part="indicator"] {
                display: none;
            }

            [part="transition-indicator"] {
                display: none;
                position: absolute;
                top: 0;
                left: 0;
                transform: translate(var(--tab-left, 0), var(--tab-top, 0));
                width: var(--tab-width);
                height: var(--tab-height);
                pointer-events: none;
            }

            [part="main"][animating] [part="transition-indicator"] {
                display: block;
                transition: var(--tab-indicator-transition);
            }

            [part="indicator"]::after,
            [part="transition-indicator"]::after {
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

            [part="panels"] {
                position: relative;
                height: var(--panel-height, auto);
            }

            [part="main"][animating] [part="panels"] {
                transition: var(--panel-transition);
                overflow: hidden;
            }

            [part="panel"] {
                position: absolute;
                top: 0;
                left: 0;
                opacity: 0;
                visibility: hidden;
                padding: var(--panel-padding);
                pointer-events: none;
            }

            [part="panel"][active] {
                position: relative;
                opacity: 1;
                visibility: visible;
                pointer-events: auto;
            }

            [part="main"][animating] [part="panel"] {
                transition: var(--panel-transition);
            }

            [part="main"][animating] [part="panel"][active] {
                transition-delay: var(--panel-transition-delay);
            }
        `,
    ];
}

declare global {
    interface HTMLElementTagNameMap {
        "ds-tabs": Tabs;
    }
}
