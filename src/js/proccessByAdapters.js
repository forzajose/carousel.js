import { image } from "./adapters/image";
import { html } from "./adapters/html";
import { youtube } from "./adapters/youtube";
import { plaintext } from "./adapters/plaintext";

export const proccessByAdapters = (trackingElement) => {
  if (trackingElement.content.type === 'Image') {
    image(trackingElement);
  } else if (trackingElement.content.type === 'HTML') {
    html(trackingElement);
  } else if (trackingElement.content.type === 'YouTube') {
    youtube(trackingElement);
  } else if (trackingElement.content.type === 'PlainText') {
    plaintext(trackingElement);
  }
}