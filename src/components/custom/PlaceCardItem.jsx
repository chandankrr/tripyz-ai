import { getPlaceDetails, PHOTO_REF_URL } from '@/services/globalApi';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const PlaceCardItem = ({ places, location }) => {
  const [imgUrl, setImgUrl] = useState();

  useEffect(() => {
    places && getPlacePhoto();
  }, [places]);

  const getPlacePhoto = async () => {
    const data = {
      textQuery: places?.place + ',' + location,
    };

    const result = await getPlaceDetails(data).then((res) => {
      const photoUrl = PHOTO_REF_URL.replace(
        '{NAME}',
        res?.data?.places[0]?.photos[7]?.name
      );

      setImgUrl(photoUrl);
    });
  };

  return (
    <Link
      to={
        'https://www.google.com/maps/search/?api=1&query=' +
        places?.place +
        ',' +
        location
      }
      target="_blank"
    >
      <div className="flex flex-col gap-5 p-3 mt-2 transition-all border cursor-pointer md:flex-row rounded-xl hover:scale-105 hover:shadow-md">
        <img
          className=" w-full object-cover md:w-[130px] h-[130px] rounded-xl"
          src={imgUrl ? imgUrl : '/place-placeholder.jpg'}
          alt={places?.place}
        />

        <div>
          <h2 className="text-lg font-bold line-clamp-1">{places?.place}</h2>
          <p className="text-sm text-gray-500 line-clamp-2">
            {places?.details}
          </p>
          <h2 className="mt-2 text-sm line-clamp-1">
            🕙 {places?.time_to_travel}
          </h2>
          <h2 className="mt-1 text-sm line-clamp-1">
            Ticket Price: {places?.ticket_pricing}
          </h2>
        </div>
      </div>
    </Link>
  );
};

export default PlaceCardItem;
