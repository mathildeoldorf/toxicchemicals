import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Home from "./components/pageComponents/Home";
import Header from "./components/Header";
import Chemicals from "./components/pageComponents/Chemicals";
import Warehouses from "./components/pageComponents/Warehouses";
import ProcessTicket from "./components/pageComponents/ProcessTicket";
import Sites from "./components/pageComponents/Sites";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink,
  Redirect,
} from "react-router-dom";

function App() {
  return (
    <div className="App paddingBottomLarge">
      <Router>
        <nav>
          <div className="logo alignItemsCenter grid">Toxic Chemicals Industries</div>
          <ul>
            <li>
              <NavLink to="/" exact={true} activeClassName="active">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/chemicals" activeClassName="active">
                Chemicals
              </NavLink>
            </li>
            <li>
              <NavLink to="/warehouses" activeClassName="active">
                Warehouses
              </NavLink>
            </li>
            <li>
              <NavLink to="/sites" activeClassName="active">
                Sites
              </NavLink>
            </li>
            <li>
              <NavLink to="/process" activeClassName="active">
                Process ticket
              </NavLink>
            </li>
          </ul>
        </nav>
        <Header />
        <Switch>
          <Route
            exact
            path={`${process.env.PUBLIC_URL}/chemicals`}
            component={(props) => <Chemicals {...props} />}
          />
          <Route
            exact
            path={`${process.env.PUBLIC_URL}/warehouses`}
            component={(props) => <Warehouses {...props} />}
          />
          <Route
            exact
            path={`${process.env.PUBLIC_URL}/sites`}
            component={(props) => <Sites {...props} />}
          />
          <Route
            exact
            path={`${process.env.PUBLIC_URL}/process`}
            component={(props) => <ProcessTicket {...props} />}
          />
          <Route
            exact
            path={`${process.env.PUBLIC_URL}/`}
            component={(props) => <Home {...props} />}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
