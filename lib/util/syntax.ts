export function html(content: TemplateStringsArray, ...args: string[]): string {
    return mergeContents(content, ...args);
}

export function css(content: TemplateStringsArray, ...args: string[]): string {
    return mergeContents(content, ...args);
}

function mergeContents(
    content: TemplateStringsArray,
    ...args: string[]
): string {
    return content
        .map((value, index) => `${value}${args[index] ?? ""}`)
        .join("");
}
