import config from "@/lib/config.json" assert { type: "json" };
import BaseElement from "./base";
import Button from "./button";

type ComponentClass = new <T>(...args: unknown[]) => T;
const registeredComponents = [Button] as ComponentClass[];

function getCustomElementName(component: ComponentClass) {
    const matches = component.name.match(/((?:^.|[A-Z])[^A-Z]*)/g);
    const parts = matches?.map((match) => match.toLocaleLowerCase()) ?? [];

    if (parts.length < 1) {
        throw new Error(`Invalid component name for ${component.name}`);
    }

    return [config.prefix, ...parts].join("-");
}

function loadComponents() {
    for (const component of registeredComponents) {
        if (
            component &&
            component !== BaseElement &&
            component.prototype instanceof BaseElement
        ) {
            const name = getCustomElementName(component);

            customElements.get(name) || customElements.define(name, component);
        }
    }
}

export { loadComponents };
