export function getRandomId() {
    return Math.random().toString(16).slice(2);
}

export function getPart(root: HTMLElement, name: string) {
    return root.shadowRoot?.querySelector(`[part='${name}']`) as HTMLElement;
}

export function getParts(root: HTMLElement, name: string | string[]) {
    const names = Array.isArray(name) ? name : [name];

    return (root.shadowRoot?.querySelectorAll(
        names.map((name) => `[part='${name}']`).join(", ")
    ) ?? []) as HTMLElement[];
}

export function getOptions(root: HTMLElement) {
    return Array.from(root.querySelectorAll("ds-option")).map((option) => {
        return {
            element: option,
            label: {
                text: cleanText(option.label),
                raw: option.label,
            },
            description: {
                text: cleanText(option.description),
                raw: option.description,
            },
            value: option.value,
        };
    });
}

function cleanText(text: string) {
    const lines = text.split("\n");

    return lines
        .map((line) => line.trim())
        .join(" ")
        .trim();
}
