export enum Route {
  Root = "root",
  Home = "home",
  Earn = "earn",
  Friends = "friends",
}

export const routes = {
  [Route.Root]: "/",

  [Route.Home]: "/home",

  [Route.Earn]: "/earn",

  [Route.Friends]: "/friends",
} as const;
