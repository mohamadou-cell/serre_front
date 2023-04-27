import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import Navbarre from "./navbarre";
import "./styles/parametre.css";
import { useNavigate } from "react-router-dom";
import Param from "./param";

function Personnaliser() {
  const [nombre_arrosage, setChoix] = useState<string>("");
  const [un, setUn] = useState<boolean>(false);
  const [deux, setDeux] = useState<boolean>(false);
  const [trois, setTrois] = useState<boolean>(false);
  const [heure_arrosage1, setHeure1] = useState("");
  const [heure_arrosage2, setHeure2] = useState("");
  const [heure_arrosage3, setHeure3] = useState("");
  const [minute_arrosage1, setMinute1] = useState("");
  const [minute_arrosage2, setMinute2] = useState("");
  const [minute_arrosage3, setMinute3] = useState("");
  const [duree, setDuree] = useState("");
  /*   const [vide, setVide] = useState<boolean>(true); */
  /* 
  const params = () => {
    if (heure_arrosage1 == "" || duree == "") {
      console.log("required");
    } else {
      localStorage.removeItem("_DELAI");
      localStorage.removeItem("_TIME1");
      localStorage.removeItem("_TIME2");
      localStorage.removeItem("_TIME3");
      localStorage.removeItem("CHOIX");
      localStorage.setItem("CHOIX", "personnaliser");
      localStorage.setItem("_DELAI", duree);
      localStorage.setItem("_TIME1", heure_arrosage1);
      localStorage.setItem("_TIME2", heure_arrosage2);
      localStorage.setItem("_TIME3", heure_arrosage3);
      //usenavigate("/Dashboard");
    }
  }; */

  const handleSubmit = (e: any) => {
    if (parseInt(minute_arrosage1) < 1) {
      setMinute1("0");
      console.log(`i${minute_arrosage1}i`);
    }
    if (parseInt(minute_arrosage2) < 1) {
      setMinute2("0");
    }
    if (parseInt(minute_arrosage3) < 1) {
      setMinute3("0");
    }
    e.preventDefault();

    console.log(
      nombre_arrosage,
      heure_arrosage1,
      heure_arrosage2,
      heure_arrosage3,
      duree
    );
    fetch("http://localhost:3000/parametre/64307b36637f4fdee4912ce7", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        nombre_arrosage: nombre_arrosage,
        duree: duree,
        heure_arrosage1: heure_arrosage1,
        minute_arrosage1: minute_arrosage1,
        heure_arrosage2: heure_arrosage2,
        minute_arrosage2: minute_arrosage2,
        heure_arrosage3: heure_arrosage3,
        minute_arrosage3: minute_arrosage3,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        //usenavigate("/Dashboard");
      });
  };

  const f_setHeure1 = (e: any) => {
    if (e == "01") {
      setHeure1("1");
    }
    if  (e == "02") {
      setHeure1("2");
    }
    if (e == "03") {
      setHeure1("3");
    }
    if (e == "04") {
      setHeure1("4");
    }
    if (e == "05") {
      setHeure1("5");
    }
    if (e == "06") {
      setHeure1("6");
    }
    if (e == "07") {
      setHeure1("7");
    }
    if (e == "08") {
      setHeure1("8");
    }
    if (e == "09") {
      setHeure1("9");
    }
    else{
      setHeure1(e)
    }
  }

  const f_setHeure2 = (e: any) => {
    if (e == "01") {
      setHeure2("1");
    }
    if (e == "02") {
      setHeure2("2");
    }
    if (e == "03") {
      setHeure2("3");
    }
    if (e == "04") {
      setHeure2("4");
    }
    if (e == "05") {
      setHeure2("5");
    }
    if (e == "06") {
      setHeure2("6");
    }
    if (e == "07") {
      setHeure2("7");
    }
    if (e == "08") {
      setHeure2("8");
    }
    if (e == "09") {
      setHeure2("9");
    }
    else{
      setHeure2(e)
    }
  }

  function f_setHeure3(e: any) {
    if (e == "01") {
      setHeure3("1");
    }
    if (e == "02") {
      setHeure3("2");
    }
    if (e == "03") {
      setHeure3("3");
    }
    if (e == "04") {
      setHeure3("4");
    }
    if (e == "05") {
      setHeure3("5");
    }
    if (e == "06") {
      setHeure3("6");
    }
    if (e == "07") {
      setHeure3("7");
    }
    if (e == "08") {
      setHeure3("8");
    }
    if (e == "09") {
      setHeure3("9");
    }
    else{
      setHeure3(e)
    }
  }
  const f_setMinute1 = (e: any) => {
    if (parseInt(e) < 1) {
      setMinute1("0");
    }
    if (parseInt(e) >= 1) {
      setMinute1(e);
    }
  };
  const f_setMinute2 = (e: any) => {
    
    if (parseInt(e) < 1) {
      setMinute2("0");
    }
    if (parseInt(e) >= 1) {
      setMinute2(e);
    }
  };
  const f_setMinute3 = (e: any) => {
    if (parseInt(e) < 1) {
      setMinute3("0");
    }
    if (parseInt(e) >= 1) {
      setMinute3(e);
    }
  }
  const choice = (nombre_arrosage: string) => {
    setChoix(nombre_arrosage);
    //console.log(nombre_arrosage);
    if (nombre_arrosage == "1") {
      setUn(true);
      setDeux(false);
      setTrois(false);
    } else if (nombre_arrosage == "2") {
      setUn(true);
      setDeux(true);
      setTrois(false);
    } else if (nombre_arrosage == "3") {
      setUn(true);
      setDeux(true);
      setTrois(true);
    } else {
      setUn(false);
      setDeux(false);
      setTrois(false);
    }
  };
  const usenavigate = useNavigate();
  if (localStorage.getItem("token") == undefined) {
    return (<div>Not found</div>)
  } else {
    return (
      <div>
        <div>
          <Param></Param>
          <Navbarre></Navbarre>
        </div>
        <div id="body">
          <Card body id="card" className="w-25">
            <h4 className="titre">PARAMETRES D'ARROSAGE</h4>
            {/*   <p  className={`text-danger ${vide ? "cacher":""}`} >les champs sont requis</p> */}
            <Form className="mt-5" onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Nombre d'arrosage</Form.Label>
                <Form.Select onChange={(e) => choice(e.target.value)}>
                  <option></option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                </Form.Select>
              </Form.Group>

              <Form.Group
                className={`mb-3 ${!un ? "activer" : ""}`}
                controlId="formBasicNumber"
              >
                <Form.Label>Heures d'arrosage</Form.Label>
                <div className="heure">
                  <input
                    min="0"
                    max="23"
                    type="number"
                    placeholder="heure"
                    className={`space ${!un ? "activer" : ""}`}
                    onChange={(e) => f_setHeure1(e.target.value)}
                  />
                  <input
                    min="0"
                    max="59"
                    type="number"
                    placeholder="minute"
                    className={`space ${!un ? "activer" : ""}`}
                    onChange={(e) => f_setMinute1(e.target.value)}
                  /> 
                  </div>
                  <div className="heure">
                  <input
                    min="0"
                    max="23"
                    type="number"
                    placeholder="heure"
                    className={`space ${!deux ? "activer" : ""}`}
                    onChange={(e) => f_setHeure2(e.target.value)}
                  />
                  <input
                    min="0"
                    max="59"
                    type="number"
                    placeholder="minute"
                    className={`space ${!deux ? "activer" : ""}`}
                    onChange={(e) => f_setMinute2(e.target.value)}
                  />
                  </div>
                  <div className="heure">
                  <input
                    min="0"
                    max="23"
                    type="number"
                    placeholder="heure"
                    className={`space ${!trois ? "activer" : ""}`}
                    onChange={(e) => f_setHeure3(e.target.value)}
                  />
                  <input
                    min="0"
                    max="59"
                    type="number"
                    placeholder="minute"
                    className={`space ${!trois ? "activer" : ""}`}
                    onChange={(e) => f_setMinute3(e.target.value)}
                  />
                  {/* <select

                    className={`space ${!un ? "activer" : ""}`}
                    onChange={(e) => setHeure1(e.target.value)}
                  >
                    <option></option>
                    <option>05</option>
                    <option>26</option>
                    <option>55</option>
                  </select>
                  <select
                    className={`space ${!deux ? "activer" : ""}`}
                    onChange={(e) => setHeure2(e.target.value)}
                  >
                    <option></option>
                    <option>30</option>
                    <option>28</option>
                    <option>17</option>
                  </select>
                  <select
                    className={`space ${!trois ? "activer" : ""}`}
                    onChange={(e) => setHeure3(e.target.value)}
                  >
                    <option></option>
                    <option>31</option>
                    <option>25</option>
                    <option>30</option>
                  </select> */}
                </div>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicNumber">
                <Form.Label>Durée de l'arrosage ( en minute )</Form.Label>
                <Form.Control
                  min="1"
                  max="9"
                  type="number"
                  placeholder="minute"
                  onChange={(e) => setDuree(e.target.value)}
                />
              </Form.Group>

              <Button
                variant="primary"
                type="submit" /* onClick={() => {
                  params();
                }} */
                className="mt-3"
                id="btn"
              >
                Appliquer
              </Button>
              <a href={`/parametre`} className="lien">
                Paramètres
              </a>
            </Form>
          </Card>
        </div>
      </div>
    );
  }
}

export default Personnaliser;
