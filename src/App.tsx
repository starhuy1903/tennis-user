import { useEffect } from 'react';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { useAppSelector } from 'store';

import GroupDetail from 'components/Authenticated/GroupDetail';
import CenterLoading from 'components/Common/CenterLoading';
import PageLayout from 'components/Common/Layout/PageLayout';
import Home from 'components/Home';
import Login from 'components/Unauthenticated/Login';
import Signup from 'components/Unauthenticated/Signup';
import { useLazyGetProfileQuery } from 'store/api/userApiSlice';

const protectedRoutes = createBrowserRouter([
  {
    path: '/',
    element: <PageLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'groups/:groupId',
        element: <GroupDetail />,
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
      {
        index: true,
        element: <Home />,
      },
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
