import "./App.css";
import Header from "./components/Header/Header";
import PrTable from "./components/PrTable/PrTable";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div className="App">
      <div>
        <Header />
        <PrTable />
      </div>
      <Footer />
    </div>
  );
}

export default App;
