import { css } from "lit";
import { size } from "../util/style";

const themeDark = css`
    --main-background-color-s: 0%;
    --main-background-color-l: 10%;

    --text-color-s: 0%;
    --text-color-l: 64%;

    --default-color-s: 0%;
    --default-color-l: 22%;

    --default-accent-s: 0%;
    --default-accent-l: 96%;

    --primary-color-l: 38%;
    --primary-accent-l: 96%;
    --secondary-color-l: 12%;
    --secondary-accent-l: 100%;
    --error-color-l: 35%;
    --success-color-l: 35%;

    --input-text-color-s: 0%;
    --input-text-color-l: 96%;

    --input-icon-color-s: 0%;
    --input-icon-color-l: 46%;

    --input-background-color-s: 0%;
    --input-background-color-l: 14%;

    --input-label-colorsl: 0%;
    --input-label-color-l: 96%;

    --input-border-color-s: 0%;
    --input-border-color-l: 32%;
`;

export const global = css`
    ds-app {
        background-color: hsl(
            var(--main-background-color-h),
            var(--main-background-color-s),
            var(--main-background-color-l)
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
