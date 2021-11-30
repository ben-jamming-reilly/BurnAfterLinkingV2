import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import { useStoreActions } from "easy-peasy";

const Settings = () => {
  const { deleteUser } = useStoreActions((actions) => actions.user);

  return (
    <Card className='m-3' border='secondary'>
      <Card.Body>
        <Button variant='danger' onClick={() => deleteUser()}>
          DELETE ACCOUNT
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Settings;
