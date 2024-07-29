import { getPlaceDetails, PHOTO_REF_URL } from '@/services/globalApi';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const UserTripCardItem = ({ trip }) => {
  const [imgUrl, setImgUrl] = useState();

  useEffect(() => {
    trip && getPlacePhoto();
  }, [trip]);

  const getPlacePhoto = async () => {
    const data = {
      textQuery:
        'famous tourist place of ' + trip?.userSelection?.location?.label,
    };

    const result = await getPlaceDetails(data).then((res) => {
      const photoUrl = PHOTO_REF_URL.replace(
        '{NAME}',
        res?.data?.places[0]?.photos[0]?.name
      );

      setImgUrl(photoUrl);
    });
  };
  return (
    <Link to={'/view-trip/' + trip?.id}>
      <div className="transition-all cursor-pointer hover:scale-105">
        <img
          className="object-cover h-[260px] w-full rounded-xl"
          src={imgUrl}
          alt=""
        />

        <div>
          <h2 className="text-lg font-medium line-clamp-1">
            {trip?.userSelection?.location?.label}
          </h2>
          <p className="text-sm text-gray-700 line-clamp-1">
            {trip?.userSelection?.noOfDays} Days trip with{' '}
            {trip?.userSelection?.budget} Budget
          </p>
        </div>
      </div>
    </Link>
  );
};

export default UserTripCardItem;
