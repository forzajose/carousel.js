import { isInViewport } from "./viewportChecker";
import { image } from "./adapters/image";
import { html } from "./adapters/html";
import { youtube } from "./adapters/youtube";
import { plaintext } from "./adapters/plaintext";
import { itemListObject } from "./itemLists";

export const checkItemsVisibility = (itemLists, axis) => {
  console.log('start', itemListObject)

  Object.keys(itemListObject).forEach((item, index) => {
    // console.log(item, index)
    // console.log(itemListObject[item])
    console.log(isInViewport(itemListObject[item].placeholder));
    if (isInViewport(itemListObject[item].placeholder, axis)) {
      if (itemListObject[item].placeholder.dataset.load !== 'true') {
        //let key = item.placeholder.dataset.key;
        console.log('index',item);
        //console.log('value', item);


        if (itemListObject[item].content.type === 'Image') {
          image(itemListObject[item]);
        } else if (itemListObject[item].content.type === 'HTML') {
          html(itemListObject[item]);
        } else if (itemListObject[item].content.type === 'YouTube') {
          youtube(itemListObject[item]);
        } else if (itemListObject[item].content.type === 'PlainText') {
          plaintext(itemListObject[item]);
        }
        itemListObject[item].placeholder.dataset.load = 'true';
        //itemListObject.splice(index, 1);
        delete itemListObject[item];

      }
    }
  })
   //console.log(keyToDelete)
  // keyToDelete.forEach(key => {
  //   itemListObject.splice(key, 1);
  // });
  console.log('end', itemListObject)

}