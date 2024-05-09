import config from "@/lib/config.json";
import BaseElement from "./base";

const components = import.meta.glob("./*/index.ts");

(async () => {
    for (const path of Object.values(components)) {
        const module = (await path()) as {
            default: new <T>(...args: unknown[]) => T;
        };

        if (
            module.default &&
            module.default !== BaseElement &&
            module.default.prototype instanceof BaseElement
        ) {
            const matches = module.default.name.match(/((?:^.|[A-Z])[^A-Z]*)/g);
            const parts =
                matches?.map((match) => match.toLocaleLowerCase()) ?? [];

            if (parts.length < 1) {
                console.error("Invalid component name", module.default.name);
                continue;
            }

            const tagName = [config.prefix, ...parts].join("-");

            customElements.get(tagName) ||
                customElements.define(tagName, module.default);
        }
    }
})();
