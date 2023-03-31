import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import MyNavBar from "./components/Navbar";
import ListCities from "./components/ListCities";

function App() {
  return (
    <div className="App">
      <MyNavBar />
      <ListCities />
    </div>
  );
}

export default App;
