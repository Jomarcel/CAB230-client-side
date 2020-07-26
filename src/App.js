import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import LoginScreen from "../src/Auth/LoginScreen";
import RegisterScreen from "../src/Auth/RegisterScreen";
import ListingScreen from "./components/ListingScreen";
import NonAuthPage from "../src/Routes/NonAuthPage";
import NotFound from "../src/components/NotFound";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/" render={() => <Home />} />

        <Route path="/login" component={() => <LoginScreen />} />

        <Route
          path="/listing"
          component={(props) => <ListingScreen {...props} />}
        />

        <Route
          path="/members"
          component={(props) => <NonAuthPage {...props} />}
        />

        <Route path="/signup" render={() => <RegisterScreen />} />
        <Route path="*" component={NotFound} status={404} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
