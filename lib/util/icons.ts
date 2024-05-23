import { html } from "lit";

export function renderIcon(
    value: string | null,
    classes: string | string[] = []
) {
    if (!value) {
        return html``;
    }

    classes = Array.isArray(classes) ? classes : [classes];

    const parts = value.split(":");
    const name = parts[0];
    const type = parts[1] ?? "regular";

    const iconHtml = html`<div part="icon">
        <box-icon
            name="${name}"
            color="var(--icon-color)"
            type="${type}"
        ></box-icon>
    </div>`;

    return html`<div part="icon-container" class="${classes.join(" ")}">
        ${iconHtml}
    </div>`;
}
