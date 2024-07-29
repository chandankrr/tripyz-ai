import { getPlaceDetails, PHOTO_REF_URL } from '@/services/globalApi';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const HotelCardItem = ({ hotel }) => {
  const [imgUrl, setImgUrl] = useState();

  useEffect(() => {
    hotel && getPlacePhoto();
  }, [hotel]);

  const getPlacePhoto = async () => {
    const data = {
      textQuery: hotel?.name + ',',
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
        hotel?.name +
        ',' +
        hotel?.address
      }
      target="_blank"
    >
      <div className="transition-all cursor-pointer hover:scale-105">
        <img
          className="object-cover rounded-xl h-[160px] w-full"
          src={imgUrl ? imgUrl : '/hotel-placeholder.jpg'}
          alt={hotel?.name}
        />

        <div className="flex flex-col gap-1 my-2">
          <h1 className="font-medium truncate">{hotel?.name}</h1>
          <h1 className="text-xs text-gray-500 truncate">📍{hotel?.address}</h1>
          <h1 className="text-sm font-medium">{hotel?.price}</h1>
          <h1 className="text-sm font-medium">⭐ {hotel?.rating} stars</h1>
        </div>
      </div>
    </Link>
  );
};

export default HotelCardItem;
