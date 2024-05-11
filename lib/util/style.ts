import config from "@/lib/config.json" assert { type: "json" };

export function size(value: number): string {
    const size = value.toString().split(".").join("_");

    return `var(--${config.prefix}-size-${size}, ${value / 4}rem)`;
}
