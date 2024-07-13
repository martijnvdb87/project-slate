import { unsafeCSS } from "lit";
import { reset } from "../styles/reset.ts";
import { main } from "../styles/main.ts";

export const mainCss = [reset, main];

export function size(value: number) {
    const size = value / 16;

    return unsafeCSS(`${size}rem`);
}

export function sizer(value: number, rounding?: "up" | "down" | "nearest") {
    if (rounding) {
        return unsafeCSS(
            `round(${rounding}, calc((${value} / var(--size-medium)) * var(--base-size) * 1rem), 2px)`
        );
    }

    return unsafeCSS(
        `calc((${value} / var(--size-medium)) * var(--base-size) * 1rem)`
    );
}

export function varSize(varName: string, rounding?: "up" | "down" | "nearest") {
    if (rounding) {
        return unsafeCSS(
            `round(${rounding}, calc((${varName} / var(--size-medium)) * var(--base-size) * 1rem), 2px)`
        );
    }
    return unsafeCSS(
        `calc((var(--${varName}) / var(--size-medium)) * var(--base-size) * 1rem)`
    );
}
