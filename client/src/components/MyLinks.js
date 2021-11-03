import { useStoreState } from "easy-peasy";

import Card from "react-bootstrap/Card";

const Link = ({ id, desc, createDate, passHash }) => {
  return <div></div>;
};

const MyLinks = () => {
  const links = useStoreState((state) => state.links);
  return <div></div>;
};

export default MyLinks;
