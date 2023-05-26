import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
} from "react-router-dom";

import Navbar from "./components/Navbar"
import Modal from "./components/Modal";

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

// Navbar
const Layout1 = () => {
  return (
    <>
      <Navbar />
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

  {
    path: "/help",
    element: <Help/>
  },
  
  // 모달창
  {
    path: "/modal",
    element: <Modal/>,
  }
]);

function App() {
  return <div className="App">
    <div className="container">
      <RouterProvider router={router} />
    </div>
  </div>;
}


// Register.jsx


export default App;
