import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import {
  BookmarkPage,
  LikePage,
  LogInPage,
  MainPage,
  PostCreatePage,
  PostDetailPage,
  PostUpdatePage,
  SearchPage,
  SignUpPage,
  UserPage,
} from "./pages";
import NotFoundPage from "./pages/NotFound/NotFoundPage";
import "./styles/index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, path: "/", element: <LogInPage /> },
      { path: "/main", element: <MainPage /> },
      { path: "/signup", element: <SignUpPage /> },
      { path: "/profiles/:userId", element: <UserPage /> },
      { path: "/search", element: <SearchPage /> },
      { path: "/posts/:postId", element: <PostDetailPage /> },
      { path: "/posts/create", element: <PostCreatePage /> },
      { path: "/posts/update/:postId", element: <PostUpdatePage /> },
      { path: "/likes/:userId", element: <LikePage /> },
      { path: "/bookmarks/:userId", element: <BookmarkPage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <RouterProvider router={router} />
  </>
);
