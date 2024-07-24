export const travelOptions = [
  {
    id: 1,
    title: 'Just Me',
    desc: 'A sole traveles in exporation',
    icon: '🛩️',
    people: '1 people',
  },
  {
    id: 2,
    title: 'A Couple',
    desc: 'Two traveles in tandem',
    icon: '🥂',
    people: '2 people',
  },
  {
    id: 3,
    title: 'Family',
    desc: 'A group of fun loving adv',
    icon: '🏠',
    people: '3 to  4 people',
  },
  {
    id: 4,
    title: 'Friends',
    desc: 'A bunch of thrill-seekers',
    icon: '🍾',
    people: '5 to 10 people',
  },
];

export const budgetOptions = [
  {
    id: 1,
    title: 'Cheap',
    desc: 'Stay conscious of costs',
    icon: '💸',
  },
  {
    id: 2,
    title: 'Moderate',
    desc: 'Keep cost on the average side',
    icon: '💰',
  },
  {
    id: 3,
    title: 'Luxury',
    desc: "Don't worry about cost",
    icon: '💎',
  },
];

export const AI_PROMT =
  'Generate Travel Plan for Location: {location}, for {totalDays} Days for {totalPeople} with a {budget} Budget, Give me list of recommended Hotels options with name, address, price, image url, geo coordinates, rating, descriptions and suggest itinerary with place name, place details, place image url, geo coordinates, ticket pricing, time to travel each of the location for {totalDays} days with each day plan with best time to visit in JSON format.';
