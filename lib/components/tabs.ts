import { LitElement, css, html } from "lit";
import {
    customElement,
    property,
    queryAssignedElements,
} from "lit/decorators.js";
import { config } from "@/lib/config";
import { mainCss, size } from "../util/style";
import { getPart, getParts } from "../util/general";
import { Ref, createRef, ref } from "lit/directives/ref.js";

@customElement(`${config.prefix}-tabs`)
export class Tabs extends LitElement {
    public root: Ref<HTMLInputElement> = createRef();

    @property({ attribute: "active-index", type: Number })
    protected activeIndex = 0;

    @queryAssignedElements({ slot: "tab" })
    protected tabs!: HTMLElement[];

    @queryAssignedElements({ slot: "panel" })
    protected panels!: HTMLElement[];

    protected render() {
        return html` <div ${ref(this.root)} part="main">
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

    protected firstUpdated() {
        this.renderTabs();
        this.renderPanels();
        this.setupTransitionEnd();

        this.setActive(this.activeIndex, true);
    }

    protected renderTabs() {
        const root = getPart(this, "tabs");

        root.innerHTML = "";

        this.tabs.forEach((tab, index) => {
            const tabRoot = document.createElement("div");
            tabRoot.setAttribute("part", "tab");
            tabRoot.appendChild(tab);

            const indicator = document.createElement("div");
            indicator.setAttribute("part", "indicator");
            tabRoot.appendChild(indicator);

            tabRoot.addEventListener("click", () => {
                this.disableIndicatorTransition();
                this.disablePanelTransition();
                this.moveIndicatorToTab(this.activeIndex);
                this.setPanelsHeight(this.activeIndex);
                this.enableIndicatorTransition();
                this.enablePanelTransition();
                this.setActive(index);
            });

            root.appendChild(tabRoot);
        });
    }

    protected renderPanels() {
        const root = getPart(this, "panels");

        root.innerHTML = "";

        this.panels.forEach((panel) => {
            const panelRoot = document.createElement("div");
            panelRoot.setAttribute("part", "panel");
            panelRoot.appendChild(panel);
            root.appendChild(panelRoot);
        });
    }

    protected setupTransitionEnd() {
        const indicator = getPart(this, "transition-indicator");

        indicator.addEventListener("transitionend", (e) => {
            if (e.propertyName === "transform") {
                this.disableIndicatorTransition();
            }
        });

        getParts(this, ["panel", "panels"]).forEach((element) => {
            element.addEventListener("transitionend", (e) => {
                if (e.propertyName === "height") {
                    this.disablePanelTransition();
                    this.resetPanelsHeight();
                }
            });
        });
    }

    protected setActive(index: number, firstUpdated = false) {
        this.activeIndex = index;

        for (const tab of this.getAllTabs()) {
            tab.removeAttribute("active");
        }

        for (const panel of this.getAllPanels()) {
            panel.removeAttribute("active");
            panel.setAttribute("aria-hidden", "true");
        }

        this.moveIndicatorToTab(this.activeIndex);

        if (!firstUpdated) {
            this.setPanelsHeight(this.activeIndex);
        }

        const activeTab = this.getTab(this.activeIndex);
        const activePanel = this.getPanel(this.activeIndex);

        activeTab.setAttribute("active", "true");

        activePanel.setAttribute("active", "true");
        activePanel.setAttribute("aria-hidden", "false");
    }

    protected tabToIndex(tab: HTMLElement) {
        return this.getAllTabs().indexOf(tab);
    }

    protected getAllTabs() {
        const root = getPart(this, "tabs");

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

    protected getTab(index: number) {
        return this.getAllTabs()[index];
    }

    protected getActiveTab() {
        return this.getTab(this.activeIndex);
    }

    protected moveIndicatorToTab(index: number) {
        const tab = this.getTab(index);
        const indicator = getPart(this, "transition-indicator");

        if (!indicator || !tab) {
            return;
        }

        getPart(this, "main").style.setProperty(
            "--tab-width",
            `${tab.offsetWidth}px`
        );
        getPart(this, "main").style.setProperty(
            "--tab-height",
            `${tab.offsetHeight}px`
        );

        getPart(this, "main").style.setProperty(
            "--tab-left",
            `${tab.offsetLeft - (tab.parentElement?.offsetLeft ?? 0)}px`
        );

        getPart(this, "main").style.setProperty(
            "--tab-top",
            `${tab.offsetTop - (tab.parentElement?.offsetTop ?? 0)}px`
        );
    }

    protected getAllPanels() {
        const root = getPart(this, "panels");

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

    protected getPanel(index: number) {
        return this.getAllPanels()[index];
    }

    protected enableIndicatorTransition() {
        getParts(this, ["indicator", "transition-indicator"]).forEach(
            (element) => {
                element.setAttribute("enable-indicator-transition", "");
            }
        );
    }

    protected disableIndicatorTransition() {
        getParts(this, ["indicator", "transition-indicator"]).forEach(
            (element) => {
                element.removeAttribute("enable-indicator-transition");
            }
        );
    }

    protected enablePanelTransition() {
        getParts(this, ["panels", "panel"]).forEach((element) => {
            element.setAttribute("enable-panel-transition", "");
        });
    }

    protected disablePanelTransition() {
        getParts(this, ["panels", "panel"]).forEach((element) => {
            element.removeAttribute("enable-panel-transition");
        });
    }

    protected setPanelsHeight(index: number) {
        const panel = this.getPanel(index);
        getPart(this, "main").style.setProperty(
            "--panel-height",
            `${panel?.offsetHeight}px`
        );
    }

    protected resetPanelsHeight() {
        getPart(this, "main").style.removeProperty("--panel-height");
    }

    public static styles = [
        mainCss,
        css`
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
                padding: ${size(12)} ${size(24)};
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

            [part="tab"][active]
                [part="indicator"][enable-indicator-transition] {
                display: none;
            }

            [part="transition-indicator"] {
                display: none;
                position: absolute;
                top: 0;
                left: 0;
                left: var(--tab-left, 0);
                width: var(--tab-width);
                height: var(--tab-height);
                pointer-events: none;
            }

            [part="transition-indicator"][enable-indicator-transition] {
                display: block;
                transition: all 320ms ease;
            }

            [part="indicator"]::after,
            [part="transition-indicator"]::after {
                content: "";
                position: absolute;
                left: 0;
                bottom: calc(0px - var(--input-border-width));
                width: 100%;
                height: ${size(4)};
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

            [part="panels"][enable-panel-transition] {
                transition: all 480ms ease;
                overflow: hidden;
            }

            [part="panel"] {
                position: absolute;
                top: 0;
                left: 0;
                opacity: 0;
                visibility: hidden;
                padding: ${size(16)} ${size(16)};
                pointer-events: none;
            }

            [part="panel"][active] {
                position: relative;
                opacity: 1;
                visibility: visible;
                pointer-events: auto;
            }

            [part="panel"][enable-panel-transition] {
                transition: all 320ms ease;
            }

            [part="panel"][enable-panel-transition][active] {
                transition-delay: 160ms;
            }
        `,
    ];
}

declare global {
    interface HTMLElementTagNameMap {
        "ds-tabs": Tabs;
    }
}
