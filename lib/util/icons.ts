import { html } from "lit";

export function renderIcon(value: string) {
    if (!value) {
        return html``;
    }

    const parts = value.split(":");
    const name = parts[0];
    const type = parts[1] ?? "regular";

    return html`<div part="icon">
        <box-icon
            name="${name}"
            color="var(--icon-color)"
            type="${type}"
        ></box-icon>
    </div>`;
}
