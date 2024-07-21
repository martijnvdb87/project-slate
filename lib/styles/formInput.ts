import { css } from "lit";
import "@/lib/assets/fonts/inter/inter.css";
import { varSize } from "../util/style";

export const formInput = css`
    :host {
        display: var(--display);
        vertical-align: bottom;

        --display: inline-flex;
        --field-size: var(--base-size-rem);

        --padding-y: ${varSize("form-field-padding-y")};
        --padding-x: ${varSize("form-field-padding-x")};

        --icon-size: ${varSize("form-field-icon-size")};
        --icon-container-size: calc(
            var(--field-size) - var(--border-width) * 2
        );
        --icon-color: hsla(
            var(--form-field-icon-color-h),
            var(--form-field-icon-color-s),
            var(--form-field-icon-color-l),
            var(--form-field-icon-color-a)
        );

        --font-family: var(--form-field-font-family);
        --font-size: ${varSize("form-field-font-size-medium", true)};
        --font-weight: var(--form-field-font-weight);

        --text-color-h: var(--form-field-text-color-h);
        --text-color-s: var(--form-field-text-color-s);
        --text-color-l: var(--form-field-text-color-l);
        --text-color-a: var(--form-field-text-color-a);

        --placeholder-color-h: var(--form-field-placeholder-color-h);
        --placeholder-color-s: var(--form-field-placeholder-color-s);
        --placeholder-color-l: var(--form-field-placeholder-color-l);
        --placeholder-color-a: var(--form-field-placeholder-color-a);
        --placeholder-weight: var(--form-field-placeholder-weight);

        --label-font-weight: var(--form-label-font-weight);
        --label-font-size: ${varSize("form-label-font-size-medium", true)};

        --label-color-h: var(--form-field-label-color-h);
        --label-color-s: var(--form-field-label-color-s);
        --label-color-l: var(--form-field-label-color-l);
        --label-color-a: var(--form-field-label-color-a);

        --background-color-h: var(--form-field-background-color-h);
        --background-color-s: var(--form-field-background-color-s);
        --background-color-l: var(--form-field-background-color-l);
        --background-color-a: var(--form-field-background-color-a);

        --border-radius: ${varSize("form-field-border-radius", true)};
        --border-width: ${varSize("form-field-border-width")};
        --border-color-h: var(--form-field-border-color-h);
        --border-color-s: var(--form-field-border-color-s);
        --border-color-l: var(--form-field-border-color-l);
        --border-color-a: var(--form-field-border-color-a);

        --outline-color-h: var(--primary-color-h);
        --outline-color-s: var(--primary-color-s);
        --outline-color-l: var(--primary-color-l);
        --outline-color-a: 0;

        --validation-font-size: ${varSize(
            "form-field-validation-font-size-medium",
            true
        )};
    }

    [part="main"] {
        position: relative;
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        gap: ${varSize("form-field-row-gap")};
    }

    [part="label"] {
        display: inline-block;
        font-size: var(--label-font-size);
        font-weight: var(--label-font-weight);

        color: hsla(
            var(--label-color-h),
            var(--label-color-s),
            var(--label-color-l),
            var(--label-color-a)
        );
    }

    [part="validation-message"] {
        font-size: var(--validation-font-size);
        color: hsl(
            var(--validation-border-color-h),
            var(--validation-border-color-s),
            var(--validation-border-color-l),
            var(--validation-border-color-a)
        );
    }

    :host([size="tiny"]) {
        --font-size: ${varSize("form-field-font-size-tiny", true)};
        --label-font-size: ${varSize("form-label-font-size-tiny", true)};
        --validation-font-size: ${varSize(
            "form-field-validation-font-size-tiny",
            true
        )};
    }

    :host([size="small"]) {
        --font-size: ${varSize("form-field-font-size-small", true)};
        --label-font-size: ${varSize("form-label-font-size-small", true)};
        --validation-font-size: ${varSize(
            "form-field-validation-font-size-small",
            true
        )};
    }

    :host([size="large"]) {
        --font-size: ${varSize("form-field-font-size-large", true)};
        --label-font-size: ${varSize("form-label-font-size-large", true)};
        --validation-font-size: ${varSize(
            "form-field-validation-font-size-large",
            true
        )};
    }

    :host([size="huge"]) {
        --font-size: ${varSize("form-field-font-size-huge", true)};
        --label-font-size: ${varSize("form-label-font-size-huge", true)};
        --validation-font-size: ${varSize(
            "form-field-validation-font-size-huge"
        )};
    }

    :host([width="full"]) {
        --display: flex;
    }

    :host([shape="square"]) {
        --border-radius: 0;
    }

    :host([shape="pill"]) {
        --border-radius: var(--shape-pill-radius);
    }

    :host([disabled]) {
        opacity: 0.75;
        --text-color-a: 0.5;
        pointer-events: none;
    }

    [part="icon"] {
        display: flex;
        align-items: center;
        justify-content: center;
        width: var(--icon-size);
        height: var(--icon-size);
        pointer-events: none;
    }

    :host([error]) {
        --validation-border-color-h: var(--error-color-h);
        --validation-border-color-s: var(--error-color-s);
        --validation-border-color-l: var(--error-color-l);
        --validation-border-color-a: var(--error-color-a);

        --validation-icon-color-h: var(--error-color-h);
        --validation-icon-color-s: var(--error-color-s);
        --validation-icon-color-l: var(--error-color-l);
        --validation-icon-color-a: var(--error-color-a);
    }

    :host([success]) {
        --validation-icon-color-h: var(--success-color-h);
        --validation-icon-color-s: var(--success-color-s);
        --validation-icon-color-l: var(--success-color-l);
        --validation-icon-color-a: var(--success-color-a);
    }
`;
