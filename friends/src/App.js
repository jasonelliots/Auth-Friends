import React from "react";
import "./App.css";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute"; 

//components

import Login from "./components/Login";
import FriendList from "./components/FriendList"

function App() {
  return (
    <div className="App">
      <Router>
        <div className="App">
          <Link to="/login">Login</Link>
          <Link to="/protected">Protected Page</Link>

      
            <PrivateRoute exact path="/protected" component={FriendList} />
            {/* <Route component={FriendList} />  */}
            <Route path="/login" component={Login} />
       
        </div>
      </Router>
    </div>
  );
}

export default App;
