import { useEffect } from 'react';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { useAppSelector } from 'store';

import AffiliateSponsor from 'components/Authenticated/AffiliateSponsor';
import GroupCreate from 'components/Authenticated/GroupCreate';
import GroupDetail from 'components/Authenticated/GroupDetail';
import Profile from 'components/Authenticated/Profile';
import CenterLoading from 'components/Common/CenterLoading';
import AuthenticatedLayout from 'components/Common/Layout/AuthenticatedLayout';
import PageLayout from 'components/Common/Layout/PageLayout';
import Home from 'components/Home';
import Login from 'components/Unauthenticated/Login';
import News from 'components/Unauthenticated/News';
import NewsDetail from 'components/Unauthenticated/News/NewsDetail';
import Pricing from 'components/Unauthenticated/Pricing';
import Signup from 'components/Unauthenticated/Signup';
import { useLazyGetProfileQuery } from 'store/api/userApiSlice';

import './App.css';

const sharedRoutes = [
  {
    index: true,
    element: <Home />,
  },
  {
    path: 'news',
    element: <News />,
  },
  {
    path: 'news/:id',
    element: <NewsDetail />,
  },
  {
    path: 'pricing',
    element: <Pricing />,
  },
];

const protectedRoutes = createBrowserRouter([
  {
    path: '/',
    element: <AuthenticatedLayout />,
    children: [
      ...sharedRoutes,
      {
        path: 'groups/:groupId',
        element: <GroupDetail />,
      },
      {
        path: 'profile',
        element: <Profile activeTab="feeds" />,
      },
      {
        path: 'profile/feeds',
        element: <Profile activeTab="feeds" />,
      },
      {
        path: 'profile/packages',
        element: <Profile activeTab="packages" />,
      },
      {
        path: 'profile/payments',
        element: <Profile activeTab="payments" />,
      },
      {
        path: 'profile/settings',
        element: <Profile activeTab="settings" />,
      },
      {
        path: 'groups/:id/create',
        element: <GroupCreate />,
      },
      {
        path: 'affiliate-sponsor',
        element: <AffiliateSponsor />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to={`/`} />,
  },
]);

const publicRoutes = createBrowserRouter([
  {
    path: '/',
    element: <PageLayout />,
    children: [
      ...sharedRoutes,
      {
        path: 'signup',
        element: <Signup />,
      },
      {
        path: 'login',
        element: <Login />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to={`/`} />,
  },
]);

function App() {
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
  const [getProfile, { isLoading }] = useLazyGetProfileQuery();

  useEffect(() => {
    if (isLoggedIn) {
      getProfile();
    }
  }, [isLoggedIn, getProfile]);

  if (isLoading) {
    return <CenterLoading />;
  }

  return isLoggedIn ? <RouterProvider router={protectedRoutes} /> : <RouterProvider router={publicRoutes} />;
}

export default App;
