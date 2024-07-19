import { css } from "lit";
import "@/lib/assets/fonts/inter/inter.css";
import { varSize } from "../util/style";

export const formToggle = css`
    :host {
        display: flex;
        vertical-align: bottom;

        --field-size: var(--base-size-rem);
        --box-size: ${varSize("form-toggle-size")};

        --border-radius: ${varSize("form-toggle-border-radius")};
        --border-width: ${varSize("form-toggle-border-width")};

        --border-color-h: var(--form-field-border-color-h);
        --border-color-s: var(--form-field-border-color-s);
        --border-color-l: var(--form-field-border-color-l);
        --border-color-a: var(--form-field-border-color-a);

        --background-color-h: var(--form-field-background-color-h);
        --background-color-s: var(--form-field-background-color-s);
        --background-color-l: var(--form-field-background-color-l);
        --background-color-a: var(--form-field-background-color-a);

        --gap: ${varSize("form-toggle-column-gap")};

        --label-font-size: var(--form-label-font-size-medium);
        --font-size: var(--font-size-medium);

        --outline-color-h: var(--primary-color-h);
        --outline-color-s: var(--primary-color-s);
        --outline-color-l: var(--primary-color-l);
        --outline-color-a: 0;

        --card-border-width: initial;
        --card-border-style: initial;
        --card-border-radius: initial;
        --card-padding-y: initial;
        --card-padding-x: initial;
        --card-border-color-h: initial;
        --card-border-color-s: initial;
        --card-border-color-l: initial;
        --card-border-color-a: initial;
        --card-background-color-h: initial;
        --card-background-color-s: initial;
        --card-background-color-l: initial;
        --card-background-color-a: initial;
        --card-outline-color-h: var(--primary-color-h);
        --card-outline-color-s: var(--primary-color-s);
        --card-outline-color-l: var(--primary-color-l);
        --card-outline-color-a: 0;
    }

    [part="main"] {
        position: relative;
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        gap: ${varSize("form-toggle-row-gap")};
        font-family: var(--global-font-family);
        font-size: var(--font-size);
        line-height: var(--text-line-height);
    }

    [part="toggle-container"] {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        width: var(--field-size);
        height: var(--field-size);
        flex-shrink: 0;
        flex-grow: 0;
    }

    [part="input"] {
        position: absolute;
        top: 0;
        left: 0;
        width: var(--field-size);
        height: var(--field-size);
        opacity: 0;
        z-index: 999;
        cursor: pointer;
    }
    :host([card]) [part="input"] {
        width: 100%;
        height: 100%;
    }

    [part="input"]:focus-visible + [part="card"] {
        --outline-color-a: 1;
    }

    :host([card]) [part="input"]:focus-visible + [part="card"] {
        --outline-color-a: 0;
        --card-outline-color-a: 1;
    }

    [part="input-container"] {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        pointer-events: none;
        width: var(--box-size);
        height: var(--box-size);

        border-radius: var(--border-radius);
        border-width: var(--border-width);
        border-style: solid;
        border-color: hsla(
            var(--border-color-h),
            var(--border-color-s),
            var(--border-color-l),
            var(--border-color-a)
        );

        background-color: hsla(
            var(--background-color-h),
            var(--background-color-s),
            var(--background-color-l),
            var(--background-color-a)
        );

        outline-width: var(--outline-width-rem);
        outline-offset: calc(
            0px - var(--border-width) + ${varSize("form-toggle-outline-offset")}
        );
        outline-style: solid;
        outline-color: hsla(
            var(--outline-color-h),
            var(--outline-color-s),
            var(--outline-color-l),
            var(--outline-color-a)
        );
    }

    [part="card"] {
        display: flex;
        gap: var(--gap);
        border-width: var(--card-border-width);
        border-style: var(--card-border-style);
        border-radius: var(--card-border-radius);
        border-color: hsla(
            var(--card-border-color-h),
            var(--card-border-color-s),
            var(--card-border-color-l),
            var(--card-border-color-a)
        );
        border-color: hsla(
            var(--card-border-color-h),
            var(--card-border-color-s),
            var(--card-border-color-l),
            var(--card-border-color-a)
        );
        background-color: hsla(
            var(--card-background-color-h),
            var(--card-background-color-s),
            var(--card-background-color-l),
            var(--card-background-color-a)
        );
        padding: var(--card-padding-y) var(--card-padding-x);
        outline-width: var(--outline-width-rem);
        outline-offset: calc(0px - var(--card-border-width));
        outline-style: solid;
        outline-color: hsla(
            var(--card-outline-color-h),
            var(--card-outline-color-s),
            var(--card-outline-color-l),
            var(--card-outline-color-a)
        );
    }

    [part="text-container"] {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: ${varSize("form-toggle-row-gap")};
        color: hsla(
            var(--form-field-label-color-h),
            var(--form-field-label-color-s),
            var(--form-field-label-color-l),
            var(--form-field-label-color-a)
        );
        padding: calc(
                (var(--base-size-rem) - ${varSize("form-toggle-size")}) / 2
            )
            0;
    }

    [part="label"] {
        display: inline-flex;
        cursor: pointer;
        font-weight: var(--form-label-font-weight);
        font-size: var(--label-font-size);
    }

    ::slotted([slot="description"]) {
        color: hsla(
            var(--text-color-h),
            var(--text-color-s),
            var(--text-color-l),
            var(--text-color-a)
        );
        margin-bottom: var(--margin-bottom);
    }

    :host([size="small"]) {
        --font-size: var(--font-size-small);
    }

    :host([size="large"]) {
        --font-size: var(--font-size-large);
    }

    :host([size="huge"]) {
        --font-size: var(--font-size-huge);
    }

    :host([shape="square"]) {
        --border-radius: 0;
    }

    :host([shape="pill"]) {
        --border-radius: var(--shape-pill-radius);
    }

    :host([shape="circle"]) {
        --border-radius: 50%;
    }

    :host([disabled]) {
        opacity: 0.75;
        pointer-events: none;
    }

    :host([card]) {
        --card-border-width: ${varSize("form-card-border-width")};
        --card-border-style: var(--form-card-border-style);
        --card-border-radius: ${varSize("form-card-border-radius")};
        --card-padding-y: ${varSize("form-card-padding-y")};
        --card-padding-x: ${varSize("form-card-padding-x")};
        --card-border-color-h: var(--form-card-border-color-h);
        --card-border-color-s: var(--form-card-border-color-s);
        --card-border-color-l: var(--form-card-border-color-l);
        --card-border-color-a: var(--form-card-border-color-a);
        --card-background-color-h: var(--form-card-background-color-h);
        --card-background-color-s: var(--form-card-background-color-s);
        --card-background-color-l: var(--form-card-background-color-l);
        --card-background-color-a: var(--form-card-background-color-a);

        --outline-color-a: 0;
    }
`;
