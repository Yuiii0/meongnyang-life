import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import App from "./App";
import {
  BookmarkPage,
  FindPasswordPage,
  LikePage,
  LogInPage,
  MainPage,
  PostCreatePage,
  PostDetailPage,
  PostUpdatePage,
  SearchPage,
  SignUpPage,
  UserPage,
  UserProfileCreatePage,
  UserProfileUpdatePage,
} from "./pages";
import NotFoundPage from "./pages/NotFound/NotFoundPage";

import ProtectedRoute from "./pages/ProtectedRoute/ProtectedRoute";
import { initializeAuth } from "./stores/auth/useAuthStore";
import "./styles/index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "/main",
        element: <MainPage />,
      },

      { path: "/profiles/:userId", element: <UserPage /> },
      { path: "/profiles/create", element: <UserProfileCreatePage /> },
      { path: "/profiles/update/:userId", element: <UserProfileUpdatePage /> },
      { path: "/search", element: <SearchPage /> },
      { path: "/posts/:postId", element: <PostDetailPage /> },
      { path: "/posts/create", element: <PostCreatePage /> },
      { path: "/posts/update/:postId", element: <PostUpdatePage /> },
      { path: "/likes/:userId", element: <LikePage /> },
      { path: "/bookmarks/:userId", element: <BookmarkPage /> },
    ],
  },
  { index: true, path: "/", element: <LogInPage /> },
  { path: "/signup", element: <SignUpPage /> },
  { path: "/find/pw", element: <FindPasswordPage /> },
]);

initializeAuth();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <RouterProvider router={router} />
  </>
);
