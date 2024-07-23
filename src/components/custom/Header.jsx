import { Button } from '../ui/button';

const Header = () => {
  return (
    <div className="p-3 px-7 shadow-sm flex justify-between items-center">
      <h1 className="font-medium text-3xl">Tripyz AI</h1>

      <div>
        <Button>Sign In</Button>
      </div>
    </div>
  );
};

export default Header;
