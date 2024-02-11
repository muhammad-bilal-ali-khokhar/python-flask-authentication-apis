import './App.css';
import { SignUp } from './components/SignUp'
import { SignIn } from './components/SignIn'
import { createBrowserRouter, RouterProvider, Outlet, useLocation } from "react-router-dom";
import { Profile } from './components/Profile';
import { Home } from './components/Home';
import { FollowingTo } from './components/FollowingTo';
import { UsersProfile } from './components/UsersProfile';
import { WelcomContent } from './components/WelcomContent';
import { useGetClient } from './components/useGetClient';
import { Follower } from './components/Follower';
import { Following } from './components/Following';
const Layout = () => {
  const location = useLocation();
  const isSignUpOrSignInPage = location.pathname === '/' || location.pathname === '/login';
  const client = useGetClient();
  return (
    <>
      {client && !isSignUpOrSignInPage ?  (
        <Home>
          <Outlet />
        </Home>
      ) : (
        <Outlet />
      )}
    </>
  );
};

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <SignUp />,
        },
        {
          path: "login",
          element: <SignIn />,
        },
        {
          path: "home",
          element:<WelcomContent/>,
        },
        {
          path: "profile",
          element: <Profile />,
        },
        {
          path: "Suggestions",
          element: <FollowingTo/>,
        },
        {
          path: "user_profile/:id",
          element: <UsersProfile/>,
        },
        {
          path: "follower",
          element: <Follower/>,
        },
        {
          path: "following",
          element: <Following/>,
        },
        {
          path: "*",
          element: (
            <h1
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "#e07a5f",
                fontSize: "66px",
                textAlign: "center",
              }}
            >
              404<br></br>Page Not Found
            </h1>
          ),
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
