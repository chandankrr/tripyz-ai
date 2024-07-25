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
import { chatSession } from '@/services/AIModal';
import { db } from '@/services/firebaseConfig';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { collection, doc, setDoc } from 'firebase/firestore';
import { useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { toast } from 'sonner';

const CreateTrip = () => {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const saveAiTrip = async (tripData) => {
    setLoading(true);

    try {
      const user = JSON.parse(localStorage.getItem('user'));

      const docRef = doc(collection(db, 'AiTrips'));
      await setDoc(docRef, {
        userSelection: formData,
        tripData: JSON.parse(tripData),
        userEmail: user?.email,
        id: docRef.id,
      });

      setLoading(false);
    } catch (error) {
      console.error('Error saving trip: ', error);
      setLoading(false);
    }
  };

  const onGenerateTrip = async () => {
    if (formData?.noOfDays <= 0) {
      toast('Number of days must be greater than zero');
      return;
    }

    if (formData?.noOfDays > 7) {
      toast('Maximum days for a trip cannot exceed one week');
      return;
    }

    if (!formData?.location || !formData?.budget || !formData?.noOfPeople) {
      toast('Please fill all details');
      return;
    }

    const user = localStorage.getItem('user');

    if (!user) {
      setOpenDialog(true);
      return;
    }

    setLoading(true);

    const FINAL_PROMPT = AI_PROMT.replace(
      '{location}',
      formData?.location?.label
    )
      .replace('{totalDays}', formData?.noOfDays)
      .replace('{totalPeople}', formData?.noOfPeople)
      .replace('{budget}', formData?.budget)
      .replace('{totalDays}', formData?.noOfDays);

    console.log(FINAL_PROMPT);

    try {
      const result = await chatSession.sendMessage(FINAL_PROMPT);

      console.log(result?.response?.text());
      setLoading(false);
      saveAiTrip(result?.response?.text());
    } catch (error) {
      console.error('Error generating trip:', error);
      toast('An error occurred while generating the trip. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const login = useGoogleLogin({
    onSuccess: (res) => getUserProfile(res),
    onError: (error) => console.log(error),
  });

  const getUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: 'Application/json',
          },
        }
      )
      .then((res) => {
        localStorage.setItem('user', JSON.stringify(res.data));
        setOpenDialog(false);
        onGenerateTrip();
      });
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
        <Button disabled={loading} onClick={onGenerateTrip}>
          {loading ? (
            <AiOutlineLoading3Quarters size={20} className="animate-spin" />
          ) : (
            'Generate Trip'
          )}
        </Button>
      </div>

      <Dialog open={openDialog}>
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
                onClick={login}
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
