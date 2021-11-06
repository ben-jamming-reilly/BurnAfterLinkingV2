import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Auth from "./pages/Auth";
import File from "./pages/File";
import Home from "./pages/Home";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

import PrivateRoute from "./components/PrivateRoute";

function App() {
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
