export const html = (item) => {
  item.placeholder.innerHTML = item.content.code;
  item.placeholder.classList.remove('overlay-loader');
  item.placeholder.dataset.load = 'true';
}