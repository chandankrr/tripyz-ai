import PlaceCardItem from './PlaceCardItem';

const PlacesToVisit = ({ trip }) => {
  return (
    <div className="mt-5 mb-5">
      <h2 className="text-xl font-bold">Places to Visit</h2>

      <div>
        {trip?.tripData?.itinerary.map((item, index) => (
          <div className="mt-3" key={index}>
            <div className="mt-3">
              <h2 className="text-lg font-medium">{item?.day}</h2>

              <div className="grid gap-5 md:grid-cols-2">
                {item?.plan.map((places, idx) => (
                  <div key={idx}>
                    <h2 className="text-sm font-medium text-orange-600">
                      {places?.time}
                    </h2>

                    <PlaceCardItem
                      places={places}
                      location={trip?.userSelection?.location?.label}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlacesToVisit;
