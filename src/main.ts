import { loadComponents } from "@/lib";
import "@/lib/css/reset.css";
import "@/src/css/style.css";

import { html } from "@/lib/util/syntax";

loadComponents();

document.querySelector<HTMLDivElement>("#app")!.innerHTML = html`
    <p>Design System</p>

    <p><ds-button>Button</ds-button></p>
`;
