import { action, thunk } from "easy-peasy";

const d = new Date();

const links = {
  link: null,
  links: [
    {
      id: "4ecb9c5e-ce49-4862-8901-f3b27da2be1a",
      desc: "This is a picture of a super funny dog",
      createDate: d,
      passHash: `${(Math.random() + 1).toString(16).substring(7)}`,
    },
    {
      id: "4ecb9c5e-ce49-4862-8901-f3b27da2be1a",
      desc: "This is a picture of a super funny dog",
      createDate: d,
      passHash: `${(Math.random() + 1).toString(16).substring(7)}`,
    },
    {
      id: "4ecb9c5e-ce49-4862-8901-f3b27da2be1a",
      desc: "This is a picture of a super funny dog",
      createDate: d,
      passHash: `${(Math.random() + 1).toString(16).substring(7)}`,
    },
    {
      id: "4ecb9c5e-ce49-4862-8901-f3b27da2be1a",
      desc: "This is a picture of a super funny dog",
      createDate: d,
      passHash: `${(Math.random() + 1).toString(16).substring(7)}`,
    },
    {
      id: "4ecb9c5e-ce49-4862-8901-f3b27da2be1a",
      desc: "This is a picture of a super funny dog",
      createDate: d,
      passHash: `${(Math.random() + 1).toString(16).substring(7)}`,
    },
    {
      id: "4ecb9c5e-ce49-4862-8901-f3b27da2be1a",
      desc: "This is a picture of a super funny dog",
      createDate: d,
      passHash: `${(Math.random() + 1).toString(16).substring(7)}`,
    },
    {
      id: "4ecb9c5e-ce49-4862-8901-f3b27da2be1a",
      desc: "This is a picture of a super funny dog",
      createDate: d,
      passHash: `${(Math.random() + 1).toString(16).substring(7)}`,
    },
    {
      id: "4ecb9c5e-ce49-4862-8901-f3b27da2be1a",
      desc: "This is a picture of a super funny dog",
      createDate: d,
      passHash: `${(Math.random() + 1).toString(16).substring(7)}`,
    },
    {
      id: "4ecb9c5e-ce49-4862-8901-f3b27da2be1a",
      desc: "This is a picture of a super funny dog",
      createDate: d,
      passHash: `${(Math.random() + 1).toString(16).substring(7)}`,
    },
  ],
  loading: false,
  addLink: action((state, payload) => {
    try {
    } catch (err) {}
  }),
  removeLink: action((state, payload) => {
    try {
    } catch (err) {}
  }),
  editLink: action((state, payload) => {
    try {
    } catch (err) {}
  }),
};

export default links;
