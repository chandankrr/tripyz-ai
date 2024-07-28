import { IoIosShareAlt } from 'react-icons/io';
import { toast } from 'sonner';
import { Button } from '../ui/button';

const InformationSection = ({ trip }) => {
  const copyToClipboard = () => {
    const currentUrl = window.location.href;
    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        toast('Link copied to clipboard!');
      })
      .catch((err) => {
        toast('Failed to copy the link!');
        console.error('Failed to copy the link: ', err);
      });
  };

  return (
    <div>
      <img
        className="w-full h-[340px] object-cover rounded-xl"
        src="/placeholder.jpg"
        alt="trip info"
      />

      <div className="flex flex-col gap-2 my-5">
        <h1 className="text-2xl font-bold">
          {trip?.userSelection?.location?.label}
        </h1>

        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-2 md:gap-5 md:flex-row">
            <h2 className="p-1 px-3 text-sm text-gray-500 bg-gray-200 rounded-full md:text-base">
              📆 {trip?.userSelection?.noOfDays}{' '}
              {trip?.userSelection?.noOfDays == 1 ? 'Day' : 'Days'}
            </h2>
            <h2 className="p-1 px-3 text-sm text-gray-500 bg-gray-200 rounded-full md:text-base">
              {trip?.userSelection?.budget} Budget
            </h2>
            <h2 className="p-1 px-3 text-sm text-gray-500 bg-gray-200 rounded-full md:text-base">
              No. of Traveler:{' '}
              {trip?.userSelection?.noOfPeople?.replace('people', 'People')}
            </h2>
          </div>

          <Button onClick={copyToClipboard}>
            <IoIosShareAlt size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InformationSection;
