"use strict"

var mySlider = new rSlider({
  target: '#sampleSlider',
  values: [10000, 1000000],
  range: true,
  tooltip: true,
  scale: true,
  labels: false,
  step: 10000
});

const currentDate = new Date();

const NAMES = [
  "Двушка в центре Питера",
  "Однушка в спальнике Питера",
  "Трешка рядом с Кремлем",
  "Студия для аскетов",
  "Апартаменты для фрилансера"
];

const DESCRIPTIONS = [
  "Студия с лаконичным дизайном возле Ангары",
  "Трехкомнатная квартира для большой семьи рядом с Кремлем",
  "2 минуты для набережной и прекрасного вида на Волгу",
  "В квартире есть сауна, джакузи и домашний кинотеатр. Перепланировка согласована",
  "Уютная однушка в тихом спальном районе. Рядом лес и озёра"
]

const MIN_PRICE = 250000;
const MAX_PRICE = 2000000;

const CATEGORY = "Недвижимость";

const FULLNAMES = [
  "Бюро Семёна",
  "Игнат-Агент",
  "Виталий Петрович",
  "Марья Андреевна"
]

const MIN_RATING = 0;
const MAX_RATING = 5;

const CITIES = [
  "Иркутск",
  "Москва",
  "Кросноярск",
  "Минск"
]

const STREETS = [
  "ул. Шахтеров",
  "ул. Полярная",
  "ул. Лиственная",
  "ул. Мира",
  "ул. Советская"
]

const MIN_BUILDING_NUM = 1;
const MAX_BUILDING_NUM = 40;

const PHOTOS = [
  "apt_1.png",
  "apt_2.png",
  "apt_3.png",
  "apt_4.png",
  "apt_5.png",
  "apt_6.png",
  "house_1.png",
  "house_2.png",
  "house_3.png",
  "house_4.png",
]

const MIN_PHOTOS_NUM = 1;
const MAX_PHOTOS_NUM = 4;

const TYPES = [
  "house",
  "apartment",
  "flat"
]

const MIN_AREA = 30;
const MAX_AREA = 250;

const MIN_ROOMS_COUNT = 1;
const MAX_ROOMS_COUNT = 7;

function getRandomNum(minNum, maxNum) {
  return Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
}

function getRandomIndex(arr) {
  return Math.floor(Math.random() * arr.length);
}

const advertsData = [];

function createAdvertsArr(arr) {
  function createAdvertData() {
    function getRandomPhotos(photosNum) {
      const photosArr = []
  
      for(let i = 0; i < photosNum; i++) {
        photosArr.push("img/" + PHOTOS[getRandomIndex(PHOTOS)]);
      }
  
      return photosArr;
    }
  
    const object = {
      name: NAMES[getRandomIndex(NAMES)],
      description: DESCRIPTIONS[getRandomIndex(DESCRIPTIONS)],
      price: getRandomNum(MIN_PRICE, MAX_PRICE / 1000) * 1000,
      category: CATEGORY,
      seller: {
        fullname: FULLNAMES[getRandomIndex(FULLNAMES)],
        rating: getRandomNum(MIN_RATING, MAX_RATING * 10) / 10
      },
      publishDate: new Date(currentDate.getFullYear(), getRandomNum(1, currentDate.getMonth()), getRandomNum(1, currentDate.getDate())),
      // publishDate: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 1),
      address: {
        city: CITIES[getRandomIndex(CITIES)],
        street: STREETS[getRandomIndex(STREETS)],
        building: getRandomNum(MIN_BUILDING_NUM, MAX_BUILDING_NUM)
      },
      photos: getRandomPhotos(getRandomNum(MIN_PHOTOS_NUM, MAX_PHOTOS_NUM)),
      filters: {
        type: TYPES[getRandomIndex(TYPES)],
        area: getRandomNum(MIN_AREA, MAX_AREA),
        roomsCount: getRandomNum(MIN_ROOMS_COUNT, MAX_ROOMS_COUNT)
      }
    }
    return object;
  }  

  for(let i = 0; i < 9; i++) {
    arr.push(createAdvertData());
  }

  return arr;
}

function insertMarkup(wrapper, markup) {
  wrapper.innerHTML = "";
  wrapper.insertAdjacentHTML("afterBegin", markup);
}

function makeUpTheDate(dateObj) {
  let dateStr = "";

  const dateDay = dateObj.getDate();
  const dateMonth = dateObj.getMonth();
  const dateYear = dateObj.getFullYear();

  if(dateDay == currentDate.getDate() && dateMonth == currentDate.getMonth() && dateYear == currentDate.getFullYear()) {
    return "Сегодня";
  } else if (dateDay == currentDate.getDate() - 1 && dateMonth == currentDate.getMonth() && dateYear == currentDate.getFullYear()) {
    return "Вчера";
  }

  dateStr += dateDay < 10 ? "0" + dateDay + "." : dateDay + ".";
  dateStr += dateObj.getMonth() < 10 ? "0" + (dateObj.getMonth() + 1) : (dateObj.getMonth() + 1);
  dateStr += "." + dateObj.getFullYear();

  return dateStr;
}

function renderAdverts() {
  const advertsList = document.querySelector(".results__list");

  const advertsMarkup = advertsData.map((itAdvert, itIndex) => {
    if(itIndex < 7) {
      return `
        <li class="results__item product" data-index="${itIndex}">
        <button class="product__favourite fav-add" type="button" aria-label="Добавить в избранное">
          <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M3 7C3 13 10 16.5 11 17C12 16.5 19 13 19 7C19 4.79086 17.2091 3 15 3C12 3 11 5 11 5C11 5 10 3 7 3C4.79086 3 3 4.79086 3 7Z" stroke="white" stroke-width="2" stroke-linejoin="round"/>
          </svg>
        </button>
        <div class="product__image">
          <div class="product__image-more-photo hidden">+${itAdvert.photos.length - 1} фото</div>
          <img src="${itAdvert.photos[0]}" width="318" height="220" alt="${itAdvert.name}">
        </div>
        <div class="product__content">
          <h3 class="product__title">
            <a href="#">${itAdvert.name}</a>
          </h3>
          <div class="product__price">${itAdvert.price} ₽</div>
          <div class="product__address">${itAdvert.address.city}, ${itAdvert.address.street}</div>
          <div class="product__date">${makeUpTheDate(itAdvert.publishDate)}</div>
        </div>
      </li>`;
    }
    return ;
  })

  insertMarkup(advertsList, advertsMarkup.join(""));
}

function popUpAdvertControl() {
  const advertsList = document.querySelector(".results__list");

  const popUpSection = document.querySelector(".popup");
  const popUpCloseButton = popUpSection.querySelector(".popup__close");
  const popUpDateBlock = popUpSection.querySelector(".popup__date");
  const popUpNameBlock = popUpSection.querySelector(".popup__title");
  const popUpPriceBlock = popUpSection.querySelector(".popup__price");
  const popUpMainImgBlock = popUpSection.querySelector(".gallery__main-pic img");
  const popUpOtherImgBlock = popUpSection.querySelector(".gallery__list");
  const popUpCharsBlocks = popUpSection.querySelectorAll(".popup__chars .chars__item");
  const popUpSellerNameBlock = popUpSection.querySelector(".seller__name");
  const popUpSellerRatingBlock = popUpSection.querySelector(".seller__rating span");
  const popUpDescriptionBlock = popUpSection.querySelector(".popup__description p");
  const popUpAddressBlock = popUpSection.querySelector(".popup__address");

  function hangAllHandlers() {
    popUpCloseButton.addEventListener("click", closeButtonClickHandler);
  }

  function removeAllHandlers() {
    popUpCloseButton.removeEventListener("click", closeButtonClickHandler);
  }

  function closePopUp() {
    removeAllHandlers();

    popUpSection.style.display = "none";
  }

  function createOtherImgsBlock(advert) {
    return advert.photos.map((itPhoto, itIndex) => {
      if(itIndex == 0) {
        return `  
        <li class="gallery__item gallery__item--active">
          <img src="${itPhoto}" width="124" height="80" alt="${advert.name}">
        </li>
        `
      }

      return `  
      <li class="gallery__item">
        <img src="${itPhoto}" width="124" height="80" alt="${advert.name}">
      </li>
      `
    }).join("");
  }

  function openPopUp(advert) {
    hangAllHandlers();
    popUpDateBlock.textContent = makeUpTheDate(advert.publishDate);
    popUpNameBlock.textContent = advert.name;
    popUpPriceBlock.textContent = advert.price;
    popUpMainImgBlock.src = advert.photos[0];
    popUpSellerNameBlock.textContent = advert.seller.fullname;
    popUpSellerRatingBlock.textContent = advert.seller.rating;
    popUpDescriptionBlock.textContent = advert.description;
    popUpAddressBlock.textContent = advert.address.city + ", " + advert.address.street + " дом " + advert.address.building;

    popUpCharsBlocks.forEach((itBlock) => {
      const value = itBlock.querySelector(".chars__value");

      switch(itBlock.dataset.filters) {
        case "area":
          value.textContent = advert.filters.area;
          break;
        case "roomsCount":
          value.textContent = advert.filters.roomsCount;
          break;
        case "type":
          value.textContent = advert.filters.type;
      } 
    });

    insertMarkup(popUpOtherImgBlock, createOtherImgsBlock(advert));

    popUpSection.style.display = "block";
  }

  function cardsClickHandler(evt) {
    evt.preventDefault();

    const targetAdvert = evt.target.closest("li");
    const advertData = advertsData[targetAdvert.dataset.index];

    openPopUp(advertData);
  }

  function closeButtonClickHandler(evt) {
    evt.preventDefault();

    closePopUp();
  }

  advertsList.addEventListener("click", cardsClickHandler);
}

createAdvertsArr(advertsData);
renderAdverts();
popUpAdvertControl();

console.log(advertsData);