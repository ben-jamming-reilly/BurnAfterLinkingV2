import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useEffect } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import setAuthToken from "./utils/setAuthToken";

import Auth from "./pages/Auth";
import File from "./pages/File";
import Home from "./pages/Home";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

import PrivateRoute from "./components/PrivateRoute";

function App() {
  const { getUser } = useStoreActions((actions) => actions.user);
  const { token, loading } = useStoreState((state) => state.user);

  if (token) {
    setAuthToken(token);
  }

  useEffect(() => getUser(), [token, getUser, loading]);

  return (
    <Router>
      <Switch>
        <Route path='/' exact component={Index} />
        <Route path='/auth' exact component={Auth} />
        <Route path='/f/' exact component={File} />
        <PrivateRoute path='/home' exact component={Home} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
