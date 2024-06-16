import { css } from "lit";
import { size } from "../util/style";

export const global = css`
    ds-app hr {
        margin: ${size(24)} 0;
        width: 100%;
        height: 1px;
        border: none;

        background-color: var(--input-border-color);
    }
`;
