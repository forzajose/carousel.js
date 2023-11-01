import { isInViewport } from "./viewportChecker";
import { image } from "./adapters/image";
import { html } from "./adapters/html";
import { youtube } from "./adapters/youtube";
import { plaintext } from "./adapters/plaintext";

export const lazyLoad = (itemLists) => {
  itemLists.forEach(item => {
    //console.log(isInViewport(item.placeholder));
    if (isInViewport(item.placeholder)) {
      if (item.placeholder.dataset.load !== 'true') {
        let key = item.placeholder.dataset.key;
        // console.log(key);
        // console.log(item.content);

        if (item.content.type === 'Image') {
          image(item);
        } else if (item.content.type === 'HTML') {
          html(item);
        } else if (item.content.type === 'YouTube') {
          youtube(item);
        } else if (item.content.type === 'PlainText') {
          plaintext(item);
        }
        item.placeholder.dataset.load = 'true';


      }
    }
  })
}