import { Link } from 'react-router-dom';
import { Button } from '../ui/button';

const Hero = () => {
  return (
    <div className="flex flex-col items-center h-full mb-16 px-7 sm:px-10 md:px-32 lg:px-56 xl:px-72 gap-7">
      <h1 className="font-extrabold text-[42px] sm:text-[48px] text-center mt-16">
        <span className="text-[#f56555]">
          Discover Your Next Adventure with AI:
        </span>{' '}
        Personalized Itineraries at Your Fingertips
      </h1>

      <p className="text-base text-center text-gray-500 line-clamp-3 sm:text-xl">
        Your personal trip planner and travel curator creates custom itineraries
        tailored to your interests and budget. Enjoy hidden gems, popular
        attractions, and detailed schedules with tips for a seamless vacation.
      </p>

      <Link to={'/create-trip'}>
        <Button>Get Started, It&apos;s Free</Button>
      </Link>

      <img className="mt-12" src="/mockup.png" alt="tripyz mockup" />
    </div>
  );
};

export default Hero;
