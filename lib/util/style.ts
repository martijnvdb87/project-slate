import { unsafeCSS } from "lit";
import { reset } from "../styles/reset.ts";
import { main } from "../styles/main.ts";

export const mainCss = [reset, main];

export function size(value: number) {
    const size = value / 16;

    return unsafeCSS(`${size}rem`);
}
