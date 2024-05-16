import React from "react";
import "./App.css";
import "./responsive.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import Login from "./screens/Login";
import Register from "./screens/Register";
import ProfileScreen from "./screens/ProfileScreen";
import OrderScreen from "./screens/OrderScreen";
import PubScreen from "./screens/PubScreen";
import NotFound from "./screens/NotFound";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/" component={HomeScreen} exact />
        <Route path="/register" component={Register} />
        <Route path="/profile" component={ProfileScreen} />
        <Route path="/order" component={OrderScreen} />
        <Route path="/pub" component={PubScreen} />
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  );
};

export default App;
