import { action, thunk } from "easy-peasy";

const links = {
  link: null,
  links: [
    {
      id: "4ecb9c5e-ce49-4862-8901-f3b27da2be1a",
      desc: "This is a picture of a super funny dog",
      createDate: Date.now(),
      passHash: `${(Math.random() + 1).toString(16).substring(7)}`,
    },
    {
      id: "4ecb9c5e-ce49-4862-8901-f3b27da2be1a",
      desc: "This is a picture of a super funny dog",
      createDate: Date.now(),
      passHash: `${(Math.random() + 1).toString(16).substring(7)}`,
    },
    {
      id: "4ecb9c5e-ce49-4862-8901-f3b27da2be1a",
      desc: "This is a picture of a super funny dog",
      createDate: Date.now(),
      passHash: `${(Math.random() + 1).toString(16).substring(7)}`,
    },
  ],
  loading: false,
};

export default links;
