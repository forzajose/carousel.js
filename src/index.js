import './css/style.css'

import { checkItemsVisibility } from "./js/checkItemsVisibility";
import { isInViewport } from "./js/viewportChecker";
import { getTranslateXY } from "./js/translateXY";
import { itemListObject } from './js/itemLists';

/**
 * 
 * @param {Object} config
 */
export const createCarousel = (config) => {

  // Grab the place where to insert a carousel
  const carouselPlace = document.querySelector('#' + config.id);

  // Create a title for the carousel
  const carouselLabel = document.createElement('div');
  carouselLabel.classList.add('carousel-label');
  carouselLabel.innerText = config.label;
  carouselPlace.append(carouselLabel);

  // Fill the carousel with data
  // let itemListObject = [];
  config.items.forEach((item, key) => {
    let i = document.createElement('li');
    i.dataset.key = key;
    i.classList.add('carousel__item', 'overlay-loader');
    itemListObject[key] = { 'placeholder': i, 'content': config.items[key] }
  })

  // Create a wrapper for carousel data
  const carouselListWrapper = document.createElement('div');
  carouselListWrapper.setAttribute('class', 'carousel__list--wrapper');
  let itemLists = [];
  Object.values(itemListObject).forEach(item => { itemLists.push(item.placeholder) })
  //console.log('itemlist',itemLists)
  carouselListWrapper.append(...itemLists);

  // Create a container that will move the carousel
  const carouselList = document.createElement('ul');
  carouselList.setAttribute('id', 'carousel__list');
  carouselList.append(carouselListWrapper)

  // Create the carousel 
  const carousel = document.createElement('div');
  carousel.setAttribute('id', 'carousel');
  let startSide = 'left'
  carousel.style.justifyContent = startSide;
  ///
  carouselPlace.append(carousel);
  carousel.append(carouselList);

  // Create arrows for the carousel
  const rightArrow = document.createElement('div');
  rightArrow.classList.add(['arrow__wrapper'], ['arrow-right']);
  rightArrow.innerHTML = `<div class="circle">
            <div class="arrow"></div>
          </div>`;
  const leftArrow = document.createElement('div');
  leftArrow.classList.add(['arrow__wrapper'], ['arrow-left']);
  leftArrow.innerHTML = `<div class="circle">
            <div class="arrow"></div>
          </div>`;
  carousel.append(rightArrow, leftArrow);

  // Get the number of carousel items
  const carouselItemsCount = Object.keys(itemListObject).length;

  // Get the width of one carousel element (all elements are assumed to have the same width) 
  const carouselItemStyles = window.getComputedStyle(itemLists[0]);
  const carouselItemWidth = parseFloat(carouselItemStyles.width);
  // Get the width of carousel handler
  const carouselListWidth = parseFloat(window.getComputedStyle(carouselList).width);

  // Amount of pixels to move on each click by arrow 
  const scrollStep = carouselListWidth / carouselItemsCount;
  // How far away the carousel was moved
  let scrollDistance = 0;

  // Move carousel items by clicking on arrows

  //////////////////

  const clickArrowsHandler = (carouselLeftLimiter, carouselRightLimiter) => {
    leftArrow.onclick = (e) => {
      if (scrollDistance > carouselLeftLimiter) {
        scrollDistance -= scrollStep;

        let nearestNumberItem = (scrollDistance - carouselRightLimiter) / carouselItemWidthMargin;
        let currentItemPos = carouselRightLimiter - (Math.round(Math.abs(nearestNumberItem)) * carouselItemWidthMargin);
        let nearestItemPos = scrollDistance < carouselLeftLimiter ? carouselLeftLimiter : currentItemPos;

        carouselList.style.transform = 'translateX(' + nearestItemPos + 'px)';
        checkItemsVisibility('x');
        //console.log(Math.round(Math.abs(nearestNumberItem)),currentItemPos,nearestItemPos,scrollDistance);
        console.log(Math.round(Math.abs(nearestNumberItem)), scrollDistance);

      }
    }
    rightArrow.onclick = (e) => {
      if (scrollDistance < carouselRightLimiter) {
        scrollDistance += scrollStep;

        let nearestNumberItem = (scrollDistance - carouselRightLimiter) / carouselItemWidthMargin;
        let currentItemPos = carouselRightLimiter - (Math.round(Math.abs(nearestNumberItem)) * carouselItemWidthMargin);
        let nearestItemPos = scrollDistance > carouselRightLimiter ? carouselRightLimiter : currentItemPos;

        carouselList.style.transform = 'translateX(' + nearestItemPos + 'px)';
        checkItemsVisibility('x');
        //console.log(Math.round(Math.abs(nearestNumberItem)),currentItemPos,nearestItemPos,scrollDistance);
        console.log(Math.round(Math.abs(nearestNumberItem)), scrollDistance);

      }
    }
  }

  let windowWidth = window.innerWidth;
  const carouselItemWidthMargin = parseFloat(carouselItemStyles.marginLeft) + parseFloat(carouselItemStyles.marginRight) + carouselItemWidth;

  //Initial position of carousel
  if (startSide === 'right') {
    scrollDistance = -(windowWidth - carouselItemWidthMargin) / 2 + 8
    carouselList.style.transform = 'translateX(' + scrollDistance + 'px)';

    var carouselLeftLimiter = scrollDistance;
    var carouselRightLimiter = (carouselListWidth - (windowWidth - (windowWidth - carouselItemWidthMargin) / 2));
    console.log(carouselLeftLimiter, carouselRightLimiter, 'right')

    clickArrowsHandler(carouselLeftLimiter, carouselRightLimiter);
    
  } else if (startSide === 'left') {
    scrollDistance = (windowWidth - carouselItemWidthMargin) / 2 - 8
    carouselList.style.transform = 'translateX(' + scrollDistance + 'px)';

    var carouselRightLimiter = scrollDistance;
    var carouselLeftLimiter = -(carouselListWidth - (windowWidth - (windowWidth - carouselItemWidthMargin) / 2));

    clickArrowsHandler(carouselLeftLimiter, carouselRightLimiter);

    console.log('carouselLeftLimiter ' + carouselLeftLimiter, 'carouselRightLimiter ' + carouselRightLimiter);

  }

  //////////////////

  //////////////

  // Indicate carousel state (e.g. wrap or unwrap)
  let carouselOpen = false;

  // Wrap | unwrap carousel by clicking on the title
  carouselLabel.onclick = (e) => {
    leftArrow.classList.toggle('hide-element');
    rightArrow.classList.toggle('hide-element');

    if (carouselOpen) {
      carouselList.style.transform = 'translateX(' + scrollDistance + 'px)';
      carouselOpen = false;
    } else {
      carouselList.style.transform = 'translateX(' + 0 + 'px)';
      carouselOpen = true;
    }

    carouselListWrapper.classList.toggle('flex-wrap');
    carouselListWrapper.classList.toggle('carousel__list--wrapper');

    // wait 0.5 seconds until carousel items return to the center of the screen so they can be properly processed by lazyLoad function.
    // IMPORTANT
    // If changing carousel carouselList transition speed then accordingly change the time interval    
    setTimeout(() => { checkItemsVisibility('y') }, 500);
  }

  // Draggable carousel
  carouselList.onmousedown = function (event) {
    let nearestNumberItem = (scrollDistance - carouselRightLimiter) / carouselItemWidthMargin;
    console.log(Math.round(Math.abs(nearestNumberItem)), scrollDistance);

    // carouselLeftLimiter = Math.abs(carouselLeftLimiter) + Math.abs(carouselRightLimiter)
    // carouselRightLimiter = 0;
    //console.log('carouselLeftLimiter '+ carouselLeftLimiter, 'carouselRightLimiter '+carouselRightLimiter);


    // let nearestNumberItem = (Math.abs(carouselRightLimiter) + Math.abs(scrollDistance)) / carouselItemWidthMargin;
    // let nearestNumberItem = (scrollDistance - carouselRightLimiter) / carouselItemWidthMargin;
    //       let nearestItemPos = carouselRightLimiter + nearestNumberItem * carouselItemWidthMargin;
    //       console.log(scrollDistance - carouselRightLimiter)
    //       console.log(scrollDistance,Math.round(Math.abs(nearestNumberItem)), nearestItemPos)

    if (carouselOpen === false) {
      carouselList.style.transition = 'none';
      carouselList.style.cursor = 'grab';
      let startPosition = event.pageX;

      let translateX = getTranslateXY(carouselList)["translateX"];

      carouselList.onmousemove = function (event) {

        let currentPosition = event.pageX;
        let difference = startPosition - currentPosition;

        scrollDistance = translateX - difference;

        carouselList.style.transform = "translateX(" + parseInt(scrollDistance) + "px)";
        checkItemsVisibility('x');
      }
    }
  }
  carouselList.onmouseleave = function () {
    carouselList.style.transition = 'transform .5s';
    carouselList.style.cursor = 'default';
    carouselList.onmousemove = null;
  }
  carouselList.onmouseup = function () {
    carouselList.style.transition = 'transform .5s';
    carouselList.style.cursor = 'default';

    carouselList.onmousemove = null;
  }

  // Scroll vertical in unwrap mode
  document.addEventListener('scroll', () => {
    checkItemsVisibility('xy');
  })


  // Autoslide
  // if (config.autoslide) {
  //   //scrollDistance = carouselListWidth /2;
  //   console.log(carouselListWidth)
  //   let autoslide = config.autoslide;
  //   let direction = autoslide.direction;

  //   let min = false;
  //   let max = true;

  //   const setCarouselStartPos = (position = 'left') => {
  //     if (position === 'left') {
  //       carousel.style.justifyContent = 'left';
  //     } else if (position === 'rigth') {
  //       carousel.style.justifyContent = 'right';
  //     } else {
  //       carousel.style.justifyContent = 'center';
  //     }
  //     checkItemsVisibility('x');

  //   }
  //   //let counter = setTimeout(setCarouselStartPos, 0);


  //   //let counter = setTimeout(timer, 0);

  //   function timer() {
  //     carouselList.style.transition = 'none';
  //     carouselList.style.transform = 'translateX(' + scrollDistance + 'px)';


  //     // let counter2 = setInterval(()=>{
  //     //   carouselList.style.transition = 'transform .5s';

  //     //   if (scrollDistance >= carouselListWidth / 2) {
  //     //     max = true;
  //     //     min = false;
  //     //   }
  //     //   if (scrollDistance <= -carouselListWidth / 2) {
  //     //     max = false;
  //     //     min = true;
  //     //   }

  //     //   if (max) {
  //     //     scrollDistance -= scrollStep;
  //     //   }

  //     //   if (min) {
  //     //     scrollDistance += scrollStep;
  //     //   }
  //     //   checkItemsVisibility('x');
  //     //   carouselList.style.transform = 'translateX(' + scrollDistance + 'px)';
  //     // }, 3000);





  //     // if (scrollDistance >= -carouselListWidth / 2) {
  //     //   scrollDistance -= scrollStep;
  //     // } 
  //     // if (scrollDistance <= carouselListWidth / 2)  {
  //     //   scrollDistance += scrollStep;

  //     // }
  //     //console.log(scrollDistance, scrollStep);
  //   }
  //   function bar() {

  //   }
  // }

  // First checked if any carousel item is in the viewport and loads if it does
  checkItemsVisibility('x');
}