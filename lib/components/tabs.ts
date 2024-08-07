import { LitElement, css, html } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import {
    customElement,
    property,
    queryAssignedElements,
} from "lit/decorators.js";
import { config } from "@/lib/config";
import { mainCss, varPercent, varSize } from "../util/style";
import { getOptions, getPart, getParts } from "../util/general";
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
        const options = getOptions(this);

        return html` <div ${ref(this.root)} part="main">
            <div part="head">
                <div part="tabs-container">
                    <div part="tabs">
                        <div part="transition-indicator"></div>
                        ${options.map((option, index) => {
                            return html`
                                <div
                                    part="tab-container"
                                    @click="${() => this.onClick(index)}"
                                >
                                    <div part="indicator"></div>
                                    <button part="tab">
                                        ${unsafeHTML(option.label.raw)}
                                    </button>
                                </div>
                            `;
                        })}
                    </div>
                </div>
            </div>
            <div part="content">
                <div part="panels">
                    ${options.map((option, index) => {
                        return html`
                            <div
                                part="panel"
                                aria-hidden="${index !== this.activeIndex}"
                            >
                                ${unsafeHTML(option.content.raw)}
                            </div>
                        `;
                    })}
                </div>
            </div>
        </div>`;
    }

    protected firstUpdated() {
        this.setupTransitionEnd();
        this.setActive(this.activeIndex, true);
    }

    protected setupTransitionEnd() {
        const indicator = getPart(this, "transition-indicator");

        indicator.addEventListener("transitionend", (e) => {
            if (["left", "top"].includes(e.propertyName)) {
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

    protected onClick(index: number) {
        if (index === this.activeIndex) {
            return;
        }

        this.disableIndicatorTransition();
        this.disablePanelTransition();
        this.moveIndicatorToTab(this.activeIndex);
        this.setPanelsHeight(this.activeIndex);
        this.enableIndicatorTransition();
        this.enablePanelTransition();
        this.setActive(index);
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
        const tabs = [
            ...(this.shadowRoot?.querySelectorAll("[part='tab-container']") ??
                []),
        ].filter(
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
        const panels = [
            ...(this.shadowRoot?.querySelectorAll("[part='panel']") ?? []),
        ].filter(
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
            :host {
                --outline-color-h: var(--primary-color-h);
                --outline-color-s: var(--primary-color-s);
                --outline-color-l: var(--primary-color-l);
                --outline-color-a: 0;
                --tab-font-size: ${varSize(
                    "form-label-font-size-medium",
                    true
                )};
            }

            [part="main"] {
            }

            [part="head"] {
                position: relative;
            }

            [part="tabs-container"] {
                position: relative;
                display: flex;
                border-bottom: ${varSize("form-field-border-width")} solid
                    hsla(
                        var(--form-field-border-color-h),
                        ${varPercent("form-field-border-color-s")},
                        ${varPercent("form-field-border-color-l")},
                        var(--form-field-border-color-a)
                    );
            }

            [part="tabs"] {
                position: relative;
                display: flex;
                margin: 0;
                padding: 0;
            }

            [part="tab-container"] {
                position: relative;
            }

            [part="tab"] {
                position: relative;
                border: none;
                background: none;
                width: 100%;
                padding: ${varSize("tabs-tab-padding-y")}
                    ${varSize("tabs-tab-padding-x")};
                font-size: var(--tab-font-size);
                font-weight: var(--form-label-font-weight);
                color: hsla(
                    var(--form-field-label-color-h),
                    ${varPercent("form-field-label-color-s")},
                    ${varPercent("form-field-label-color-l")},
                    var(--form-field-label-color-a)
                );

                outline-width: var(--outline-width-rem);
                outline-offset: 0;
                outline-style: solid;
                outline-color: hsla(
                    var(--outline-color-h),
                    ${varPercent("outline-color-s")},
                    ${varPercent("outline-color-l")},
                    var(--outline-color-a)
                );
                cursor: pointer;
            }

            [part="tab"]:focus-visible {
                --outline-color-a: 1;
                z-index: 1;
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

            [part="tab-container"][active] [part="indicator"] {
                display: block;
            }

            [part="tab-container"][active]
                [part="indicator"][enable-indicator-transition] {
                display: none;
            }

            [part="transition-indicator"] {
                display: none;
                position: absolute;
                top: var(--tab-top, 0);
                left: var(--tab-left, 0);
                width: var(--tab-width);
                height: var(--tab-height);
                pointer-events: none;
            }

            [part="transition-indicator"][enable-indicator-transition] {
                display: block;
                transition: all var(--tabs-indicator-transition-duration) ease;
            }

            [part="indicator"]::after,
            [part="transition-indicator"]::after {
                content: "";
                position: absolute;
                left: 0;
                bottom: calc(0px - ${varSize("form-field-border-width")});
                width: 100%;
                height: ${varSize("tabs-indicator-height")};
                background-color: hsla(
                    var(--primary-color-h),
                    ${varPercent("primary-color-s")},
                    ${varPercent("primary-color-l")},
                    var(--primary-color-a)
                );
            }

            [part="panels"] {
                position: relative;
                height: var(--panel-height, auto);
            }

            [part="panels"][enable-panel-transition] {
                transition: all var(--tabs-panel-transition-duration) ease;
                overflow: hidden;
            }

            [part="panel"] {
                position: absolute;
                top: 0;
                left: 0;
                opacity: 0;
                visibility: hidden;
                padding: ${varSize("tabs-panel-padding-x")}
                    ${varSize("tabs-panel-padding-y")};
                pointer-events: none;
            }

            [part="panel"][active] {
                position: relative;
                opacity: 1;
                visibility: visible;
                pointer-events: auto;
            }

            [part="panel"][enable-panel-transition] {
                transition: all var(--tabs-panel-transition-duration) ease;
            }

            [part="panel"][enable-panel-transition][active] {
                transition-delay: var(--tabs-indicator-transition-delay);
            }

            :host([type="solid"]) [part="tab"] {
                padding: ${varSize("tabs-solid-tab-padding-y")}
                    ${varSize("tabs-solid-tab-padding-x")};
                border-radius: ${varSize("tabs-solid-tab-border-radius")};
            }

            :host([type="solid"]) [part="tabs"] {
                background-color: hsla(
                    var(--tabs-solid-tab-indicator-color-h),
                    ${varPercent("tabs-solid-tab-indicator-color-s")},
                    ${varPercent("tabs-solid-tab-indicator-color-l")},
                    var(--tabs-solid-tab-indicator-color-a)
                );
                padding: ${varSize("tabs-solid-tab-offset")};
            }

            :host([type="solid"]) [part="tabs"] {
                border-radius: calc(
                    ${varSize("tabs-solid-tab-border-radius")} +
                        ${varSize("tabs-solid-tab-offset")}
                );
            }

            :host([type="solid"]) [part="tabs-container"] {
                border: none;
            }

            :host([type="solid"]) [part="indicator"],
            :host([type="solid"]) [part="transition-indicator"] {
                background-color: hsla(
                    var(--tabs-solid-tab-background-color-h),
                    ${varPercent("tabs-solid-tab-background-color-s")},
                    ${varPercent("tabs-solid-tab-background-color-l")},
                    var(--tabs-solid-tab-background-color-a)
                );
                border-radius: ${varSize("tabs-solid-tab-border-radius")};
            }

            :host([type="solid"]) [part="indicator"]::after,
            :host([type="solid"]) [part="transition-indicator"]::after {
                display: none;
            }

            :host([size="tiny"]) {
                --tab-font-size: ${varSize("form-label-font-size-tiny", true)};
            }

            :host([size="small"]) {
                --tab-font-size: ${varSize("form-label-font-size-small", true)};
            }

            :host([size="large"]) {
                --tab-font-size: ${varSize("form-label-font-size-large", true)};
            }

            :host([size="huge"]) {
                --tab-font-size: ${varSize("form-label-font-size-huge", true)};
            }
        `,
    ];
}

declare global {
    interface HTMLElementTagNameMap {
        "ds-tabs": Tabs;
    }
}
