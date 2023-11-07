import { createCarousel } from "./src";

/**
 * Init the carousel plugin
 */
const config = {
  'id': 'carouselPlace',
  'label': 'Awesome carousel',
  'items': [{
    type: 'Image',
    url: 'https://cdn.pixabay.com/photo/2023/10/01/19/14/oranges-8287967_1280.jpg'
  }, {
    type: 'YouTube',
    videoId: 'YqcluvDAZJo'
  }, {
    type: 'PlainText',
    text: 'Lorem Ipsum'
  }, {
    type: 'HTML',
    code: `<h1>I'm a <b>HTML code</b></h1>`
  },
  {
    type: 'YouTube',
    videoId: 'Y0k837JFS0o'
  },
  {
    type: 'YouTube',
    videoId: '3pUSNLNlOEU'
  },
  {
    type: 'Image',
    url: 'https://images.freeimages.com/images/large-previews/c31/colors-1383652.jpg'
  },
  {
    type: 'Image',
    url: 'https://images.freeimages.com/images/large-previews/9c0/forest-1400475.jpg'
  },
  {
    type: 'YouTube',
    videoId: 'tn_9tzAZ7dI'
  },
  {
    type: 'YouTube',
    videoId: 'H1Dvg2MxQn8'
  },
  {
    type: 'YouTube',
    videoId: 'bV3J0cTTEFY'
  },
  {
    type: 'Image',
    url: 'https://cdn.pixabay.com/photo/2023/09/22/07/02/red-8268266_1280.jpg'
  },
  {
    type: 'Image',
    url: 'https://cdn.pixabay.com/photo/2016/02/10/21/57/heart-1192662_1280.jpg'
  },
  {
    type: 'YouTube',
    videoId: '2hDoTXR6Zr4'
  },
    , {
    type: 'HTML',
    code: `<b>Hello world</b>`
  },

  ]
};

createCarousel(config);