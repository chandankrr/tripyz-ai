import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { budgetOptions, travelOptions } from '@/constants/options';
import { useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { toast } from 'sonner';

const CreateTrip = () => {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState([]);

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onGenerateTrip = () => {
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
  };

  return (
    <div className="px-7 sm:px-10 md:px-32 lg:px-56 xl:px-72 mt-10">
      <h1 className="font-bold text-3xl">Tell us your travel preferences</h1>
      <p className="mt-3 text-gray-500 text-xl line-clamp-3">
        Just provide some basic information, and our trip planner will generate
        a customized itinerary based on your preferences.
      </p>

      <div className="mt-20 flex flex-col gap-7">
        <div>
          <h2 className="text-xl my-3 font-medium">
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
          <h2 className="text-xl my-3 font-medium">
            How many days are you planning your trip?
          </h2>
          <Input
            placeholder="Ex. 3"
            type="number"
            onChange={(e) => handleInputChange('noOfDays', e.target.value)}
          />
        </div>

        <div>
          <h2 className="text-xl my-3 font-medium">What is your budget?</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mt-5 ">
            {budgetOptions.map((item) => (
              <div
                className={`p-4 border rounded-lg hover:shadow-md cursor-pointer ${
                  formData?.budget === item.title && 'shadow-md border-black'
                }`}
                key={item.id}
                onClick={() => handleInputChange('budget', item.title)}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl my-3 font-medium">
            Who do you plan on travelling with on your next adventure?
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mt-5">
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
                <h2 className="font-bold text-lg">{item.title}</h2>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="my-10 justify-end flex">
        <Button onClick={onGenerateTrip}>Generate Trip</Button>
      </div>
    </div>
  );
};

export default CreateTrip;
