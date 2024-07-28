import { GoogleOAuthProvider } from '@react-oauth/google';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import Header from './components/custom/Header.jsx';
import { Toaster } from './components/ui/sonner.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import './index.css';
import CreateTrip from './pages/create-trip.jsx';
import MyTrips from './pages/my-tips.jsx';
import ViewTrip from './pages/view-trip/[tripId]/index.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/create-trip',
    element: <CreateTrip />,
  },
  {
    path: '/view-trip/:tripId',
    element: <ViewTrip />,
  },
  {
    path: '/my-trips',
    element: <MyTrips />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
      <AuthProvider>
        <Header />
        <Toaster />
        <RouterProvider router={router} />
      </AuthProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
