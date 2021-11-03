import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useStoreState } from "easy-peasy";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const user = useStoreState((state) => state.user);

  return (
    !user.loading && (
      <Route
        {...rest}
        render={(props) =>
          user.isAuthenticated ? (
            <Component {...props} />
          ) : (
            <Redirect to='/auth' />
          )
        }
      />
    )
  );
};

export default PrivateRoute;
