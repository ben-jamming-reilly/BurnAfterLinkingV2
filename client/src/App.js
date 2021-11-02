import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Auth from "./pages/Auth";
import File from "./pages/File";
import Home from "./pages/Home";
import Index from "./pages/Index";

import "./App.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/' exact component={Index} />
        <Route path='/auth' exact component={Auth} />
        <Route path='/file' exact component={File} />
        <Route path='/home' exact component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
