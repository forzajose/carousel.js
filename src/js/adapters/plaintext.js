export const plaintext = (item) => {
  item.placeholder.innerText = item.content.text;
  item.placeholder.classList.remove('overlay-loader');
  item.placeholder.dataset.load = 'true';
} 