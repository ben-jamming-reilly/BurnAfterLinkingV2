import { createStore, persist } from "easy-peasy";

import links from "./links";
import user from "./user";
import files from "./files";

const store = createStore({
  links: links,
  user: persist(user),
  files: files,
});

export default store;
