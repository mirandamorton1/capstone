import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import { AppContextProvider } from "./context/AppContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./components/Landing";
import Navbar from "./components/Navbar";

const App = () =>
  <>
    <AppContextProvider>
     
        <Navbar />
        <Landing />
   

    </AppContextProvider>
  </>
;
export default App;