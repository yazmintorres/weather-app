import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import MyNavBar from "./components/Navbar";
import ListCities from "./components/ListCities";
import WeatherCard from "./components/WeatherCard";
import { useState } from "react";

function App() {
  return (
    <div className="App">
      <MyNavBar />
      <ListCities />
    </div>
  );
}

export default App;
