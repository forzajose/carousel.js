import './css/style.css'

import { lazyLoad } from "./js/lazyLoad";
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
    // itemListObject.push({'placeholder' : i, 'content': config.items[key]})
    itemListObject[key] = {'placeholder' : i, 'content': config.items[key]}
  })
  //console.log(itemListObject);

  // Create a wrapper for carousel data
  const carouselListWrapper = document.createElement('div');
  carouselListWrapper.setAttribute('class', 'carousel__list--wrapper');
  let itemLists = [];
  Object.values(itemListObject).forEach(item => {itemLists.push(item.placeholder)})
  //console.log('itemlist',itemLists)
  carouselListWrapper.append(...itemLists);

  // Create a container that will move the carousel
  const carouselList = document.createElement('ul');
  carouselList.setAttribute('id', 'carousel__list');
  carouselList.append(carouselListWrapper)

  // Create the carousel 
  const carousel = document.createElement('div');
  carousel.setAttribute('id', 'carousel');
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
  const carouselItemWidth = parseFloat(window.getComputedStyle(itemLists[0]).width);
  // Get the width of carousel handler
  const carouselListWidth = parseFloat(window.getComputedStyle(carouselList).width);

  // Amount of pixels to move on each click by arrow 
  const scrollStep = carouselListWidth / carouselItemsCount;
  // How far away the carousel was moved
  let scrollDistance = 0;

  // Move carousel items by clicking on arrows
  rightArrow.onclick = (e) => {
    lazyLoad(itemListObject);
   // console.log(carouselListWidth);

    if (scrollDistance < carouselListWidth / 2) {
      scrollDistance += scrollStep;
      carouselList.style.transform = 'translateX(' + scrollDistance + 'px)';
    } else {
      //console.log('e');
      carouselListWrapper.classList.remove('animation__shake');
      carouselListWrapper.offsetWidth;
      carouselListWrapper.classList.add('animation__shake');
      carouselList.style.transform = 'translateX(' + carouselListWidth / 2 + 'px)';
    }
  }
  leftArrow.onclick = (e) => {
    lazyLoad(itemListObject);

    if (scrollDistance > -carouselListWidth / 2) {
      scrollDistance -= scrollStep;
      carouselList.style.transform = 'translateX(' + scrollDistance + 'px)';
    } else {
      //console.log('e');
      carouselListWrapper.classList.remove('animation__shake');
      carouselListWrapper.offsetWidth;
      carouselListWrapper.classList.add('animation__shake');
      carouselList.style.transform = 'translateX(' + -carouselListWidth / 2 + 'px)';
    }
  }


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
    lazyLoad(itemListObject);
  }

  // Draggable carousel
  carouselList.onmousedown = function(event) {
    //console.log(event);
    carouselList.style.transition = 'none';
    carouselList.style.cursor = 'grab';
    let startPosition = event.pageX;
  
    let translateX = getTranslateXY(carouselList)["translateX"];
  
    carouselList.onmousemove = function(event) {
  //console.log(event);
      let currentPosition = event.pageX;
      let difference = startPosition - currentPosition;

      scrollDistance = translateX - difference;
  
      carouselList.style.transform = "translateX(" + parseInt(scrollDistance) + "px)";
      lazyLoad(itemListObject);
    }
  }
  
  carouselList.onmouseup = function() {
    carouselList.style.transition = 'transform .5s';
    carouselList.style.cursor = 'default';

    carouselList.onmousemove = function() {
  
    }
  }


   // First checked if any carousel item is in the viewport and loads if it does
lazyLoad(itemListObject);


}