import { EventPointType } from './event-point-type.js';
import dayjs from 'dayjs';
import { nanoid } from 'nanoid';

const MAX_BASE_PRICE = 1000;

const DESTINATION_DESCRIPTION_LINES = ['Lorem ipsum dolor sit amet consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget. ',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam erat volutpat.',
  'Nunc fermentum tortor ac porta dapibus.',
  'In rutrum ac purus sit amet tempus.'];

const DESTINATION_NAMES = ['Amsterdam', 'Geneva', 'Paris', 'London', 'Madrid', 'Moscow'];
const MIN_DESTINATION_LINES = 1;
const MAX_DESTINATION_LINES = 5;
const OFFER_MIN_PRICE = 10;
const OFFER_MAX_PRICE = 100;
const offersTitles = ['Add luggage', 'Switch to comfort',
  'Add meal', 'Choose seats', 'Travel by train'];

const destinationNames = DESTINATION_NAMES.slice();

let dateFrom = dayjs();
let dateTo = dayjs();

const getRandomInteger = (fromValue, toValue) => {
  if (fromValue >= toValue) {
    throw new Error('начальное значение не может быть больше либо равно конечному');
  }
  return Math.floor(Math.random() * (toValue - fromValue + 1)) + fromValue;
};

let hourGap = getRandomInteger(1, 3);

const getRandomTimestamp = () => Math.floor(getRandomInteger(0, 60) / 10) * 10;

const generateFromToDate = () => {
  dateFrom = dateTo.add(-hourGap, 'hour').set('minute', getRandomTimestamp());
  dateTo = dateTo.add(hourGap, 'hour').set('minute', getRandomTimestamp());
  hourGap = getRandomInteger(1, 3);

  return {
    dateFromGenerated: dateFrom,
    dateToGenerated: dateTo
  };
};

const getRandomNumberItems = (fromItems, min, max) => {
  const toItems = [];
  const toItemsLength = getRandomInteger(min, max);
  for (let index = 0; index < toItemsLength; index++) {
    const itemIndex = getRandomInteger(0, fromItems.length - 1);
    toItems.push(fromItems[itemIndex]);
    fromItems.splice(itemIndex, 1);
  }
  return toItems;
};

const getDestinationDescription = () => {
  const destintionDescriptions = getRandomNumberItems(DESTINATION_DESCRIPTION_LINES.slice(), MIN_DESTINATION_LINES, MAX_DESTINATION_LINES);
  return (destintionDescriptions && destintionDescriptions.length > 0) ? destintionDescriptions.reduce((prev, next) => `${prev} ${next}`) : '';
};

const getPicture = () => ({
  src: `http://picsum.photos/300/200?r=${Math.random()}`,
  description: DESTINATION_DESCRIPTION_LINES[getRandomInteger(0, DESTINATION_DESCRIPTION_LINES.length - 1)]
});

const getPictures = () => {
  const picturesLength = getRandomInteger(1, 5);
  const pictures = [];
  for (let index = 0; index < picturesLength; index++) {
    pictures.push(getPicture());
  }
  return pictures;
};

const generateDestination = (destinationName) => ({
  description: getDestinationDescription(),
  name: destinationName ? destinationName : DESTINATION_NAMES[getRandomInteger(0, DESTINATION_NAMES.length - 1)],
  pictures: getPictures()
});

const generateType = () => {
  const keys = Object.values(EventPointType);
  const index = getRandomInteger(0, keys.length - 1);
  return keys.at(index);
};

const generateRandomOffers = () => {
  const offers = getRandomNumberItems(offersTitles.slice(), 0, offersTitles.length - 1);
  return offers.map((offerTitle) => ({
    id: nanoid(),
    title: offerTitle,
    price: getRandomInteger(OFFER_MIN_PRICE, OFFER_MAX_PRICE)
  }));
};

const generateOffers = (passedType) => ({
  type: passedType ? passedType : generateType(),
  offers: generateRandomOffers()
});

const generatePoint = () => {
  const { dateFromGenerated, dateToGenerated } = generateFromToDate();
  const needOffers = Boolean(getRandomInteger(0, offersTitles.length - 1));
  const needDestination = Boolean(getRandomInteger(0, destinationNames.length - 1));

  return {
    basePrice: getRandomInteger(0, MAX_BASE_PRICE),
    dateFrom: dateFromGenerated,
    dateTo: dateToGenerated,
    destination: needDestination ? generateDestination() : null,
    id: nanoid(),
    isFavorite: Boolean(getRandomInteger(0, 1)),
    offers: needOffers ? generateOffers() : null,
    type: generateType(),
  };
};

const generateTypeToOffers = () => {
  const typeToOffers = new Map();
  const keys = Object.keys(EventPointType);

  for (let i = 0; i < keys.length; i++) {
    const type = keys[i];
    typeToOffers.set(type, generateOffers(type));
  }
  return {
    getOffersByType: (type) => typeToOffers.get(type)
  };
};

const generateDestinationNameToDestinations = () => {
  const destinationNameToDestinations = new Map();
  for (let i = 0; i < DESTINATION_NAMES.length; i++) {
    destinationNameToDestinations.set(DESTINATION_NAMES[i], generateDestination(DESTINATION_NAMES[i]));
  }
  return {
    getDescriptionByDestination: (destinationName) => destinationNameToDestinations.get(destinationName)
  };
};


const generatePoints = (mockPointsNumber) => {
  const mockPoints = [];
  for (let index = 0; index < mockPointsNumber; index++) {
    mockPoints.push(generatePoint());
  }
  return mockPoints;
};

export { generatePoints, destinationNames, generateTypeToOffers, generateDestinationNameToDestinations };
