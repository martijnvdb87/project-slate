import { css } from "lit";
import "@/lib/assets/fonts/inter/inter.css";
import { size } from "../util/style";

export const main = css`
    :root,
    :host {
        --font-sans: InterVariable, Inter, ui-sans-serif, system-ui, sans-serif,
            "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
            "Noto Color Emoji";
        --font-serif: ui-serif, Georgia, Cambria, "Times New Roman", Times,
            serif;
        --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
            "Liberation Mono", "Courier New", monospace;

        --font-family: var(--font-sans);
        --element-font-weight: var(--ds-element-font-weight, 500);
        --input-font-weight: var(--ds-input-font-weight, 350);

        --text-color-h: var(--ds-text-color-h, 220);
        --text-color-s: var(--ds-text-color-s, 10%);
        --text-color-l: var(--ds-text-color-l, 30%);
        --text-color-a: var(--ds-text-color-a, 1);

        --text-color: hsla(
            var(--text-color-h),
            var(--text-color-s),
            var(--text-color-l),
            var(--text-color-a)
        );

        --text-line-height: var(--ds-text-line-height, 1.6);

        --font-size-small: var(--ds-font-size-small, ${size(12)});
        --font-size-medium: var(--ds-font-size-medium, ${size(14)});
        --font-size-large: var(--ds-font-size-large, ${size(16)});
        --font-size-huge: var(--ds-font-size-huge, ${size(20)});

        --shape-pill-radius: var(--ds-shape-pill-radius, ${size(960)});

        --input-box-shadow: var(
            --ds-input-box-shadow,
            rgba(0, 0, 0, 0.025) ${size(0)} ${size(2)} ${size(2)},
            rgba(0, 0, 0, 0.025) ${size(0)} ${size(1)} ${size(1)}
        );

        --default-color-h: var(--ds-default-color-h, 220);
        --default-color-s: var(--ds-default-color-s, 10%);
        --default-color-l: var(--ds-default-color-l, 92%);
        --default-color-a: var(--ds-default-color-a, 1);

        --default-accent-h: var(--ds-default-accent-h, 220);
        --default-accent-s: var(--ds-default-accent-s, 10%);
        --default-accent-l: var(--ds-default-accent-l, 15%);
        --default-accent-a: var(--ds-default-accent-a, 1);

        --primary-color-h: var(--ds-primary-color-h, 206);
        --primary-color-s: var(--ds-primary-color-s, 84%);
        --primary-color-l: var(--ds-primary-color-l, 51%);
        --primary-color-a: var(--ds-primary-color-a, 1);

        --primary-accent-h: var(--ds-primary-accent-h, 206);
        --primary-accent-s: var(--ds-primary-accent-s, 84%);
        --primary-accent-l: var(--ds-primary-accent-l, 100%);
        --primary-accent-a: var(--ds-primary-accent-a, 1);

        --secondary-color-h: var(--ds-secondary-color-h, 220);
        --secondary-color-s: var(--ds-secondary-color-s, 10%);
        --secondary-color-l: var(--ds-secondary-color-l, 32%);
        --secondary-color-a: var(--ds-secondary-color-a, 1);

        --secondary-accent-h: var(--ds-secondary-accent-h, 220);
        --secondary-accent-s: var(--ds-secondary-accent-s, 10%);
        --secondary-accent-l: var(--ds-secondary-accent-l, 100%);
        --secondary-accent-a: var(--ds-secondary-accent-a, 1);

        --error-color-h: var(--ds-error-color-h, 0);
        --error-color-s: var(--ds-error-color-s, 71%);
        --error-color-l: var(--ds-error-color-l, 55%);
        --error-color-a: var(--ds-error-color-a, 1);

        --success-color-h: var(--ds-success-color-h, 106);
        --success-color-s: var(--ds-success-color-s, 45%);
        --success-color-l: var(--ds-success-color-l, 55%);
        --success-color-a: var(--ds-success-color-a, 1);

        --input-text-color-h: var(--ds-input-text-color-h, 220);
        --input-text-color-s: var(--ds-input-text-color-s, 10%);
        --input-text-color-l: var(--ds-input-text-color-l, 16%);
        --input-text-color-a: var(--ds-input-text-color-a, 1);

        --input-icon-color-h: var(--ds-input-icon-color-h, 220);
        --input-icon-color-s: var(--ds-input-icon-color-s, 10%);
        --input-icon-color-l: var(--ds-input-icon-color-l, 46%);
        --input-icon-color-a: var(--ds-input-icon-color-a, 1);

        --input-background-color-h: var(--ds-input-background-color-h, 220);
        --input-background-color-s: var(--ds-input-background-color-s, 10%);
        --input-background-color-l: var(--ds-input-background-color-l, 100%);
        --input-background-color-a: var(--ds-input-background-color-a, 1);

        --input-placeholder-color-h: var(
            --ds-input-placeholder-color-h,
            var(--input-icon-color-h)
        );
        --input-placeholder-color-s: var(
            --ds-input-placeholder-color-s,
            var(--input-icon-color-s)
        );
        --input-placeholder-color-l: var(
            --ds-input-placeholder-color-l,
            var(--input-icon-color-l)
        );
        --input-placeholder-color-a: var(--ds-input-placeholder-color-a, 0.75);
        --input-placeholder-weight: var(
            --ds-input-placeholder-font-weight,
            350
        );

        --input-label-color-h: var(--ds-input-label-color-h, 220);
        --input-label-color-s: var(--ds-input-label-color-s, 10%);
        --input-label-color-l: var(--ds-input-label-color-l, 8%);
        --input-label-color-a: var(--ds-input-label-color-a, 1);

        --input-label-color: hsla(
            var(--input-label-color-h),
            var(--input-label-color-s),
            var(--input-label-color-l),
            var(--input-label-color-a)
        );

        --input-label-font-weight: var(--ds-input-label-font-weight, 500);
        --input-label-font-size: var(--ds-input-label-font-size, ${size(14)});

        --input-border-color-h: var(--ds-input-border-color-h, 220);
        --input-border-color-s: var(--ds-input-border-color-s, 10%);
        --input-border-color-l: var(--ds-input-border-color-l, 82%);
        --input-border-color-a: var(--ds-input-border-color-a, 1);
        --input-border-color: hsla(
            var(--input-border-color-h),
            var(--input-border-color-s),
            var(--input-border-color-l),
            var(--input-border-color-a)
        );

        --input-border-width: var(--ds-input-border-width, ${size(1)});

        --border-radius: var(--ds-element-border-radius, ${size(5)});

        --input-outline-width: var(--ds-input-outline-width, ${size(1)});
        --input-outline-opacity: var(--ds-input-outline-opacity, 1);

        --input-validation-message-font-weight: var(
            --ds-input-validation-message-font-weight,
            350
        );
    }

    :host [hidden] {
        display: none;
    }
`;
