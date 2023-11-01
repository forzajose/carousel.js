import { createImage } from "../imageCreate";

export const youtube = (item) => {
  let imageSource = "https://img.youtube.com/vi/" + item.content.videoId + "/sddefault.jpg";
  let image = createImage(imageSource);
  image.onload = () => {

    let youtubeWrapper = document.createElement('div');
    youtubeWrapper.classList.add('youtube-wrapper');

    let youtubePlayIcon = document.createElement('div');
    youtubePlayIcon.classList.add('embed-youtube-play');

    youtubeWrapper.append(image, youtubePlayIcon);
    item.placeholder.append(youtubeWrapper);

    item.placeholder.dataset.load = 'true';
    item.placeholder.classList.remove('overlay-loader');

    youtubePlayIcon.addEventListener("click", function () {
      let iframe = document.createElement("iframe");

      iframe.setAttribute("frameborder", "0");
      iframe.setAttribute("allowfullscreen", "");
      iframe.setAttribute("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture");
      // Important: add the autoplay GET parameter, otherwise the user would need to click over the YouTube video again to play it
      iframe.setAttribute("src", "https://www.youtube.com/embed/" + item.content.videoId + "?rel=0&showinfo=0&autoplay=0");

      // Clear Thumbnail and load the YouTube iframe
      item.placeholder.innerHTML = "";
      item.placeholder.appendChild(iframe);
    });
  }
}