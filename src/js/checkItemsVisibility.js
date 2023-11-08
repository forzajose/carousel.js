import { isInViewport } from "./viewportChecker";
import { itemListObject } from "./itemLists";
import { proccessByAdapters } from "./proccessByAdapters";

export const checkItemsVisibility = (axis) => {
  console.log('start', itemListObject);
  console.log('jk',axis);

  Object.keys(itemListObject).forEach((index) => {

     let trackingElement = itemListObject[index];

    if (isInViewport(trackingElement.placeholder, axis)) {
      if (trackingElement.placeholder.dataset.load !== 'true') {
       

        proccessByAdapters(trackingElement)

        trackingElement.placeholder.dataset.load = 'true';
        delete itemListObject[index];

      }
    }
  })
  console.log('end', itemListObject)

}