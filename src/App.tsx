import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

import {useState} from 'react';

import Landing from './components/Landing';
import Navbar from './components/Navbar';
import { AppContextProvider } from './context/AppContext';

const App = () => {

const [showNewModal, setShowNewModal] = useState(false)

const toggleNewModal = () => setShowNewModal(!showNewModal)


return (
  <AppContextProvider>
        <Navbar showNewModal={showNewModal} toggleNewModal={toggleNewModal} />
        <Landing showNewModal={showNewModal} toggleNewModal={toggleNewModal}/>
    </AppContextProvider>
)
}
;

export default App;