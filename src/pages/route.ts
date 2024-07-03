export const PATHS = {
  main: "/main",
  logIn: "/",
  signUp: "/signup",
  findPassword: "/find/pw",
  profiles: {
    detail: "/profiles/:userId",
    create: "/profiles/create",
    update: "/profiles/update/:userId",
  },
  posts: {
    detail: "/posts/:postId",
    create: "/posts/create",
    update: "/posts/update/:postId",
  },
  search: "/search",
  likes: "/likes/:userId",
  bookmarks: "/bookmarks/:userId",
  notFound: "*",
};
