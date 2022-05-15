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

function renderAdverts() {
  const advertsList = document.querySelector(".results__list");

  const advertsMarkup = advertsData.map((itAdvert, itIndex) => {
    if(itIndex < 7) {
      return `
        <li class="results__item product">
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
          <div class="product__date">${itAdvert.publishDate.getDate() < 10 ? "0" + itAdvert.publishDate.getDate() : itAdvert.publishDate.getDate()}.${itAdvert.publishDate.getMonth() < 10 ? "0" + itAdvert.publishDate.getMonth() : itAdvert.publishDate.getMonth()}.${itAdvert.publishDate.getFullYear()}</div>
        </div>
      </li>`;
    }
    return ;
  })

  insertMarkup(advertsList, advertsMarkup.join(""));
}

createAdvertsArr(advertsData);
renderAdverts();

console.log(advertsData)