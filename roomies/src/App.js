import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import RoomiesLanding from './RoomiesLanding';
import RoomiesHome from './RoomiesHome';
import './App.css';

function App() {
  return (
    <div>
      <header style={{backgroundColor: '#F9F9F9', height: '1200px'}}>
        <Router>
          <div>
            <Switch>
              <Route path="/home">
                <RoomiesHome/>
              </Route>
              <Route path="/">
                <RoomiesLanding/>
              </Route>
            </Switch>
          </div>
        </Router>
      </header>
    </div>
  );
}

export default App;
