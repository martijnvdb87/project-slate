import { unsafeCSS } from "lit";
import reset from "../css/reset.css?inline";
import main from "../css/main.ts";

export function mainCss() {
    return unsafeCSS(`${reset} ${main}`);
}

export function size(value: number) {
    const size = value / 4;

    return unsafeCSS(
        `var(--ds-size-${size.toString().replace(".", "_")}, ${size}rem)`
    );
}
