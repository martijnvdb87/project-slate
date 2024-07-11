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
