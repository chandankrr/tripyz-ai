import UserTripCardItem from '@/components/custom/UserTripCardItem';
import { db } from '@/services/firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const MyTrips = () => {
  const navigate = useNavigate();
  const [userTrips, setUserTrips] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getUserTrips();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getUserTrips = async () => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
      navigate('/');
      return;
    }

    const q = query(
      collection(db, 'AiTrips'),
      where('userEmail', '==', user?.email)
    );

    try {
      const querySnap = await getDocs(q);
      const trips = querySnap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUserTrips(trips);

      // Show toast if no trips found
      if (trips.length === 0) {
        toast('No trips found');
      }
    } catch (error) {
      console.error('Error fetching trips:', error);
      toast('Error fetching trips');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="my-10 px-7 sm:px-10 md:px-20 lg:px-56 xl:px-72">
      <h2 className="text-2xl font-bold">My Trips</h2>

      <div className="grid grid-cols-1 gap-5 mt-7 sm:grid-cols-2 md:grid-cols-3">
        {isLoading ? (
          [1, 2, 3, 4, 5, 6].map((item) => (
            <div
              className="h-[240px] w-full bg-slate-200 animate-pulse rounded-xl"
              key={item}
            ></div>
          ))
        ) : userTrips.length > 0 ? (
          userTrips.map((trip) => (
            <UserTripCardItem key={trip.id} trip={trip} />
          ))
        ) : (
          <p>No trips found. Try planning a new trip!</p>
        )}
      </div>
    </div>
  );
};

export default MyTrips;
