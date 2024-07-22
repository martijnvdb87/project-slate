import "boxicons";

import "@/lib/components/alert";
import "@/lib/components/app";
import "@/lib/components/button";
import "@/lib/components/checkbox";
import "@/lib/components/input";
import "@/lib/components/option";
import "@/lib/components/radio";
import "@/lib/components/range";
import "@/lib/components/selectNative";
import "@/lib/components/switch";
import "@/lib/components/tabs";
import "@/lib/components/textarea";
import { global } from "./styles/global";
import { reset } from "./styles/reset";
import { main } from "./styles/main";

let styles = document.querySelector("style#ds-styles");

if (!styles) {
    styles = document.createElement("style");
    styles.id = "ds-styles";
    styles.innerHTML = [reset, main, global].join("\n");
    document.head.appendChild(styles);
}
