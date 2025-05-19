import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ListArticlePage from "./pages/ListArticlePage";
import DetailArticlePage from "./pages/DetailArticlePage";
import NotFound from "./pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ListArticlePage />,
  },
  {
    path: "/article/:username/:slug",
    element: <DetailArticlePage />,
  },
  {
    path: "/article/:username/:slug",
    element: <DetailArticlePage />,
  },
  {
    path: "/*",
    element: <NotFound />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
