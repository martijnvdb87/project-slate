import { css } from "lit";
import "@/lib/assets/fonts/inter/inter.css";

export const main = css`
    :host {
        --base-size: calc(var(--size-medium) / 16);
        --base-size-rem: calc(var(--base-size) * 1rem);

        --outline-width-rem: calc(var(--outline-width) * 0.0625rem);
        --outline-offset-rem: calc(var(--outline-offset) * 0.0625rem);
    }

    :host [hidden] {
        display: none;
    }

    :host([size="tiny"]) {
        --base-size: calc(var(--size-tiny) / 16);
    }

    :host([size="small"]) {
        --base-size: calc(var(--size-small) / 16);
    }

    :host([size="medium"]) {
        --base-size: calc(var(--size-medium) / 16);
    }

    :host([size="large"]) {
        --base-size: calc(var(--size-large) / 16);
    }

    :host([size="huge"]) {
        --base-size: calc(var(--size-huge) / 16);
    }

    @keyframes rotate {
        to {
            transform: rotate(360deg);
        }
    }
`;
