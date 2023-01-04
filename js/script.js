const inputText = document.querySelector("#input-search-image");
const inputNumber = document.querySelector("#select-number");
const imageSize = document.querySelector("#select-size");
const imageSort = document.querySelector("#select-sort");
const submitButton = document.querySelector("#submit-button");
const gallery = document.querySelector("#gallery");
const errorMessage = document.querySelector("#error-message");

const imageDiv = document.querySelector("#images-container");

let imageTextValue;
let imageNumberValue;
let imageSizeValue;
let imageSortValue;

inputText.value;
inputNumber.value = "";
imageSize.value = "";
imageSort.value = "";

//addEventListner for each element to store the user's value
inputText.addEventListener("change", function (event) {
  imageTextValue = event.target.value;
});

inputNumber.addEventListener("change", function (event) {
  imageNumberValue = event.target.value;
});

imageSize.addEventListener("change", function (event) {
  imageSizeValue = event.target.value;
});

imageSort.addEventListener("change", function (event) {
  imageSortValue = event.target.value;
});

submitButton.addEventListener("click", function (event) {
  event.preventDefault();

  // clear the image container
  imageDiv.innerHTML = "";
  errorMessage.style.display = "none";

  const loadingAnimation = {
    targets: "#box #animation",
    duration: 2000,
    easing: "linear",
    opacity: 0,
    translateY: 30,
    endDelay: 500,
    rotate: "360deg",
    loop: true,
    direction: "alternate",
    delay: anime.stagger(300),
  };
  const loading = anime(loadingAnimation);
  const animation = document.querySelector("#animation");
  const box = document.querySelector("#box");

  //Display the error message if the fields are not filled, otherwise fetches data from API
  if (
    !imageTextValue ||
    !imageNumberValue ||
    !imageSizeValue ||
    !imageSortValue
  ) {
    errorMessage.style.display = "block";
  } else {
    errorMessage.style.display = "none";
    box.style.display = "block";
    loading.play();
    fetchflickrImages();
  }
});

function fetchflickrImages() {
  const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=0200293db9de1cd5d263dde837669680&text=${imageTextValue}&per_page=${imageNumberValue}&sort=${imageSortValue}&format=json&nojsoncallback=1`;

  fetch(url)
    .then((response) => {
      console.log(response);
      if (response.ok) {
        return response.json();
      } else {
        throw "Error! Could not fetch images";
      }
    })

    .then((result) => {
      //Error message if the search returned zero results
      if (result.photos.photo.length == 0) {
        errorMessage.style.display = "block";
        box.style.display = "none";
        // loading.restart();
        // loading.pause();
      } else {
        box.style.display = "none";
        // loading.restart();
        // loading.pause();

        const photoArray = result.photos.photo;

        photoArray.forEach((result) => {
          const img = document.createElement("img");
          img.src = `https://live.staticflickr.com/${result.server}/${result.id}_${result.secret}_${imageSizeValue}.jpg`;
          imageDiv.appendChild(img);
        });
      }
    })

    .catch((error) => {
      console.log(error.name);
      errorMessage.style.display = "block";
    });
}
