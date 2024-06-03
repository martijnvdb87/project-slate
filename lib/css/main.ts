import { css } from "lit";
import "@/lib/assets/fonts/inter/inter.css";
import { size } from "../util/style";

export default css`
    :host {
        --font-family: InterVariable, Inter, sans-serif;
        --text-color: var(--ds-text-color, hsla(220, 10%, 16%, 1));

        --font-size-small: var(--ds-font-size-small, ${size(12)});
        --font-size-medium: var(--ds-font-size-medium, ${size(14)});
        --font-size-large: var(--ds-font-size-large, ${size(16)});
        --font-size-huge: var(--ds-font-size-huge, ${size(20)});

        --height-small: var(--ds-height-small, ${size(24)});
        --height-medium: var(--ds-height-medium, ${size(32)});
        --height-large: var(--ds-height-large, ${size(40)});
        --height-huge: var(--ds-height-huge, ${size(48)});

        --sub-height-small: var(--ds-sub-height-small, ${size(16)});
        --sub-height-medium: var(--ds-sub-height-medium, ${size(20)});
        --sub-height-large: var(--ds-sub-height-large, ${size(24)});
        --sub-height-huge: var(--ds-sub-height-huge, ${size(28)});

        --padding-x-small: var(--ds-padding-x-small, ${size(8)});
        --padding-x-medium: var(--ds-padding-x-medium, ${size(12)});
        --padding-x-large: var(--ds-padding-x-large, ${size(16)});
        --padding-x-huge: var(--ds-padding-x-huge, ${size(20)});

        --gap-small: var(--ds-gap-small, ${size(4)});
        --gap-medium: var(--ds-gap-medium, ${size(6)});
        --gap-large: var(--ds-gap-large, ${size(8)});
        --gap-huge: var(--ds-gap-huge, ${size(10)});

        --icon-size-small: var(--ds-icon-size-small, ${size(12)});
        --icon-size-medium: var(--ds-icon-size-medium, ${size(16)});
        --icon-size-large: var(--ds-icon-size-large, ${size(18)});
        --icon-size-huge: var(--ds-icon-size-huge, ${size(24)});

        --shape-pill-radius: var(--ds-shape-pill-radius, ${size(960)});

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

        --element-font-weight: var(--ds-element-font-weight, 450);
        --element-border-radius: var(--ds-element-border-radius, ${size(5)});

        --element-margin-bottom: var(--ds-element-margin-bottom, ${size(8)});

        --element-shadow-size: var(
            --ds-element-shadow-size,
            ${size(0)} ${size(2)} ${size(12)} ${size(0)}
        );
        --element-shadow-opacity: var(--ds-element-shadow-opacity, 0.4);

        --input-text-color-h: var(--ds-input-text-color-h, 220);
        --input-text-color-s: var(--ds-input-text-color-s, 10%);
        --input-text-color-l: var(--ds-input-text-color-l, 16%);
        --input-text-color-a: var(--ds-input-text-color-a, 1);

        --input-sub-text-color-h: var(--ds-input-text-color-h, 220);
        --input-sub-text-color-s: var(--ds-input-text-color-s, 10%);
        --input-sub-text-color-l: var(--ds-input-text-color-l, 40%);
        --input-sub-text-color-a: var(--ds-input-text-color-a, 1);

        --input-icon-color-h: var(--ds-input-icon-color-h, 220);
        --input-icon-color-s: var(--ds-input-icon-color-s, 10%);
        --input-icon-color-l: var(--ds-input-icon-color-l, 46%);
        --input-icon-color-a: var(--ds-input-icon-color-a, 1);

        --input-background-color-h: var(--ds-input-background-color-h, 220);
        --input-background-color-s: var(--ds-input-background-color-s, 10%);
        --input-background-color-l: var(--ds-input-background-color-l, 100%);
        --input-background-color-a: var(--ds-input-background-color-a, 1);

        --input-font-weight: var(--ds-input-font-weight, 350);

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
        --input-label-color-l: var(--ds-input-label-color-l, 16%);
        --input-label-color-a: var(--ds-input-label-color-a, 1);

        --input-label-padding: var(--ds-input-label-padding, ${size(4)});
        --input-label-font-weight: var(--ds-input-label-font-weight, 500);
        --input-label-font-size: var(--ds-input-label-font-size, ${size(14)});

        --input-border-color-h: var(--ds-input-border-color-h, 220);
        --input-border-color-s: var(--ds-input-border-color-s, 10%);
        --input-border-color-l: var(--ds-input-border-color-l, 82%);
        --input-border-color-a: var(--ds-input-border-color-a, 1);

        --input-border-width: var(--ds-input-border-width, 1px);

        --input-padding-x-small: var(--ds-input-padding-x-small, ${size(8)});
        --input-padding-x-medium: var(--ds-input-padding-x-medium, ${size(10)});
        --input-padding-x-large: var(--ds-input-padding-x-large, ${size(12)});
        --input-padding-x-huge: var(--ds-input-padding-x-huge, ${size(14)});

        --input-outline-width: var(--ds-input-outline-width, ${size(1)});
        --input-outline-opacity: var(--ds-input-outline-opacity, 1);

        --element-outline-offset: var(--ds-element-outline-offset, ${size(0)});
        --element-colored-outline-offset: var(
            --ds-element-colored-outline-offset,
            ${size(2)}
        );

        --input-validation-message-padding: var(
            --ds-input-validation-message-padding,
            ${size(4)}
        );
        --input-validation-message-font-weight: var(
            --ds-input-validation-message-font-weight,
            350
        );

        --input-validation-message-font-size-small: var(
            --ds-input-validation-message-font-size-small,
            ${size(11)}
        );
        --input-validation-message-font-size-medium: var(
            --ds-input-validation-message-font-size-medium,
            ${size(12)}
        );
        --input-validation-message-font-size-large: var(
            --ds-input-validation-message-font-size-large,
            ${size(14)}
        );
        --input-validation-message-font-size-huge: var(
            --ds-input-validation-message-font-size-huge,
            ${size(16)}
        );

        --input-validation-message-padding-small: var(
            --ds-input-validation-message-padding-small,
            ${size(4)}
        );
        --input-validation-message-padding-medium: var(
            --ds-input-validation-message-padding-medium,
            ${size(4)}
        );
        --input-validation-message-padding-large: var(
            --ds-input-validation-message-padding-large,
            ${size(4)}
        );
        --input-validation-message-padding-huge: var(
            --ds-input-validation-message-padding-huge,
            ${size(4)}
        );

        --transition-duration: var(--ds-transition-duration, 120ms);
    }

    :host [hidden] {
        display: none;
    }
`;
