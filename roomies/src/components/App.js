import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import RoomiesLanding from "./RoomiesLanding";
import RoomiesHome from "./RoomiesHome";
import ShoppingList from "./ShoppingList";
import Settings from "./Settings"
import Chores from "./Chores";
import "./App.css";

function App() {
  return (
    <div>
      <header style={{ backgroundColor: "#F9F9F9" }}>
        <Router>
          <div>
            <Switch>
              <Route path="/settings">
                <Settings />
              </Route>
              <Route path="/list">
                <ShoppingList />
              </Route>
              <Route path="/home">
                <RoomiesHome />
              </Route>
              <Route path="/chores">
                <Chores/>
              </Route>
              <Route path="/">
                <RoomiesLanding />
              </Route>
            </Switch>
          </div>
        </Router>
      </header>
    </div>
  );
}

export default App;
