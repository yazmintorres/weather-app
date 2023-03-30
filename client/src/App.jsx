import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import MyNavBar from "./components/Navbar";
import ListContacts from "./components/ListContacts";

function App() {
  return (
    <div className="App">
      <MyNavBar />
      <ListContacts />
    </div>
  );
}

export default App;
