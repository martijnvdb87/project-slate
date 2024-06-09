import { unsafeCSS } from "lit";
import { reset } from "../css/reset.ts";
import { main } from "../css/main.ts";
import "../css/global.ts";

export const mainCss = [reset, main];

export function size(value: number) {
    const size = value / 16;

    return unsafeCSS(
        `var(--ds-size-${size.toString().replace(".", "_")}, ${size}rem)`
    );
}
