import { version, name } from "../package.json";
export const componentName = `${name}-app`;
export const pangoHeadTagName = `${name}-head`;
export const pangoBodyTagName = `${name}-body`;

export function getDefaultTplWrapper(name) {
  return (tpl) => {
    const head = tpl
      .match(/<head[^>]*>([\s\S]*?)<\/head>/i)[0]
      .replace(/<head/i, `<${pangoHeadTagName}`)
      .replace(/<\/head>/i, `</${pangoHeadTagName}>`);
    const body = tpl
      .match(/<body[^>]*>([\s\S]*?)<\/body>/i)[0]
      .replace(/<body/i, `<${pangoBodyTagName}`)
      .replace(/<\/body>/i, `</${pangoBodyTagName}>`);

    return `<div id="${getWrapperId(
      name
    )}" data-name="${name}" data-version="${version}">${head}${body}</div>`;
  };
}

export function getWrapperId(name) {
  return `__pango_microapp_wrapper_for_${name}__`;
}
