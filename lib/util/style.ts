import { unsafeCSS } from "lit";
import { config } from "@/lib/config";

export function cssSize(value: number) {
    const size = value.toString().split(".").join("_");

    return unsafeCSS(`var(--${config.prefix}-size-${size}, ${value / 4}rem)`);
}

export function cssVar(value: string) {
    return unsafeCSS(`var(--${config.prefix}-${value}, --${value})`);
}
