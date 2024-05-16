import { unsafeCSS } from "lit";
import reset from "../css/reset.css?inline";
import main from "../css/main.css?inline";
import colors from "../css/colors.css?inline";

export function mainCss() {
    return unsafeCSS(`${reset} ${main} ${colors}`);
}
