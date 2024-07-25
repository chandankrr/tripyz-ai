import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Hotel = ({ trip }) => {
  return (
    <div className="mt-5">
      <h2 className="text-xl font-bold">Hotels Recommendation</h2>

      <div className="grid grid-cols-2 gap-5 mt-3 md:grid-cols-3 xl:grid-cols-4">
        {trip?.tripData?.hotel_options.map((hotel, index) => (
          <Link
            to={
              'https://www.google.com/maps/search/?api=1&query=' +
              hotel?.name +
              ',' +
              hotel?.address
            }
            key={index}
            target="_blank"
          >
            <div className="transition-all cursor-pointer hover:scale-105">
              <img
                className="rounded-xl"
                src="/placeholder.jpg"
                alt={hotel?.name}
              />

              <div className="flex flex-col gap-1 my-2">
                <h1 className="font-medium truncate">{hotel?.name}</h1>
                <h1 className="text-xs text-gray-500 truncate">
                  📍{hotel?.address}
                </h1>
                <h1 className="text-sm font-medium">{hotel?.price}</h1>
                <h1 className="text-sm font-medium">
                  ⭐ {hotel?.rating} stars
                </h1>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Hotel;
