import "./App.css";
import Home from "./pages/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Communities from "./pages/Communities";
import PostsByUser from "./pages/PostsByUser";
import EditPost from "./pages/EditPost";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
    },
    {
      path: "/communities",
      element: <Communities />,
    },
    {
      path: "/user",
      element: <PostsByUser />,
    },
    {
      path: "/edit",
      element: <EditPost />,
    }
  ]);

  return <RouterProvider router={router} />;
}

export default App;
