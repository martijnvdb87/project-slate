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

    --input-text-color-s: 0%;
    --input-text-color-l: 96%;

    --input-icon-color-s: 0%;
    --input-icon-color-l: 46%;

    --input-background-color-s: 0%;
    --input-background-color-l: 12%;

    --input-label-colorsl: 0%;
    --input-label-color-l: 100%;

    --input-border-color-s: 0%;
    --input-border-color-l: 36%;

    --input-range-slider-filled-color-l-modifier: -10%;

    --input-checkbox-icon-color-h: var(--primary-accent-h);
    --input-checkbox-icon-color-s: var(--main-background-color-s);
    --input-checkbox-icon-color-l: var(--main-background-color-l);
    --input-checkbox-icon-color-a: var(--primary-accent-a);
`;

export const global = css`
    :root {
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
        --button-border-width: 1;
        --button-padding-x: 16;
        --button-padding-y: 4;
        --button-gap: 8;
        --button-icon-size: 20;
        --button-font-size-tiny: 12;
        --button-font-size-small: 13;
        --button-font-size-medium: 14;
        --button-font-size-large: 16;
        --button-font-size-huge: 18;
        --button-font-weight: 500;
        --button-border-radius: 5;

        /* ---- Input ---- */
        --input-border-width: 1;
        --input-padding-x: 14;
        --input-icon-size: 20;
        --input-font-size-tiny: 13;
        --input-font-size-small: 14;
        --input-font-size-medium: 15;
        --input-font-size-large: 18;
        --input-font-size-huge: 21;
        --input-font-weight: 400;
        --input-border-radius: 5;
        --input-label-font-size-tiny: 12;
        --input-label-font-size-small: 13;
        --input-label-font-size-medium: 14;
        --input-label-font-size-large: 15;
        --input-label-font-size-huge: 16;
        --input-label-font-weight: 500;

        --main-background-color-h: 0;
        --main-background-color-s: 50%;
        --main-background-color-l: 100%;

        --font-sans: InterVariable, Inter, ui-sans-serif, system-ui, sans-serif,
            "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
            "Noto Color Emoji";
        --font-serif: ui-serif, Georgia, Cambria, "Times New Roman", Times,
            serif;
        --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
            "Liberation Mono", "Courier New", monospace;

        --font-family: var(--font-sans);
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

        --input-text-color-h: var(--primary-color-h);
        --input-text-color-s: 10%;
        --input-text-color-l: 16%;
        --input-text-color-a: 1;

        --input-icon-color-h: var(--primary-color-h);
        --input-icon-color-s: 10%;
        --input-icon-color-l: 46%;
        --input-icon-color-a: 1;

        --input-background-color-h: var(--primary-color-h);
        --input-background-color-s: 10%;
        --input-background-color-l: 100%;
        --input-background-color-a: 1;

        --input-placeholder-color-h: var(--primary-color-h);
        --input-placeholder-color-s: 10%;
        --input-placeholder-color-l: 46%;
        --input-placeholder-color-a: 0.75;
        --input-placeholder-weight: 350;

        --input-label-color-h: var(--primary-color-h);
        --input-label-color-s: 10%;
        --input-label-color-l: 4%;
        --input-label-color-a: 1;

        --input-label-font-size: ${size(14)};

        --input-border-color-h: var(--primary-color-h);
        --input-border-color-s: 10%;
        --input-border-color-l: 82%;
        --input-border-color-a: 1;

        --border-radius: ${size(5)};

        --input-outline-width: ${size(1)};
        --input-outline-opacity: 1;

        --input-validation-message-font-weight: 350;

        --input-range-slider-filled-color-l-modifier: 15%;

        --input-checkbox-icon-color-h: var(--primary-accent-h);
        --input-checkbox-icon-color-s: var(--primary-accent-s);
        --input-checkbox-icon-color-l: var(--primary-accent-l);
        --input-checkbox-icon-color-a: var(--primary-accent-a);
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
            var(--input-border-color-h),
            var(--input-border-color-s),
            var(--input-border-color-l),
            var(--input-border-color-a)
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
