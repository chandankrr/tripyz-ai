import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-flash',
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: 'application/json',
};

export const chatSession = model.startChat({
  generationConfig,

  history: [
    {
      role: 'user',
      parts: [
        {
          text: 'Generate Travel Plan for Location: Las Vegas, for 3 Days for Couple with a Cheap Budget, Give me list of recommended Hotels options with name, address, price, image url, geo coordinates, rating, descriptions and suggest itinerary with place name, place details, place image url, geo coordinates, ticket pricing, time to travel each of the location for 3 days with each day plan with best time to visit in JSON format.',
        },
      ],
    },
    {
      role: 'model',
      parts: [
        {
          text: '```json\n{\n  "hotel_options": [\n    {\n      "name": "The D Las Vegas",\n      "address": "301 Fremont Street, Las Vegas, NV 89101",\n      "price": "$50-$100 per night",\n      "image_url": "https://www.thedleon.com/images/hotel/featured-image-the-d-hotel.jpg",\n      "geo_coordinates": "36.1698, -115.1423",\n      "rating": 4.0,\n      "description": "A budget-friendly hotel located in the heart of Fremont Street Experience. Offers basic rooms with comfortable amenities and access to the vibrant atmosphere of the Fremont Street."\n    },\n    {\n      "name": "Golden Nugget Las Vegas",\n      "address": "129 E Fremont Street, Las Vegas, NV 89101",\n      "price": "$70-$150 per night",\n      "image_url": "https://www.goldennugget.com/images/default-source/hotels/goldennuggetlasvegas/hotel-gallery/golden-nugget-las-vegas-hotel-exterior.jpg?sfvrsn=a4e56585_2",\n      "geo_coordinates": "36.1696, -115.1406",\n      "rating": 4.5,\n      "description": "A historic hotel with a modern touch, known for its impressive aquarium and lively atmosphere. Offers a range of room options and entertainment choices."\n    },\n    {\n      "name": "Circus Circus Hotel & Casino",\n      "address": "2880 Las Vegas Blvd S, Las Vegas, NV 89109",\n      "price": "$40-$80 per night",\n      "image_url": "https://www.circuscircus.com/media/images/hotel/circus-circus-hotel-pool.jpg",\n      "geo_coordinates": "36.1097, -115.1717",\n      "rating": 3.5,\n      "description": "A classic Las Vegas hotel with a circus theme, offering affordable rooms, a large arcade, and a variety of dining options."\n    }\n  ],\n  "itinerary": [\n    {\n      "day": 1,\n      "time": "Morning (9:00 AM - 12:00 PM)",\n      "place": "Fremont Street Experience",\n      "details": "Explore the vibrant pedestrian mall with live music, street performers, and dazzling light shows. You can also try some of the many food and drink options available.",\n      "image_url": "https://www.vegasexperience.com/wp-content/uploads/2016/02/Fremont-Street-Experience-Las-Vegas.jpg",\n      "geo_coordinates": "36.1698, -115.1421",\n      "ticket_pricing": "Free",\n      "time_to_travel": "2 hours"\n    },\n    {\n      "day": 1,\n      "time": "Afternoon (12:00 PM - 2:00 PM)",\n      "place": "Pinball Hall of Fame",\n      "details": "Enjoy classic and modern pinball machines for a unique and nostalgic experience. The entry fee is reasonable, and you can spend as much time as you like.",\n      "image_url": "https://pinballhalloffame.org/images/new/pinball-hall-of-fame-las-vegas-main-entrance.jpg",\n      "geo_coordinates": "36.1667, -115.1569",\n      "ticket_pricing": "$12 per person",\n      "time_to_travel": "2 hours"\n    },\n    {\n      "day": 1,\n      "time": "Evening (6:00 PM - 9:00 PM)",\n      "place": "The Neon Museum",\n      "details": "Discover the history of Las Vegas through iconic neon signs. Take a guided tour to learn about the city\'s past and capture memorable photos.",\n      "image_url": "https://www.neonmuseum.org/images/slideshow/NeonMuseum-Sign-Boneyard-Las-Vegas-Nevada-Photography-14.jpg",\n      "geo_coordinates": "36.1718, -115.1415",\n      "ticket_pricing": "$25 per person",\n      "time_to_travel": "2 hours"\n    },\n    {\n      "day": 2,\n      "time": "Morning (9:00 AM - 12:00 PM)",\n      "place": "Red Rock Canyon National Conservation Area",\n      "details": "Escape the city and enjoy a scenic drive through the stunning red rock formations. You can hike, rock climb, or simply enjoy the natural beauty.",\n      "image_url": "https://www.nps.gov/redr/learn/nature/images/red-rock-canyon-landscape.jpg",\n      "geo_coordinates": "36.1526, -115.2705",\n      "ticket_pricing": "$7 per vehicle",\n      "time_to_travel": "3 hours"\n    },\n    {\n      "day": 2,\n      "time": "Afternoon (1:00 PM - 4:00 PM)",\n      "place": "The LINQ Promenade",\n      "details": "Enjoy a leisurely stroll along the promenade with shops, restaurants, and entertainment. You can also ride the High Roller observation wheel for panoramic views of the city.",\n      "image_url": "https://www.caesars.com/content/dam/caesars/linq/linq-promenade-las-vegas.jpg",\n      "geo_coordinates": "36.1256, -115.1725",\n      "ticket_pricing": "Free (High Roller: $25 per person)",\n      "time_to_travel": "2 hours"\n    },\n    {\n      "day": 2,\n      "time": "Evening (7:00 PM - 9:00 PM)",\n      "place": "Free Show on the Strip",\n      "details": "Enjoy a free show on the Las Vegas Strip, such as the Bellagio Fountains or the Mirage Volcano. Check the schedules online for showtimes.",\n      "image_url": "https://www.bellagio.com/content/dam/bellagio/entertainment/fountains/images/hero-2.jpg",\n      "geo_coordinates": "36.1109, -115.1725",\n      "ticket_pricing": "Free",\n      "time_to_travel": "1 hour"\n    },\n    {\n      "day": 3,\n      "time": "Morning (10:00 AM - 1:00 PM)",\n      "place": "The Mob Museum",\n      "details": "Learn about the history of organized crime in Las Vegas and the United States. This interactive museum offers exhibits and artifacts that will fascinate history buffs and true crime enthusiasts.",\n      "image_url": "https://www.themobmuseum.org/sites/default/files/styles/gallery_slideshow_image/public/field/image/mob-museum-exterior.jpg",\n      "geo_coordinates": "36.1700, -115.1381",\n      "ticket_pricing": "$25 per person",\n      "time_to_travel": "2 hours"\n    },\n    {\n      "day": 3,\n      "time": "Afternoon (2:00 PM - 4:00 PM)",\n      "place": "Springs Preserve",\n      "details": "Explore the unique desert environment and learn about conservation and sustainability. The Springs Preserve offers gardens, museums, and interactive exhibits.",\n      "image_url": "https://www.springspreserve.org/wp-content/uploads/2021/03/Springs-Preserve-Aerial-View-2.jpg",\n      "geo_coordinates": "36.1464, -115.1315",\n      "ticket_pricing": "$18 per person",\n      "time_to_travel": "2 hours"\n    },\n    {\n      "day": 3,\n      "time": "Evening (7:00 PM - 9:00 PM)",\n      "place": "Downtown Container Park",\n      "details": "Enjoy a unique shopping and dining experience in repurposed shipping containers. You can also watch live music and enjoy the outdoor atmosphere.",\n      "image_url": "https://www.containerpark.com/wp-content/uploads/2019/05/Container-Park-Las-Vegas-Day.jpg",\n      "geo_coordinates": "36.1669, -115.1470",\n      "ticket_pricing": "Free",\n      "time_to_travel": "1 hour"\n    }\n  ]\n}\n```\n\n**Please note:**\n\n* This itinerary is just a suggestion and can be adjusted based on your interests and preferences.\n* Ticket prices are subject to change.\n* You can find more affordable dining options off the Strip.\n* Consider using public transportation or ride-sharing services to save on transportation costs.\n* Always check the opening hours and availability of attractions before you go.\n',
        },
      ],
    },
  ],
});
