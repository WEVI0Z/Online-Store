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
  "apatment",
  "flat"
]

const MIN_AREA = 30;
const MAX_AREA = 250;

const MIN_ROOMS_COUNT = 1;
const MAX_ROOMS_COUNT = 7;

function getRandomNum(minNum, maxNum) {
  return Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
}

function getRandomIndex(arrLength) {
  return Math.floor(Math.random() * arrLength);
}

function createPropertyDate() {
  const object = {
    name: NAMES[getRandomIndex(NAMES.length)],
    description: DESCRIPTIONS[getRandomIndex(DESCRIPTIONS.length)],
    price: getRandomNum(MIN_PRICE, MAX_PRICE),
    category: CATEGORY,
    seller: {
      fullname: FULLNAMES[getRandomIndex(FULLNAMES.length)],
      rating: getRandomNum(MIN_RATING, MAX_RATING * 10) / 10
    },
    publishDate: new Date(currentDate.getFullYear(), getRandomNum(1, currentDate.getMonth()), getRandomNum(1, currentDate.getDate()))
  }

  return object;
}

console.log(createPropertyDate());