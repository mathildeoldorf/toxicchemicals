import React from "react";
import logo from "./logo.svg";
import "./App.css";
import StartPage from "./components/StartPage";
import Header from "./components/pageComponents/Header";
import Aside from "./components/pageComponents/Aside";

function App() {
  return (
    <div className="App">
      <Header />
      <Aside />
      {/* <StartPage /> */}
    </div>
  );
}

export default App;
