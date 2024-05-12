export function html(content: TemplateStringsArray, ...args: string[]): string {
    return content
        .map((value, index) => `${value}${args[index] ?? ""}`)
        .join("");
}
