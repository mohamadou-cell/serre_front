import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import Connexion from "./composants/connexion";
import Dashboard from "./composants/dashboard";
/* import Historique from "./composants/historique"; */
import Navbarre from "./composants/navbarre";
import Parametre from "./composants/parametre";


function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App"> 
    
    <Connexion></Connexion>   
    </div>
  );
}

export default App;
