import { unsafeCSS } from "lit";
import main from "../css/main.css?inline";
import colors from "../css/colors.css?inline";

export function mainCss() {
    return unsafeCSS(`${main} ${colors}`);
}
