import { createImage } from "../imageCreate";

export const image = (item) => {
  let image = createImage(item.content.url);
  image.onload = () => {
    image.classList.add('carousel__image');
    item.placeholder.append(image);
    item.placeholder.classList.remove('overlay-loader');
    item.placeholder.dataset.load = 'true';
  }
}