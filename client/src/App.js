import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Auth from "./pages/Auth";
import File from "./pages/File";
import Home from "./pages/Home";
import Index from "./pages/Index";

import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/' exact component={Index} />
        <Route path='/auth' exact component={Auth} />
        <Route path='/file/:id' exact component={File} />
        <PrivateRoute path='/home' exact component={Home} />
        {/* 404 not found should go here */}
      </Switch>
    </Router>
  );
}

export default App;
