import { unsafeCSS } from "lit";
import { reset } from "../styles/reset.ts";
import { main } from "../styles/main.ts";

export const mainCss = [reset, main];

export function size(value: number) {
    const size = value / 16;

    return unsafeCSS(`${size}rem`);
}

export function sizer(value: number) {
    return unsafeCSS(
        `calc((${value} / var(--size-medium)) * var(--base-size) * 1rem)`
    );
}

export function varSize(varName: string, fixed: boolean = false) {
    if (fixed) {
        return unsafeCSS(`calc(var(--${varName}) * 0.0625rem)`);
    }

    return unsafeCSS(
        `calc((var(--${varName}) / var(--size-medium)) * var(--base-size) * 1rem)`
    );
}

export function themeModifier(
    lightMode: string | number,
    darkMode: string | number
) {
    return unsafeCSS(
        `calc(${lightMode} * var(--global-light-mode) + ${darkMode} * var(--global-dark-mode))`
    );
}

export function varPercent(varName: string) {
    return unsafeCSS(`calc(var(--${varName}) * 1%)`);
}

export function varPercentContrast(
    varName: string,
    contrastVarName?: string,
    unit: string = "%"
) {
    const value = `var(--${varName})`;
    const contrast = `var(--${contrastVarName})`;
    const normalizedContrast = `(max(min(max(${contrast}, ${contrast} * -1), 1), -1))`;

    const isHighValue = `(round(${value} / 100))`;
    const isLowValue = `(1 - ${isHighValue})`;

    const contrastPrecision = `0.0000001`;
    const isPositiveContrast = `(min(max(round(up, ${contrast} + ${contrastPrecision}), 0), 1))`;
    const isNegativeContrast = `(1 - ${isPositiveContrast})`;

    const positiveRest = `(max(100 - ${value}, ${value}))`;
    const negativeRest = `(min(100 - ${value}, ${value}))`;

    return unsafeCSS(`calc((
        ${isHighValue} * ${isPositiveContrast} * (${positiveRest} - ${positiveRest} * ${normalizedContrast}) +
        ${isHighValue} * ${isNegativeContrast} * (${negativeRest} * ${normalizedContrast} + ${positiveRest}) +
        ${isLowValue} * ${isPositiveContrast} * (${positiveRest} * ${normalizedContrast} + ${negativeRest}) +
        ${isLowValue} * ${isNegativeContrast} * (${negativeRest} - ${negativeRest} * ${normalizedContrast})
    ) * 1${unit})`);
}
