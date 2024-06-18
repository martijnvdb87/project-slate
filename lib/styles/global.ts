import { css } from "lit";
import { size } from "../util/style";

export const global = css`
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
            background: hsl(var(--primary-color-h), 10%, 12%);

            --text-color-l: 64%;
            --default-color-l: 22%;
            --default-accent-l: 96%;
            --primary-color-l: 36%;
            --primary-accent-l: 96%;
            --secondary-color-l: 12%;
            --secondary-accent-l: 100%;
            --error-color-l: 35%;
            --success-color-l: 35%;
            --input-text-color-l: 96%;
            --input-icon-color-l: 46%;
            --input-background-color-l: 14%;
            --input-label-color-l: 96%;
            --input-border-color-l: 32%;
        }
    }

    [theme="dark"] {
        background: hsl(var(--primary-color-h), 10%, 12%);

        --text-color-l: 64%;
        --default-color-l: 22%;
        --default-accent-l: 96%;
        --primary-color-l: 36%;
        --primary-accent-l: 96%;
        --secondary-color-l: 12%;
        --secondary-accent-l: 100%;
        --error-color-l: 35%;
        --success-color-l: 35%;
        --input-text-color-l: 96%;
        --input-icon-color-l: 46%;
        --input-background-color-l: 14%;
        --input-label-color-l: 96%;
        --input-border-color-l: 32%;
    }
`;
