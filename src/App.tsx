import { useEffect } from "react";
import "./App.css";
import { v4 as uuidv4 } from "uuid";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Call from "./pages/Call";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/:id",
    element: <Call />,
  },
]);

function App() {
  useEffect(() => {
    const activeUserId = uuidv4();
    localStorage.setItem("currentActiveUserId", activeUserId);
  }, []);
  return <RouterProvider router={router} />;
}

export default App;
