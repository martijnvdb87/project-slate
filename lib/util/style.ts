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

export function varSize(varName: string) {
    return unsafeCSS(
        `calc((var(--${varName}) / var(--size-medium)) * var(--base-size) * 1rem)`
    );
}
