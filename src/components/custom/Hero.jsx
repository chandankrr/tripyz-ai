import { Link } from 'react-router-dom';
import { Button } from '../ui/button';

const Hero = () => {
  return (
    <div className="flex items-center h-full px-7 sm:px-10 md:px-32 lg:px-56 xl:px-72 flex-col gap-9 mb-16">
      <h1 className="font-extrabold text-[42px] sm:text-[48px] md:text-[52px] text-center mt-16">
        <span className="text-[#f56555]">
          Discover Your Next Adventure with AI:
        </span>{' '}
        Personalized Itineraries at Your Fingertips
      </h1>

      <p className="line-clamp-3 text-lg sm:text-xl text-gray-500 text-center">
        Your personal trip planner and travel curator creates custom itineraries
        tailored to your interests and budget. Enjoy hidden gems, popular
        attractions, and detailed schedules with tips for a seamless vacation.
      </p>

      <Link to={'/create-trip'}>
        <Button>Get Started, It&apos;s Free</Button>
      </Link>
    </div>
  );
};

export default Hero;
