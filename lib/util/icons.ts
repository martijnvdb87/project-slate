import { html } from "lit";

export function renderIcon(value: string, classes: string | string[] = []) {
    if (!value) {
        return html``;
    }

    classes = Array.isArray(classes) ? classes : [classes];

    const parts = value.split(":");
    const name = parts[0];
    const type = parts[1] ?? "regular";

    return html`<div part="icon" class="${classes.join(" ")}">
        <box-icon
            name="${name}"
            color="var(--icon-color)"
            type="${type}"
        ></box-icon>
    </div>`;
}
