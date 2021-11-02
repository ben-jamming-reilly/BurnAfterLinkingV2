import { createStore } from "easy-peasy";

import links from "./links";
import user from "./user";

const store = createStore({
  links: links,
  user: user,
});

export default store;
