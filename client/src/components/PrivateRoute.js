import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useStoreState } from "easy-peasy";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { loading, isAuthenticated } = useStoreState((state) => state.user);

  return (
    !loading && (
      <Route
        {...rest}
        render={(props) =>
          isAuthenticated ? <Component {...props} /> : <Redirect to='/auth' />
        }
      />
    )
  );
};

export default PrivateRoute;
