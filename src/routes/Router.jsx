import { createBrowserRouter } from "react-router";

import Home from "../pages/Home";
import Edit from "../pages/Edit";
import Create from "../pages/Create";
import PostDetail from "../pages/PostDetail";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Mainlayout from "../layouts/mainlayout";
import PostByAuthor from "../pages/PostByAuthor";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Mainlayout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "edit/:id",
        element: <Edit />,
      },
      {
        path: "create",
        element: <Create />,
      },
      {
        path: "post/:id",
        element: <PostDetail />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "author/:id",
        element: <PostByAuthor />,
      },
    ],
  },
]);

export default router;
