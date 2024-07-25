import Hotel from '@/components/custom/Hotel';
import InformationSection from '@/components/custom/InformationSection';
import PlacesToVisit from '@/components/custom/PlacesToVisit';
import { db } from '@/services/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

const ViewTrip = () => {
  const { tripId } = useParams();

  const [trip, setTrip] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    tripId && getTripData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tripId]);

  const getTripData = async () => {
    setLoading(true);

    try {
      const docRef = doc(db, 'AiTrips', tripId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setTrip(docSnap.data());
        console.log('Document: ', docSnap.data());
      } else {
        toast('No trip found');
        console.log('No such document');
      }
    } catch (error) {
      console.error('Error fetching trip data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <AiOutlineLoading3Quarters size={36} className="animate-spin" />
      </div>
    );
  if (trip.length === 0)
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <h2 className="text-black">No trip data available</h2>
      </div>
    );

  return (
    <div className="mt-10 px-7 sm:px-10 md:px-20 lg:px-56 xl:px-72">
      {/* Information section */}
      <InformationSection trip={trip} />

      {/* Recommended hotel section */}
      <Hotel trip={trip} />

      {/* Daily Plan */}
      <PlacesToVisit trip={trip} />

      {/* Footer */}
    </div>
  );
};

export default ViewTrip;
