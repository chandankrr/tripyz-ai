import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { AI_PROMT, budgetOptions, travelOptions } from '@/constants/options';
import { useAuth } from '@/context/AuthContext';
import { chatSession } from '@/services/AIModal';
import { db } from '@/services/firebaseConfig';
import { collection, doc, setDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const CreateTrip = () => {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user, login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setOpenDialog(false);
      const pendingTripData = JSON.parse(
        localStorage.getItem('pendingTripData')
      );
      if (pendingTripData) {
        setFormData(pendingTripData);
        localStorage.removeItem('pendingTripData');
        onGenerateTrip(pendingTripData);
      }
    }
  }, [user]);

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const saveAiTrip = async (tripData) => {
    setLoading(true);

    try {
      const docRef = doc(collection(db, 'AiTrips'));
      await setDoc(docRef, {
        userSelection: formData,
        tripData: JSON.parse(tripData),
        userEmail: user?.email,
        id: docRef.id,
      });

      navigate('/view-trip/' + docRef.id);
    } catch (error) {
      console.error('Error saving trip: ', error);
      toast('Error saving trip. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const onGenerateTrip = async (data = formData) => {
    if (data?.noOfDays <= 0) {
      toast('Number of days must be greater than zero');
      return;
    }

    if (data?.noOfDays > 7) {
      toast('Maximum days for a trip cannot exceed one week');
      return;
    }

    if (
      !data?.location ||
      !data?.budget ||
      !data?.noOfPeople ||
      !data?.noOfDays
    ) {
      toast('Please fill all details');
      return;
    }

    if (!user) {
      setOpenDialog(true);
      return;
    }

    setLoading(true);

    const FINAL_PROMPT = AI_PROMT.replace('{location}', data?.location?.label)
      .replace('{totalDays}', data?.noOfDays)
      .replace('{totalPeople}', data?.noOfPeople)
      .replace('{budget}', data?.budget)
      .replace('{totalDays}', data?.noOfDays);

    try {
      const result = await chatSession.sendMessage(FINAL_PROMPT);
      saveAiTrip(result?.response?.text());
    } catch (error) {
      console.error('Error generating trip:', error);
      toast('An error occurred while generating the trip. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-10 px-7 sm:px-10 md:px-32 lg:px-56 xl:px-72">
      <h1 className="text-3xl font-bold">Tell us your travel preferences</h1>
      <p className="mt-3 text-xl text-gray-500 line-clamp-3">
        Just provide some basic information, and our trip planner will generate
        a customized itinerary based on your preferences.
      </p>

      <div className="flex flex-col mt-20 gap-7">
        <div>
          <h2 className="my-3 text-xl font-medium">
            What is destination of choice?
          </h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              place,
              onChange: (v) => {
                setPlace(v);
                handleInputChange('location', v);
              },
            }}
          />
        </div>

        <div>
          <h2 className="my-3 text-xl font-medium">
            How many days are you planning your trip?
          </h2>
          <Input
            placeholder="Ex. 3"
            type="number"
            onChange={(e) => handleInputChange('noOfDays', e.target.value)}
          />
        </div>

        <div>
          <h2 className="my-3 text-xl font-medium">What is your budget?</h2>
          <div className="grid grid-cols-2 gap-5 mt-5 md:grid-cols-3 ">
            {budgetOptions.map((item) => (
              <div
                className={`p-4 border rounded-lg hover:shadow-md cursor-pointer ${
                  formData?.budget === item.title && 'shadow-md border-black'
                }`}
                key={item.id}
                onClick={() => handleInputChange('budget', item.title)}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="text-lg font-bold">{item.title}</h2>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="my-3 text-xl font-medium">
            Who do you plan on travelling with on your next adventure?
          </h2>
          <div className="grid grid-cols-2 gap-5 mt-5 md:grid-cols-3">
            {travelOptions.map((item) => (
              <div
                className={`p-4 border rounded-lg hover:shadow-md cursor-pointer ${
                  formData?.noOfPeople === item.people &&
                  'shadow-md border-black'
                }`}
                key={item.id}
                onClick={() => handleInputChange('noOfPeople', item.people)}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="text-lg font-bold">{item.title}</h2>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end my-10">
        <Button disabled={loading} onClick={() => onGenerateTrip()}>
          {loading ? (
            <AiOutlineLoading3Quarters size={20} className="animate-spin" />
          ) : (
            'Generate Trip'
          )}
        </Button>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              <h1 className="text-2xl font-medium">Tripyz AI</h1>
            </DialogTitle>
            <DialogDescription>
              <h2 className="text-lg font-medium text-black">
                Sign In With Google
              </h2>
              <p>Sign in to the App with Google Authentication</p>
              <Button
                className="flex items-center w-full gap-2 mt-5"
                onClick={() => {
                  localStorage.setItem(
                    'pendingTripData',
                    JSON.stringify(formData)
                  );
                  login();
                }}
              >
                <FcGoogle size={20} /> Sign In With Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateTrip;
