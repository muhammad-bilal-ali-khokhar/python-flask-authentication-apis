import './App.css';
import { SignUp } from './components/SignUp'
import { SignIn } from './components/SignIn'
import { createBrowserRouter, RouterProvider, Outlet, useLocation } from "react-router-dom";
import { Profile } from './components/Profile';
import { Home } from './components/Home';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
const Layout = () => {
  const location = useLocation();
  const isSignUpOrSignInPage = location.pathname === '/' || location.pathname === '/login';
  return (
    <>
      {/* {!isSignUpOrSignInPage && <Header />} */}
      <Outlet />
      {/* {!isSignUpOrSignInPage && <Footer />} */}
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
          path: "home/:id",
          element: <Home />,
        },
        {
          path: "profile/:id",
          element: <Profile />,
        },
        {
          path: "Form",
          element: <></>,
        },
        {
          path: "profiles",
          element: <></>,
        },
        {
          path: "Cart",
          element: "<Cart/>",
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
