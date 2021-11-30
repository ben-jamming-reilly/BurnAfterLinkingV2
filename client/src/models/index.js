import { createStore, persist } from "easy-peasy";

import links from "./links";
import user from "./user";

const store = createStore({
  links: links,
  user: persist(user),
});

export default store;
