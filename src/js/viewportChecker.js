/**
 * @param {DOM Element} element - Element on which track  
 */
export const isInViewport = (element) => {
  // Get the item carousel width 
  let itemWidth = parseFloat(window.getComputedStyle(element).width);
  const rect = element.getBoundingClientRect();
  // console.log(rect.right, rect.bottom, rect.top, rect.left);
  return (
    // rect.top >= 0 &&
    rect.left >= -itemWidth &&
    // rect.y <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth + itemWidth || document.documentElement.clientWidth + itemWidth)
  );
}