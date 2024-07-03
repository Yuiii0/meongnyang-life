import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Suspense, lazy } from "react";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Fallback from "./components/ui/Fallback";
import Navbar from "./components/ui/Navbar";
import LogInPage from "./pages/LogIn";
import { PATHS } from "./pages/route";

const BookmarkPage = lazy(() => import("./pages/Bookmark"));
const FindPasswordPage = lazy(() => import("./pages/FindPassword"));
const LikePage = lazy(() => import("./pages/Like"));
const MainPage = lazy(() => import("./pages/Main"));
const NotFoundPage = lazy(() => import("./pages/NotFound"));
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
      <>
        <Navbar />
        <Suspense fallback={<Fallback />}>
          <Outlet />
        </Suspense>
      </>
    ),
    errorElement: (
      <Suspense fallback={<Fallback />}>
        <NotFoundPage />
      </Suspense>
    ),
    children: [
      {
        path: PATHS.main,
        element: (
          <Suspense fallback={<Fallback />}>
            <MainPage />
          </Suspense>
        ),
      },
      {
        path: PATHS.profiles.detail,
        element: (
          <Suspense fallback={<Fallback />}>
            <UserPage />
          </Suspense>
        ),
      },
      {
        path: PATHS.profiles.create,
        element: (
          <Suspense fallback={<Fallback />}>
            <UserProfileCreatePage />
          </Suspense>
        ),
      },
      {
        path: PATHS.profiles.update,
        element: (
          <Suspense fallback={<Fallback />}>
            <UserProfileUpdatePage />
          </Suspense>
        ),
      },
      {
        path: PATHS.search,
        element: (
          <Suspense fallback={<Fallback />}>
            <SearchPage />
          </Suspense>
        ),
      },
      {
        path: PATHS.posts.detail,
        element: (
          <Suspense fallback={<Fallback />}>
            <PostDetailPage />
          </Suspense>
        ),
      },
      {
        path: PATHS.posts.create,
        element: (
          <Suspense fallback={<Fallback />}>
            <PostCreatePage />
          </Suspense>
        ),
      },
      {
        path: PATHS.posts.update,
        element: (
          <Suspense fallback={<Fallback />}>
            <PostUpdatePage />
          </Suspense>
        ),
      },
      {
        path: PATHS.likes,
        element: (
          <Suspense fallback={<Fallback />}>
            <LikePage />
          </Suspense>
        ),
      },
      {
        path: PATHS.bookmarks,
        element: (
          <Suspense fallback={<Fallback />}>
            <BookmarkPage />
          </Suspense>
        ),
      },
    ],
  },
  { index: true, path: PATHS.logIn, element: <LogInPage /> },
  {
    path: PATHS.signUp,
    element: (
      <Suspense fallback={<Fallback />}>
        <SignUpPage />
      </Suspense>
    ),
  },
  {
    path: PATHS.findPassword,
    element: (
      <Suspense fallback={<Fallback />}>
        <FindPasswordPage />
      </Suspense>
    ),
  },
]);

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
