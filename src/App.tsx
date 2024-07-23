import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Suspense, lazy } from "react";
import { Toaster } from "react-hot-toast";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Fallback from "./components/ui/Fallback";
import Header from "./components/ui/Header";
import LogInPage from "./pages/LogIn";
import MainPage from "./pages/Main";
import ProtectedRoute from "./pages/ProtectedRoute";
import { PATHS } from "./pages/route";
import { initializeAuth } from "./stores/auth/useAuthStore";

const BookmarkPage = lazy(() => import("./pages/Bookmark"));
const FindPasswordPage = lazy(() => import("./pages/FindPassword"));
const LikePage = lazy(() => import("./pages/Like"));
const ErrorPage = lazy(() => import("./pages/ErrorPage"));
const PostCreatePage = lazy(() => import("./pages/PostCreate"));
const PostDetailPage = lazy(() => import("./pages/PostDetail"));
const PostUpdatePage = lazy(() => import("./pages/PostUpdate"));
const SearchPage = lazy(() => import("./pages/Search"));
const SignUpPage = lazy(() => import("./pages/SignUp"));
const UserPage = lazy(() => import("./pages/UserProfile"));
const UserProfileCreatePage = lazy(() => import("./pages/UserProfileCreate"));
const UserProfileUpdatePage = lazy(() => import("./pages/UserProfileEdit"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Header />
        <Outlet />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      { path: PATHS.main, element: <MainPage /> },
      { path: PATHS.profiles.detail, element: <UserPage /> },
      { path: PATHS.profiles.create, element: <UserProfileCreatePage /> },
      { path: PATHS.profiles.update, element: <UserProfileUpdatePage /> },
      { path: PATHS.search, element: <SearchPage /> },
      { path: PATHS.posts.detail, element: <PostDetailPage /> },
      { path: PATHS.posts.create, element: <PostCreatePage /> },
      { path: PATHS.posts.update, element: <PostUpdatePage /> },
      { path: PATHS.likes, element: <LikePage /> },
      { path: PATHS.bookmarks, element: <BookmarkPage /> },
    ],
  },
  { index: true, path: PATHS.logIn, element: <LogInPage /> },
  { path: PATHS.signUp, element: <SignUpPage /> },
  { path: PATHS.findPassword, element: <FindPasswordPage /> },
]);

initializeAuth();

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<Fallback />}>
        <RouterProvider router={router} />
      </Suspense>
      <Toaster position="top-center" reverseOrder={false} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
