import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
} from "react-router-dom";

import Navbar1 from "./components/Navbar1"
import Navbar2 from "./components/Navbar2"

import Welcome from "./pages/Welcome"
import Help from "./pages/Help"
import Register from "./pages/Register"
import Login from "./pages/Login"
import Pwfind from "./pages/Pwfind"
import Home from "./pages/Home"
import Friends from "./pages/Friends"
import Mypage from "./pages/Mypage"
import Test from "./pages/Test"
import Result from "./pages/Result"

import "./App.css"

// 1. 로그인, 회원가입 전 Navbar1 적용
const Layout1 = () => {
  return (
    <>
      <Navbar1 />
      <Outlet />
    </>
  );
};

// 2. 로그인, 회원가입 후 Navbar2 적용
const Layout2 = () => {
  return (
    <>
      <Navbar2 />
      <Outlet />
    </>
  );
};

const router = createBrowserRouter([
  {
    // 1. 로그인, 회원가입 전 Navbar1 적용
    path: "/",
    element: <Layout1/>,
    children:[
      {
        path: "/",
        element: <Welcome/>
      },
      {
        path: "/login",
        element: <Login/>
      },
      {
        path: "/register",
        element: <Register/>
      },
      {
        path: "/pwfind",
        element: <Pwfind/>
      },
    ]
  },

  {
    path: "/help",
    element: <Help/>
  },
  
  // 2. 로그인, 회원가입 후 Navbar2 적용
  {
    path: "/home",
    element: <Layout2/>,
    children: [
      {
        path: "/home",
        element: <Home/>
      },
      {
        path: "/home/friends",
        element: <Friends/>,
      },
      {
        path: "/home/mypage",
        element: <Mypage/>,
      },
      {
        path: "/home/test",
        element: <Test/>,
      },
      {
        path: "/home/result",
        element: <Result/>,
      },
    ]
  },
]);

function App() {
  return <div className="App">
    <div className="container">
      <RouterProvider router={router} />
    </div>
  </div>;
}

export default App;
