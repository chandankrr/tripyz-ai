import HotelCardItem from './HotelCardItem';

const Hotel = ({ trip }) => {
  return (
    <div className="mt-5">
      <h2 className="text-xl font-bold">Hotels Recommendation</h2>

      <div className="grid grid-cols-2 gap-5 mt-3 md:grid-cols-3 xl:grid-cols-4">
        {trip?.tripData?.hotel_options.map((hotel, index) => (
          <HotelCardItem hotel={hotel} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Hotel;
