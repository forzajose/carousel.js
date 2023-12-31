/**
 * @param {DOM Element} element - Element on which track in the viewport 
 * @param {string} axis - Axis on which track visibility in the viewport (x - horizonatal, y - vertical)
 */
export const isInViewport = (element, axis = 'x') => {
  // Get the item carousel width 
  let itemWidth = parseFloat(window.getComputedStyle(element).width);
  const rect = element.getBoundingClientRect();
  if (axis === 'x') {
    return (
      // rect.top >= 0 &&
      rect.left >= -itemWidth*2 &&
      // rect.y <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth + itemWidth*2 || document.documentElement.clientWidth + itemWidth)
    );
  } else if (axis === 'y') {
    return (
      rect.top >= 0 &&
      //rect.left >= -itemWidth &&
      rect.y <= (window.innerHeight*2 || document.documentElement.clientHeight*2)
      //rect.right <= (window.innerWidth + itemWidth || document.documentElement.clientWidth + itemWidth)
    );
  } else if (axis === 'xy') {
    return (
      rect.top >= 0 &&
      rect.left >= -itemWidth*2 &&
      rect.y <= (window.innerHeight*2 || document.documentElement.clientHeight*2) &&
      rect.right <= (window.innerWidth + itemWidth*2 || document.documentElement.clientWidth + itemWidth*2)
    );
  }

}