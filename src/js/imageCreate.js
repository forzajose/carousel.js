export const createImage = (src) => {
  let imageSource = src
  let image = new Image();
  image.src = imageSource;
  image.setAttribute('draggable', 'false');
  image.classList.add('carousel__image');

  return image;
}