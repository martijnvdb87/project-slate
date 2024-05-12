import config from "@/lib/config.json" assert { type: "json" };

export function size(value: number): string {
    const size = value.toString().split(".").join("_");

    return `var(--${config.prefix}-size-${size}, ${value / 4}rem)`;
}

export function styleDeclation(
    styleDeclation: Partial<CSSStyleDeclaration>
): string {
    const temp = document.createElement("div");

    Object.entries(styleDeclation).forEach(([property, value]) => {
        temp.style[property as any] = value?.toString() ?? "";
    });

    const cssText = temp.style.cssText;
    temp.remove();

    return cssText;
}

export function css(
    selector: string,
    declation: Partial<CSSStyleDeclaration>
): string {
    const temp = document.createElement("div");

    Object.entries(declation).forEach(([property, value]) => {
        temp.style[property as any] = value?.toString() ?? "";
    });

    const cssText = temp.style.cssText;
    temp.remove();

    return `${selector} { ${cssText} };`;
}
