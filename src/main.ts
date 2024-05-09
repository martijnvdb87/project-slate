import "@/lib";
import "@/lib/css/reset.css";
import "@/css/style.css";

import { html } from "./lib/util/syntax";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = html`
    Design System

    <ds-button>Button</ds-button>
`;
