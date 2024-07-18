import { css } from "lit";
import { size } from "../util/style";

const themeDark = css`
    --main-background-color-s: 0%;
    --main-background-color-l: 10%;

    --text-color-s: 0%;
    --text-color-l: 80%;

    --default-color-s: 0%;
    --default-color-l: 22%;

    --default-accent-s: 0%;
    --default-accent-l: 96%;

    --primary-color-l: 38%;
    --primary-accent-l: 96%;
    --secondary-color-l: 12%;
    --secondary-accent-l: 100%;
    --error-color-l: 40%;
    --success-color-l: 40%;

    --form-field-text-color-s: 0%;
    --form-field-text-color-l: 96%;

    --form-field-icon-color-s: 0%;
    --form-field-icon-color-l: 46%;

    --form-field-background-color-s: 0%;
    --form-field-background-color-l: 12%;

    --form-field-label-colorsl: 0%;
    --form-field-label-color-l: 100%;

    --form-field-border-color-s: 0%;
    --form-field-border-color-l: 36%;

    --form-field-range-slider-filled-color-l-modifier: -10%;

    --form-field-checkbox-icon-color-h: var(--primary-accent-h);
    --form-field-checkbox-icon-color-s: var(--main-background-color-s);
    --form-field-checkbox-icon-color-l: var(--main-background-color-l);
    --form-field-checkbox-icon-color-a: var(--primary-accent-a);
`;

export const global = css`
    :root {
        /* ---- Global ---- */
        --global-border-radius: 5;
        --global-border-width: 1;
        --global-font-family: var(--global-font-sans);

        --global-font-sans: InterVariable, Inter, ui-sans-serif, system-ui,
            sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
            "Noto Color Emoji";
        --global-font-serif: ui-serif, Georgia, Cambria, "Times New Roman",
            Times, serif;
        --global-font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco,
            Consolas, "Liberation Mono", "Courier New", monospace;

        /* ---- Size ---- */
        --size-tiny: 24;
        --size-small: 32;
        --size-medium: 40;
        --size-large: 48;
        --size-huge: 56;

        /* ---- Outline ---- */
        --outline-width: 2;
        --outline-offset: 2;

        /* ---- Button ---- */
        --button-padding-x: 16;
        --button-padding-y: 4;
        --button-gap: 8;
        --button-icon-size: 20;

        --button-font-family: var(--global-font-sans);
        --button-font-size-tiny: 12;
        --button-font-size-small: 13;
        --button-font-size-medium: 14;
        --button-font-size-large: 16;
        --button-font-size-huge: 18;
        --button-font-weight: 500;

        /* ---- Form field ---- */
        --form-field-border-width: var(--global-border-width);
        --form-field-border-radius: var(--global-border-radius);
        --form-field-padding-y: 8;
        --form-field-padding-x: 12;
        --form-field-icon-size: 20;

        --form-field-font-family: var(--global-font-sans);
        --form-field-font-size-tiny: 13;
        --form-field-font-size-small: 14;
        --form-field-font-size-medium: 15;
        --form-field-font-size-large: 18;
        --form-field-font-size-huge: 21;
        --form-field-font-weight: 400;

        --form-field-text-color-h: var(--primary-color-h);
        --form-field-text-color-s: 10%;
        --form-field-text-color-l: 16%;
        --form-field-text-color-a: 1;

        --form-field-icon-color-h: var(--primary-color-h);
        --form-field-icon-color-s: 10%;
        --form-field-icon-color-l: 46%;
        --form-field-icon-color-a: 1;

        --form-field-background-color-h: var(--primary-color-h);
        --form-field-background-color-s: 10%;
        --form-field-background-color-l: 100%;
        --form-field-background-color-a: 1;

        --form-field-placeholder-color-h: var(--primary-color-h);
        --form-field-placeholder-color-s: 10%;
        --form-field-placeholder-color-l: 46%;
        --form-field-placeholder-color-a: 0.75;
        --form-field-placeholder-weight: 350;

        --form-field-label-color-h: var(--primary-color-h);
        --form-field-label-color-s: 10%;
        --form-field-label-color-l: 4%;
        --form-field-label-color-a: 1;

        --form-field-border-color-h: var(--primary-color-h);
        --form-field-border-color-s: 10%;
        --form-field-border-color-l: 82%;
        --form-field-border-color-a: 1;

        --form-field-validation-message-font-weight: 350;

        --form-field-range-slider-filled-color-l-modifier: 15%;

        --form-field-validation-font-size-tiny: 12;
        --form-field-validation-font-size-small: 13;
        --form-field-validation-font-size-medium: 14;
        --form-field-validation-font-size-large: 16;
        --form-field-validation-font-size-huge: 18;
        --form-field-validation-font-weight: 400;
        --form-field-validation-margin-top: 8;

        /* ---- Select ---- */
        --select-border-width: var(--global-border-width);
        --select-border-radius: var(--global-border-radius);
        --select-padding-x: 12;
        --select-icon-size: 20;
        --select-font-size-tiny: 13;
        --select-font-size-small: 14;
        --select-font-size-medium: 15;
        --select-font-size-large: 18;
        --select-font-size-huge: 21;
        --select-font-weight: 400;

        /* ---- Range ---- */
        --range-border-width: var(--global-border-width);
        --range-border-radius: 999;
        --range-slider-size: 10;
        --range-handle-size: 20;
        --range-pointer-padding: 8;
        --range-padding-x: 0;
        --range-padding-y: 4;
        --range-outline-offset: 3;

        /* ---- Checkbox ---- */
        --checkbox-icon-color-h: var(--primary-accent-h);
        --checkbox-icon-color-s: var(--primary-accent-s);
        --checkbox-icon-color-l: var(--primary-accent-l);
        --checkbox-icon-color-a: var(--primary-accent-a);
        --checkbox-icon-size: 22;

        /* ---- Form toggle ---- */
        --form-toggle-size: 22;
        --form-toggle-border-width: var(--global-border-width);
        --form-toggle-border-radius: var(--global-border-radius);
        --form-toggle-outline-offset: 3;
        --form-toggle-outline-width: ${size(1)};
        --form-toggle-gap: 16;
        --form-toggle-label-margin-bottom: 4;
        --form-toggle-card-border-width: var(--global-border-width);
        --form-toggle-card-border-radius: var(--global-border-radius);

        /* ---- Form card ---- */
        --form-card-border-width: var(--global-border-width);
        --form-card-border-style: solid;
        --form-card-border-radius: var(--global-border-radius);
        --form-card-padding-y: 16;
        --form-card-padding-x: 16;
        --form-card-border-color-h: var(--form-field-border-color-h);
        --form-card-border-color-s: var(--form-field-border-color-s);
        --form-card-border-color-l: var(--form-field-border-color-l);
        --form-card-border-color-a: var(--form-field-border-color-a);
        --form-card-background-color-h: var(--form-field-background-color-h);
        --form-card-background-color-s: var(--form-field-background-color-s);
        --form-card-background-color-l: var(--form-field-background-color-l);
        --form-card-background-color-a: var(--form-field-background-color-a);
        --form-card-outline-offset: 4;
        --form-card-outline-width: ${size(1)};

        /* ---- Form label ---- */
        --form-label-font-size-tiny: 12;
        --form-label-font-size-small: 13;
        --form-label-font-size-medium: 14;
        --form-label-font-size-large: 15;
        --form-label-font-size-huge: 16;
        --form-label-font-weight: 500;
        --form-label-margin-bottom: 8;

        --main-background-color-h: 0;
        --main-background-color-s: 50%;
        --main-background-color-l: 100%;

        --element-font-weight: 550;

        --text-color-h: 0;
        --text-color-s: 10%;
        --text-color-l: 25%;
        --text-color-a: 1;

        --text-line-height: 1.5;

        --font-size-small: ${size(12)};
        --font-size-medium: ${size(14)};
        --font-size-large: ${size(16)};
        --font-size-huge: ${size(20)};

        --shape-pill-radius: ${size(960)};

        --default-color-h: var(--primary-color-h);
        --default-color-s: 10%;
        --default-color-l: 92%;
        --default-color-a: 1;

        --default-accent-h: var(--primary-color-h);
        --default-accent-s: 10%;
        --default-accent-l: 15%;
        --default-accent-a: 1;

        --primary-color-h: 206;
        --primary-color-s: 84%;
        --primary-color-l: 51%;
        --primary-color-a: 1;

        --primary-accent-h: var(--primary-color-h);
        --primary-accent-s: 84%;
        --primary-accent-l: 100%;
        --primary-accent-a: 1;

        --secondary-color-h: 220;
        --secondary-color-s: 10%;
        --secondary-color-l: 32%;
        --secondary-color-a: 1;

        --secondary-accent-h: var(--secondary-color-h);
        --secondary-accent-s: 10%;
        --secondary-accent-l: 100%;
        --secondary-accent-a: 1;

        --error-color-h: 0;
        --error-color-s: 71%;
        --error-color-l: 55%;
        --error-color-a: 1;

        --success-color-h: 106;
        --success-color-s: 45%;
        --success-color-l: 55%;
        --success-color-a: 1;

        --form-label-font-size: ${size(14)};

        --border-radius: ${size(5)};
    }

    ds-app {
        background-color: hsl(
            var(--main-background-color-h),
            var(--main-background-color-s),
            var(--main-background-color-l)
        );

        color: hsla(
            var(--text-color-h),
            var(--text-color-s),
            var(--text-color-l),
            var(--text-color-a)
        );

        line-height: var(--text-line-height);
    }

    ds-app a {
        color: hsla(
            var(--primary-color-h),
            var(--primary-color-s),
            var(--primary-color-l),
            var(--primary-color-a)
        );
    }

    ds-app hr {
        margin: ${size(24)} 0;
        width: 100%;
        height: 1px;
        border: none;

        background-color: hsla(
            var(--form-field-border-color-h),
            var(--form-field-border-color-s),
            var(--form-field-border-color-l),
            var(--form-field-border-color-a)
        );
    }

    ds-app {
        display: block;
        overflow: hidden;
        margin: 0;
    }

    @media (prefers-color-scheme: dark) {
        :root {
            ${themeDark}
        }
    }

    [theme="dark"] {
        ${themeDark}
    }
`;
