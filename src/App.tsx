import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import { AppContextProvider } from "./context/AppContext";
import Landing from "./components/Landing";
import Navbar from "./components/Navbar";
import {useState} from 'react';

const App = () => {

const [showNewModal, setShowNewModal] = useState(false)

const toggleNewModal = () => {
  setShowNewModal(!showNewModal)
}


return (
  <>
    <AppContextProvider>
        <Navbar toggleNewModal={toggleNewModal} showNewModal={showNewModal} />
        <Landing toggleNewModal={toggleNewModal} showNewModal={showNewModal}/>
    </AppContextProvider>
  </>
)
}
;

export default App;