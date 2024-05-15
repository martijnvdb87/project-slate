import { unsafeCSS } from "lit";
import { config } from "@/lib/config";
import main from "../css/main.css?inline";
import colors from "../css/colors.css?inline";
import { FontWeight } from "../enums/fontWeight";

export function cssSize(value: number) {
    const size = value.toString().split(".").join("_");

    return unsafeCSS(`var(--${config.prefix}-size-${size}, ${value / 4}rem)`);
}

export function cssVar(value: string) {
    return unsafeCSS(`var(--${config.prefix}-${value}, var(--${value}))`);
}

export function mainCss() {
    return unsafeCSS(`${main} ${colors}`);
}

export function cssFontWeight(value: FontWeight) {
    return unsafeCSS(
        `var(--${config.prefix}-font-weight-${value}, var(--font-weight-${value}))`
    );
}
