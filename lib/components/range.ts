import { LitElement, css, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { config } from "@/lib/config";
import { mainCss, varSize } from "../util/style";
import { getPart, getRandomId } from "../util/general";
import { Ref, createRef, ref } from "lit/directives/ref.js";
import { formField } from "../styles/formField";

@customElement(`${config.prefix}-range`)
export class Range extends LitElement {
    public root: Ref<HTMLInputElement> = createRef();
    public input: Ref<HTMLInputElement> = createRef();

    @property({ type: String })
    protected name = null;

    @property({ type: String })
    protected value = "";

    @state()
    protected minPercent = 0;

    @state()
    protected maxPercent = 0;

    @state()
    protected minValue = 0;

    @state()
    protected maxValue = 0;

    @state()
    protected originalValue = "";

    @property({ type: String })
    protected label: string | null = null;

    @property({ type: Boolean })
    protected readonly = false;

    @property({ type: Boolean })
    protected disabled = false;

    @property({ type: Boolean })
    protected required = false;

    @property({ type: Boolean, attribute: "autofocus" })
    protected inputAutofocus = false;

    @property({ type: Number })
    protected min = 0;

    @property({ type: Number })
    protected max = 100;

    @property({ type: Number })
    protected step = 1;

    @state()
    protected type: "single" | "multiple" = "single";

    @state()
    protected elementId = "";

    @state()
    protected internals;

    protected static formAssociated = true;

    @state()
    protected activeHandle: "min" | "max" | null = "max";

    @state()
    protected showFocusVisual = false;

    public constructor() {
        super();

        const value = this.getAttribute("value") ?? "";

        this.originalValue = value;
        this.value = value;

        this.internals = this.attachInternals();
        this.internals.setFormValue(value);

        this.elementId = getRandomId();
    }

    public formResetCallback() {
        this.value = this.originalValue;
        this.internals.setFormValue(this.value);
    }

    protected getMinMaxValues(value: string) {
        if (this.getSingleOrMultiple(value) === "multiple") {
            const [min, max] = value.split(",");
            return [parseFloat(min), parseFloat(max)];
        }

        return [this.min, parseFloat(value)];
    }

    protected getSingleOrMultiple(value: string) {
        return value.split(",").length === 1 ? "single" : "multiple";
    }

    protected rendeHandles(minValue: number, maxValue: number) {
        this.minPercent = this.getPercent(minValue);
        this.maxPercent = this.getPercent(maxValue);
    }

    protected getPercent(value: number) {
        return (value - this.min) / (this.max - this.min);
    }

    protected updateValue(value: string) {
        this.value = value;
        this.internals.setFormValue(value);

        const [minValue, maxValue] = this.getMinMaxValues(value);
        this.rendeHandles(minValue, maxValue);
    }

    protected render() {
        this.updateValue(this.value);
        const [minValue, maxValue] = this.getMinMaxValues(this.value);
        const classes = [`type-${this.getSingleOrMultiple(this.value)}`];

        if (this.showFocusVisual) {
            classes.push("show-focus-visual");
        }

        return html`
            <div
                ${ref(this.root)}
                part="main"
                class="${classes.join(" ")}"
                style="--value-percent-min: ${this
                    .minPercent}; --value-percent-max: ${this.maxPercent};"
            >
                <label
                    ?hidden="${this.label === null}"
                    part="label"
                    for="${this.elementId}"
                    >${this.label}</label
                >
                <div part="input-container">
                    <div part="slider-container">
                        <div part="slider-filled"></div>
                        ${this.getSingleOrMultiple(this.value) === "multiple"
                            ? html` <input
                                      ${ref(this.input)}
                                      id="${this.elementId}-min"
                                      name="${this.name}-min"
                                      part="input-min"
                                      type="range"
                                      .value="${minValue}"
                                      ?readonly="${this.readonly}"
                                      ?disabled="${this.disabled}"
                                      ?required="${this.required}"
                                      min="${this.min}"
                                      max="${this.max}"
                                      step="${this.step}"
                                      @input="${(e: Event) =>
                                          this.handleInput(e, "min")}"
                                      @focus="${() =>
                                          (this.showFocusVisual = true)}"
                                  />
                                  <div
                                      part="slider-handle-min"
                                      @pointerdown="${() =>
                                          this.onHandlePointerDown("min")}"
                                  ></div>`
                            : html``}
                        <input
                            ${ref(this.input)}
                            id="${this.elementId}-max"
                            name="${this.name}-max"
                            part="input-max"
                            type="range"
                            .value="${maxValue}"
                            ?readonly="${this.readonly}"
                            ?disabled="${this.disabled}"
                            ?required="${this.required}"
                            ?autofocus="${this.inputAutofocus}"
                            min="${this.min}"
                            max="${this.max}"
                            step="${this.step}"
                            @input="${(e: Event) => this.handleInput(e, "max")}"
                            @focus="${() => (this.showFocusVisual = true)}"
                        />
                        <div
                            part="slider-handle-max"
                            @pointerdown="${() =>
                                this.onHandlePointerDown("max")}"
                        ></div>
                    </div>
                </div>
            </div>
        `;
    }

    protected handleInput(e: Event, type: "min" | "max") {
        this.activeHandle = type;

        const value = parseFloat((e.target as HTMLInputElement).value);

        this.showFocusVisual = true;

        if (this.getSingleOrMultiple(this.value) === "single") {
            this.updateValue(`${value}`);

            return;
        }

        this.updateRenderedValue(value);
    }

    protected updateRenderedValue(value: number) {
        value = Math.round(value / this.step) * this.step;
        const showFocusVisual = this.showFocusVisual;

        const [minValue, maxValue] = this.getMinMaxValues(this.value);

        if (this.getSingleOrMultiple(this.value) === "single") {
            this.updateValue(value.toString());

            return;
        }

        if (this.activeHandle === "min" && value > maxValue) {
            this.updateValue(`${maxValue},${value}`);
            this.activeHandle = "max";
            getPart(this, "input-max")?.focus();
            this.showFocusVisual = showFocusVisual;
        } else if (this.activeHandle === "max" && value < minValue) {
            this.updateValue(`${value},${minValue}`);
            this.activeHandle = "min";
            getPart(this, "input-min")?.focus();
            this.showFocusVisual = showFocusVisual;
        } else if (this.activeHandle === "min") {
            this.updateValue(`${value},${maxValue}`);
        } else if (this.activeHandle === "max") {
            this.updateValue(`${minValue},${value}`);
        }
    }

    protected onHandlePointerDown(type: "min" | "max") {
        this.activeHandle = type;

        const onPointerMove = (e: PointerEvent) =>
            this.onHandlePointerMove(e.clientX);

        const onPointerUp = () =>
            this.onHandlePointerUp(onPointerMove, onPointerUp);

        window.addEventListener("pointermove", onPointerMove);
        window.addEventListener("pointerup", onPointerUp);
    }

    protected onHandlePointerUp(
        onPointerMove: (e: PointerEvent) => void,
        onPointerUp: () => void
    ) {
        window.removeEventListener("pointermove", onPointerMove);
        window.removeEventListener("pointerup", onPointerUp);
        getPart(this, "input-" + this.activeHandle)?.focus();

        this.showFocusVisual = false;
        this.activeHandle = null;
    }

    protected onHandlePointerMove(startX: number) {
        if (!this.activeHandle) {
            return;
        }

        this.showFocusVisual = false;

        const container = getPart(this, "slider-container");
        const containerRect = container.getBoundingClientRect();

        const x = startX - containerRect.left;
        const percent = Math.max(Math.min(x / containerRect.width, 1), 0);
        const value = this.min + percent * (this.max - this.min);

        this.updateRenderedValue(value);
    }

    public static styles = [
        mainCss,
        formField,
        css`
            :host {
                user-select: none;

                --value-percent-min: 0;
                --value-percent-max: 0;

                --handle-size: ${varSize("range-handle-size")};
                --slider-size: ${varSize("range-slider-size")};

                --border-width: ${varSize("range-border-width")};
                --border-radius: ${varSize("range-border-radius")};
            }

            input {
                pointer-events: none;
                height: 0;
                width: 0;
                opacity: 0;
            }

            [part="main"] {
                position: relative;
                flex-grow: 1;
                touch-action: pan-y;
            }

            [part="input-container"] {
                padding: ${varSize("range-padding-y")}
                    ${varSize("range-padding-x")};
                border-radius: var(--border-radius);
            }

            [part="slider-container"] {
                position: relative;
                height: var(--slider-size);
                background: hsla(
                    var(--background-color-h),
                    var(--background-color-s),
                    var(--background-color-l),
                    var(--background-color-a)
                );
                border-radius: var(--border-radius);
                border-color: hsla(
                    var(--border-color-h),
                    var(--border-color-s),
                    var(--border-color-l),
                    var(--border-color-a)
                );
                border-style: solid;
                border-width: var(--border-width);
            }

            [part="slider-filled"] {
                position: absolute;
                top: calc(0px - var(--border-width));
                height: var(--slider-size);
                background-color: hsla(
                    var(--primary-color-h),
                    var(--primary-color-s),
                    calc(
                        var(--primary-color-l) +
                            var(
                                --form-field-range-slider-filled-color-l-modifier
                            )
                    ),
                    1
                );
                border-radius: var(--border-radius) 0 0 var(--border-radius);
            }

            .type-single [part="slider-filled"] {
                left: calc(
                    var(--value-percent-min) *
                        (100% - var(--handle-size) + var(--border-width) * 2) -
                        var(--border-width)
                );
                width: calc(
                    (var(--value-percent-max) - var(--value-percent-min)) *
                        (100% - var(--handle-size) + var(--border-width) * 2) +
                        var(--handle-size) / 2
                );
                border-radius: var(--border-radius) 0 0 var(--border-radius);
            }

            .type-multiple [part="slider-filled"] {
                left: calc(
                    var(--value-percent-min) *
                        (100% - var(--handle-size) + var(--border-width) * 2) -
                        var(--border-width) + var(--handle-size) / 2
                );
                width: calc(
                    (var(--value-percent-max) - var(--value-percent-min)) *
                        (100% - var(--handle-size) + var(--border-width) * 2)
                );
                border-radius: 0;
            }

            [part="slider-handle-min"],
            [part="slider-handle-max"] {
                position: absolute;
                top: calc(
                    var(--slider-size) / 2 - var(--handle-size) / 2 -
                        var(--border-width) -
                        ${varSize("range-pointer-padding")}
                );
                height: calc(
                    var(--handle-size) + ${varSize("range-pointer-padding")} * 2
                );
                width: calc(
                    var(--handle-size) + ${varSize("range-pointer-padding")} * 2
                );
                border-radius: var(--border-radius);
            }

            [part="slider-handle-min"] {
                left: calc(
                    var(--value-percent-min) * (100% + var(--border-width) * 2) -
                        (var(--handle-size) * var(--value-percent-min)) -
                        var(--border-width) -
                        ${varSize("range-pointer-padding")}
                );
            }

            [part="slider-handle-max"] {
                left: calc(
                    var(--value-percent-max) * (100% + var(--border-width) * 2) -
                        (var(--handle-size) * var(--value-percent-max)) -
                        var(--border-width) -
                        ${varSize("range-pointer-padding")}
                );
            }

            [part="slider-handle-min"]::before,
            [part="slider-handle-max"]::before {
                content: "";
                position: absolute;
                top: ${varSize("range-pointer-padding")};
                left: ${varSize("range-pointer-padding")};
                height: var(--handle-size);
                width: var(--handle-size);
                background-color: hsla(
                    var(--primary-color-h),
                    var(--primary-color-s),
                    var(--primary-color-l),
                    var(--primary-color-a)
                );
                border-radius: var(--border-radius);
            }

            .show-focus-visual [part="input-min"] + div,
            .show-focus-visual [part="input-max"] + div {
                outline-width: var(--outline-width-rem);
                outline-offset: calc(
                    0px - var(--border-width) -
                        ${varSize("range-pointer-padding")} +
                        ${varSize("range-outline-offset")}
                );
                outline-style: solid;
                outline-color: hsla(
                    var(--outline-color-h),
                    var(--outline-color-s),
                    var(--outline-color-l),
                    var(--outline-color-a)
                );
            }

            .show-focus-visual [part="input-min"]:focus-visible + div,
            .show-focus-visual [part="input-max"]:focus-visible + div {
                --outline-color-h: var(
                    --validation-border-color-h,
                    var(--primary-color-h)
                );
                --outline-color-s: var(
                    --validation-border-color-s,
                    var(--primary-color-s)
                );
                --outline-color-l: var(
                    --validation-border-color-l,
                    var(--primary-color-l)
                );
                --outline-color-a: 1;
            }
        `,
    ];
}

declare global {
    interface HTMLElementTagNameMap {
        "ds-range": Range;
    }
}
