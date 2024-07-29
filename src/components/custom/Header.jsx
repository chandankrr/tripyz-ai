import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useAuth } from '@/context/AuthContext';
import { useEffect, useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { Button } from '../ui/button';

const Header = () => {
  const { user, login, logout } = useAuth();
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <div className="flex items-center justify-between p-3 shadow-sm px-7">
      <a href="/">
        <h1 className="text-3xl font-medium">Tripyz AI</h1>
      </a>

      <div>
        {user ? (
          <div className="flex items-center gap-3">
            <a href="/create-trip">
              <Button
                className="hidden rounded-full md:block"
                variant="outline"
              >
                + Create Trip
              </Button>
            </a>

            <a href="/my-trips">
              <Button
                className="hidden rounded-full md:block"
                variant="outline"
              >
                My Tips
              </Button>
            </a>

            <Popover>
              <PopoverTrigger>
                {user?.picture ? (
                  <img
                    className="h-[35px] w-[35px] rounded-full"
                    src={user?.picture}
                    alt={user?.name}
                  />
                ) : (
                  <FaUserCircle size={32} />
                )}
              </PopoverTrigger>
              <PopoverContent>
                <div className="flex flex-col gap-2">
                  <a href="/create-trip">
                    <h2 className="px-3 py-1 border rounded-md cursor-pointer md:hidden">
                      Create Trip
                    </h2>
                  </a>

                  <a href="/my-trips">
                    <h2 className="px-3 py-1 border rounded-md cursor-pointer md:hidden">
                      My Tips
                    </h2>
                  </a>

                  <a href="/">
                    <h2
                      onClick={logout}
                      className="px-3 py-1 text-red-600 border border-red-600 rounded-md cursor-pointer"
                    >
                      Logout
                    </h2>
                  </a>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Button onClick={() => setOpenDialog(true)}>Sign In</Button>
        )}
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
                  login();
                  setOpenDialog(false);
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

export default Header;
