const imageContainer = document.querySelector(".image-container");
const slotContainer = document.querySelector(".slot-container");
const leftArrow = document.querySelector(".left-arrow");
const rightArrow = document.querySelector(".right-arrow");

let numImages = 8;
let imageIndex = 0;
let timer;

const resetTimer = () => {
  try {
    window.clearInterval(timer);
    timer = setInterval(() => changeIndex(imageIndex + 1), 3500);
  } catch {
    return;
  }
};

const changeSlot = (index) => {
  const litSlot = document.querySelector(".lit");
  if (litSlot) litSlot.classList.remove("lit");
  Array.from(slotContainer.children)[index].classList.add("lit");
};

const changeImage = (index) => {
  const imgs = document.querySelectorAll(".carousel-image");
  Array.from(imgs).filter(
    (img) => img.style.display === "block"
  )[0].style.display = "none"; // hide previously displayed img
  Array.from(imgs)[index].style.display = "block";
  Array.from(imgs)[index].classList.add("fade-in");
};

const updateCarousel = () => {
  changeSlot(imageIndex);
  changeImage(imageIndex);
  console.log(`Current index: ${imageIndex}`);
};

const changeIndex = (targetIndex) => {
  if (imageIndex === targetIndex) return;
  let lastIndex = imageContainer.children.length - 1;
  if (targetIndex < 0) {
    imageIndex = lastIndex;
  } else if (targetIndex > lastIndex) {
    imageIndex = 0;
  } else {
    imageIndex = targetIndex;
  }
  updateCarousel();
};

leftArrow.addEventListener("click", () => {
  changeIndex(imageIndex - 1);
  resetTimer();
});
rightArrow.addEventListener("click", () => {
  changeIndex(imageIndex + 1);
  resetTimer();
});

async function fetchImages(num) {
  await fetch(
    `https://api.thecatapi.com/v1/images/search?limit=${num}&api_key= live_ioaRkIuTfIezHHWkZ6rJsDgLfDiXPG4jk8LrnjfMogBqNp1i9cYOqU1OLFASHIm4`
  )
    .then((res) => res.json())
    .then((data) => {
      data.forEach((img, index) => {
        // add images
        let newImg = document.createElement("img");
        newImg.src = img.url;
        newImg.className = "carousel-image";
        index === 0
          ? (newImg.style.display = "block")
          : (newImg.style.display = "none");
        newImg.addEventListener("animationend", (e) => {
          if (e.animationName === "fadeIn")
            e.target.classList.remove("fade-in");
        });
        imageContainer.appendChild(newImg);

        // add slots
        let slot = document.createElement("span");
        index === 0 ? (slot.className = "slot lit") : (slot.className = "slot");
        slot.addEventListener("click", () => {
          changeIndex(index);
        });
        slotContainer.appendChild(slot);
      });
    });
}

// update carousel every 3.5 sec
fetchImages(numImages).then(() => {
  timer = setInterval(() => changeIndex(imageIndex + 1), 3500);
});
