const imageContainer = document.querySelector(".image-container");
const slotContainer = document.querySelector(".slot-container");

let numImages = 3;
let imageIndex = 0;

const fetchImages = (num) => {
  fetch(
    `https://api.thecatapi.com/v1/images/search?limit=${num}&api_key= live_ioaRkIuTfIezHHWkZ6rJsDgLfDiXPG4jk8LrnjfMogBqNp1i9cYOqU1OLFASHIm4`
  )
    .then((res) => res.json())
    .then((data) => {
      data.forEach((img, index) => {
        let newImg = document.createElement("img");
        newImg.src = img.url;
        newImg.className = "carousel-image";
        index === 0
          ? (newImg.style.display = "block")
          : (newImg.style.display = "none");
        imageContainer.appendChild(newImg);

        let slot = document.createElement("span");
        index === 0
          ? (slot.className = "slot show")
          : (slot.className = "slot");
        slotContainer.appendChild(slot);
      });
    });
};

fetchImages(numImages);
