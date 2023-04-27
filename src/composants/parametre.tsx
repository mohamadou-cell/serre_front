import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import Navbarre from "./navbarre";
import Param from "./param"
import Sauge from '../assets/sauge.png';
import Laitue from '../assets/laitue.png'
import './styles/parametre.css'
import { useNavigate } from 'react-router-dom';

function parametre() {
  const [choix, setChoix] = useState<string>('');
  const [nb_fois, setNbFois] = useState<any>(null);
  const [duree, setDuree] = useState<any>(null);
  const [laitue, setLaitue] = useState<boolean>(false);
  const [sauge, setSauge] = useState<boolean>(false);
  const [vide, setVide] = useState<boolean>(true);
  const [heure1, setHeure1] = useState<any>("")
  const [heure2, setHeure2] = useState<any>("")
  const [nbr, setNbr] = useState<any>("")



  const appliquer = ()=>{
/*     if (nb_fois == '' || duree == null) {
      console.log("champs requis")
      setVide(false);
    }//les temps en  minute for test )
    else{
      localStorage.removeItem("_DELAI");
      localStorage.removeItem("_TIME1");
      localStorage.removeItem("_TIME2");
      localStorage.removeItem("_TIME3");
      localStorage.removeItem("CHOIX");
      if (choix == "Sauge") {
        localStorage.setItem("CHOIX", "sauge");
        localStorage.setItem("_DELAI", "1");
        localStorage.setItem("_TIME1", "0");
        localStorage.setItem("_TIME2", "nan");
        localStorage.setItem("_TIME3", "nan");
      }
      if (choix == "Laitue") {
        localStorage.setItem("CHOIX", "laitue");
        localStorage.setItem("_DELAI", "1");
        localStorage.setItem("_TIME1", "0");
        localStorage.setItem("_TIME2", "30");
        localStorage.setItem("_TIME3", "nan");
      }
      usenavigate("/Dashboard");
    } */
    if (choix == "Sauge") {
      fetch("http://localhost:3000/parametre/64307b36637f4fdee4912ce7", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          nombre_arrosage : "1",
          duree : "1", 
          heure_arrosage1 : "7",
          minute_arrosage1 : "0",
          heure_arrosage2 : "",
          minute_arrosage2 : "", 
          heure_arrosage3 : "",
          minute_arrosage3 : "" 
          
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          //console.log(data);
          //console.log(heure1);
         // usenavigate("/Dashboard");
        });
    }
    if (choix == "Laitue") {
      fetch("http://localhost:3000/parametre/64307b36637f4fdee4912ce7", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          nombre_arrosage : "2",
          duree : "1", 
          heure_arrosage1 : "7",
          minute_arrosage1 : "0",
          heure_arrosage2 : "17",
          minute_arrosage2 : "0", 
          heure_arrosage3 : "",
          minute_arrosage3 : "" 
          
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          //console.log(data);
          //console.log(heure1);
          //usenavigate("/Dashboard");
        });
    }
   

  }

  const choice = (choix:string) => {
    setChoix(choix)
    
    if(choix == 'Laitue'){
      setNbFois(2)
      setDuree(1)
      setLaitue(true)
      setSauge(false)
    }
    else if(choix == 'Sauge'){
      setNbFois(1)
      setDuree(1)
      setLaitue(false)
      setSauge(true)
    }
    else{
      setNbFois('')
      setDuree('')
      setLaitue(false)
      setSauge(false)
    }
  }
  const usenavigate = useNavigate();
  if (localStorage.getItem("token") == undefined) {
    return (<div>Not found</div>)
  }
  else{
  return (
    <div>
      <div>
        <Param></Param>
        <Navbarre></Navbarre>
      </div>
    <div id='body'>
    <Card body id='card' className='w-25'>
      <h4 className='titre'>PARAMETRES D'ARROSAGE</h4>

      <Form className="mt-5">
      <p  className={`text-danger ${vide ? "cacher":""}`} >les champs sont requis</p>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Type de plantes</Form.Label>
        <Form.Select onChange={(e) => choice(e.target.value)}>
            <option></option>
            <option>Laitue</option>
            <option>Sauge</option>
          </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicNumber">
        <Form.Label>Nombre d'arrosage</Form.Label>
        <Form.Control value={nb_fois} type="text" placeholder="par jour" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicNumber">
        <Form.Label>Durée de l'arrosage (en minute) </Form.Label>
        <Form.Control value={duree} type="text" placeholder="par minute" />
      </Form.Group>
      
      <Button variant="primary" onClick={()=>{appliquer()}}   className="mt-3" id='btn'>
        Appliquer
      </Button>
      <a href={`/personnaliser`} className='lien'>Personnaliser</a>
    </Form>
    </Card>
    <div className={`${!sauge ? "activer":"align"}`}>
      <img className='w-25' src={Sauge} alt="" />
      <p>à 7h 00 </p>
    </div>
    <div className={`${!laitue ? "activer":"align"}`}>
      <img className='w-25' src={Laitue} alt="" />
      <p>à 7h 00 et à 17h 00 </p>
    </div>
    </div>

    </div>
  )}
}

export default parametre
