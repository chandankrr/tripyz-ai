import { Link } from 'react-router-dom';

const UserTripCardItem = ({ trip }) => {
  return (
    <Link to={'/view-trip/' + trip?.id}>
      <div className="transition-all cursor-pointer hover:scale-105">
        <img
          className="object-cover rounded-xl"
          src="/placeholder.jpg"
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
