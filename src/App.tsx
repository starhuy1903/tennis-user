import { useEffect, useState } from 'react';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { useAppSelector } from 'store';

import AffiliateSponsor from 'components/Authenticated/AffiliateSponsor';
import GroupService from 'components/Authenticated/GroupService';
import GroupCreate from 'components/Authenticated/GroupService/GroupCreate';
import GroupDetail from 'components/Authenticated/GroupService/GroupDetail';
import GroupDetailLayout from 'components/Authenticated/GroupService/GroupDetail/GroupDetailLayout';
import GroupLayout from 'components/Authenticated/GroupService/GroupLayout';
import VNPReturn from 'components/Authenticated/PaymentReturn/VNPReturn';
import Profile from 'components/Authenticated/Profile';
import TournamentService from 'components/Authenticated/TournamentService';
import CreateTournament from 'components/Authenticated/TournamentService/CreateTournament';
import TournamentLayout from 'components/Authenticated/TournamentService/TournamentLayout';
import CenterLoading from 'components/Common/CenterLoading';
import AuthenticatedLayout from 'components/Common/Layout/AuthenticatedLayout';
import UnauthenticatedLayout from 'components/Common/Layout/UnauthenticatedLayout';
import Home from 'components/Home';
import Login from 'components/Unauthenticated/Login';
import News from 'components/Unauthenticated/News';
import NewsDetail from 'components/Unauthenticated/News/NewsDetail';
import Pricing from 'components/Unauthenticated/Pricing';
import Signup from 'components/Unauthenticated/Signup';
import { useGetAppConfigQuery } from 'store/api/commonApiSlice';
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
        path: 'profile',
        children: [
          {
            index: true,
            element: <Profile activeTab="feeds" />,
          },
          {
            path: 'feeds',
            element: <Profile activeTab="feeds" />,
          },
          {
            path: 'packages',
            element: <Profile activeTab="packages" />,
          },
          {
            path: 'payments',
            element: <Profile activeTab="payments" />,
          },
          {
            path: 'settings',
            element: <Profile activeTab="settings" />,
          },
        ],
      },
      {
        path: 'affiliate-sponsor',
        element: <AffiliateSponsor />,
      },
      {
        path: 'payment/return/vnpay',
        element: <VNPReturn />,
      },
    ],
  },
  {
    path: 'groups',
    element: <GroupLayout />,
    children: [
      {
        index: true,
        element: <GroupService />,
      },
      {
        path: ':groupId',
        element: <GroupDetailLayout />,
        children: [
          {
            index: true,
            element: <GroupDetail />,
          },
        ],
      },
      {
        path: ':id/create',
        element: <GroupCreate />,
      },
    ],
  },
  {
    path: 'tournaments',
    element: <TournamentLayout />,
    children: [
      {
        index: true,
        element: <TournamentService />,
      },
      {
        path: 'create',
        element: <CreateTournament />,
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
    element: <UnauthenticatedLayout />,
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
  const { isLoading: fetchingAppConfig } = useGetAppConfigQuery();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    (async () => {
      if (isLoggedIn) {
        await getProfile().unwrap();
      }
      setInitialized(true);
    })();
  }, [isLoggedIn, getProfile]);

  if (isLoading || !initialized || fetchingAppConfig) {
    return <CenterLoading />;
  }

  return isLoggedIn ? <RouterProvider router={protectedRoutes} /> : <RouterProvider router={publicRoutes} />;
}

export default App;
