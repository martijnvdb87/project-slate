import { css } from "lit";
import "@/lib/assets/fonts/inter/inter.css";
import { size } from "../util/style";

export const main = css`
    :root {
        --main-background-color-h: var(--primary-color-h);
        --main-background-color-s: var(--primary-color-s);
        --main-background-color-l: 100%;

        --font-sans: InterVariable, Inter, ui-sans-serif, system-ui, sans-serif,
            "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
            "Noto Color Emoji";
        --font-serif: ui-serif, Georgia, Cambria, "Times New Roman", Times,
            serif;
        --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
            "Liberation Mono", "Courier New", monospace;

        --font-family: var(--font-sans);
        --element-font-weight: 500;
        --input-font-weight: 350;

        --text-color-h: var(--primary-color-h);
        --text-color-s: 10%;
        --text-color-l: 25%;
        --text-color-a: 1;

        --text-line-height: 1.6;

        --font-size-small: ${size(12)};
        --font-size-medium: ${size(14)};
        --font-size-large: ${size(16)};
        --font-size-huge: ${size(20)};

        --shape-pill-radius: ${size(960)};

        --box-shadow: rgba(0, 0, 0, 0.05) ${size(0)} ${size(2)} ${size(4)},
            rgba(0, 0, 0, 0.025) ${size(0)} ${size(1)} ${size(1)};

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

        --input-label-font-weight: 500;
        --input-label-font-size: ${size(14)};

        --input-border-color-h: var(--primary-color-h);
        --input-border-color-s: 10%;
        --input-border-color-l: 82%;
        --input-border-color-a: 1;

        --input-border-width: ${size(1)};

        --border-radius: ${size(5)};

        --input-outline-width: ${size(1)};
        --input-outline-opacity: 1;

        --input-validation-message-font-weight: 350;
    }

    :host [hidden] {
        display: none;
    }
`;
