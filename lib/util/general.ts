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
