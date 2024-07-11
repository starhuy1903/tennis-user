import { useEffect, useState } from 'react';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { useAppSelector } from 'store';

import AddMemberToGroup from 'components/Authenticated/AddMemberToGroup';
import AdvertisementDetails from 'components/Authenticated/AdvertisementService/AdvertisementDetails';
import AdvertisementLayout from 'components/Authenticated/AdvertisementService/AdvertisementLayout';
import AdvertisementList from 'components/Authenticated/AdvertisementService/AdvertisementList';
import CreateAdvertisement from 'components/Authenticated/AdvertisementService/CreateAdvertisement';
import EditAdvertisement from 'components/Authenticated/AdvertisementService/EditAdvertisement';
import MyAdvertisementDetails from 'components/Authenticated/AdvertisementService/MyAdvertisementDetails';
import MyAdvertisement from 'components/Authenticated/AdvertisementService/MyAdvertisements';
import GroupService from 'components/Authenticated/GroupService';
import GroupCreate from 'components/Authenticated/GroupService/GroupCreate';
import { groupDetailsRoutes } from 'components/Authenticated/GroupService/GroupDetails';
import GroupTournaments from 'components/Authenticated/GroupService/GroupDetails/GroupTournaments';
import CreateGroupTournament from 'components/Authenticated/GroupService/GroupDetails/GroupTournaments/CreateGroupTournament';
import { groupTournamentDetailsRoutes } from 'components/Authenticated/GroupService/GroupDetails/GroupTournaments/GroupTournamentDetails';
import GroupLayout from 'components/Authenticated/GroupService/GroupLayout';
import VNPReturn from 'components/Authenticated/PaymentReturn/VNPReturn';
import Profile from 'components/Authenticated/Profile';
import EditProfile from 'components/Authenticated/Profile/EditProfile';
import TournamentService from 'components/Authenticated/TournamentService';
import CreateTournament from 'components/Authenticated/TournamentService/CreateTournament';
import { tournamentDetailsRoutes } from 'components/Authenticated/TournamentService/TournamentDetails';
import TournamentLayout from 'components/Authenticated/TournamentService/TournamentLayout';
import CenterLoading from 'components/Common/CenterLoading';
import AuthenticatedLayout from 'components/Common/Layout/AuthenticatedLayout';
import UnauthenticatedLayout from 'components/Common/Layout/UnauthenticatedLayout';
import Home from 'components/Home';
import AboutUs from 'components/Unauthenticated/AboutUs';
import ForgotPassword from 'components/Unauthenticated/ForgotPassword';
import Login from 'components/Unauthenticated/Login';
import News from 'components/Unauthenticated/News';
import NewsDetail from 'components/Unauthenticated/News/NewsDetail';
import Pricing from 'components/Unauthenticated/Pricing';
import ResetPassword from 'components/Unauthenticated/ResetPassword';
import Signup from 'components/Unauthenticated/Signup';
import { useGetAppConfigQuery } from 'store/api/commonApiSlice';
import { useLazyGetProfileQuery } from 'store/api/userApiSlice';
import { selectIsLoggedIn } from 'store/slice/userSlice';

import './App.css';

const sharedRoutes = [
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
  {
    path: 'about',
    element: <AboutUs />,
  },
];

const protectedRoutes = createBrowserRouter([
  {
    path: '/',
    element: <AuthenticatedLayout />,
    children: [
      ...sharedRoutes,
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'login',
        element: <AddMemberToGroup />,
      },
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
            path: 'change-password',
            element: <Profile activeTab="change-password" />,
          },
          {
            path: 'referee',
            element: <Profile activeTab="referee" />,
          },
          {
            path: 'edit',
            element: <EditProfile />,
          },
        ],
      },
      {
        path: 'payment/status',
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
        path: 'create',
        element: <GroupCreate />,
      },
      groupDetailsRoutes,
      {
        path: ':groupId/tournaments',
        children: [
          groupTournamentDetailsRoutes,
          {
            index: true,
            element: <GroupTournaments />,
          },
          {
            path: 'create',
            element: <CreateGroupTournament />,
          },
        ],
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
      tournamentDetailsRoutes,
    ],
  },
  {
    path: 'affiliates',
    element: <AdvertisementLayout />,
    children: [
      {
        index: true,
        element: <AdvertisementList />,
      },
      {
        path: 'create',
        element: <CreateAdvertisement />,
      },
      {
        path: 'my-ads',
        children: [
          {
            index: true,
            element: <MyAdvertisement />,
          },
          {
            path: ':id',
            element: <MyAdvertisementDetails />,
          },
          {
            path: ':id/edit',
            element: <EditAdvertisement />,
          },
        ],
      },
      {
        path: 'advertisements/:id',
        element: <AdvertisementDetails />,
      },
    ],
  },
  // {
  //   path: '*',
  //   element: <Navigate to={`/`} />,
  // },
]);

const publicRoutes = createBrowserRouter([
  {
    path: '/',
    element: <UnauthenticatedLayout />,
    children: [
      ...sharedRoutes,
      {
        index: true,
        element: <AboutUs />,
      },
      {
        path: 'signup',
        element: <Signup />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'forgot-password',
        element: <ForgotPassword />,
      },
      {
        path: 'reset-password',
        element: <ResetPassword />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to={`/`} />,
  },
]);

function App() {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
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
