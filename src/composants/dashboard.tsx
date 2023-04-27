import { Button, Form, FormCheck, Row, Col } from "react-bootstrap";
import "./styles/dashboard.css";
import temp from "../assets/high-temperature.png";
import sun from "../assets/sun.png";
import humid from "../assets/humidity.png";
import humidity from "../assets/humid_sol.png";
import toit from "../assets/toit.png";
import arrosage from "../assets/arrosage.gif";
import ventilateur from "../assets/ventilateur.gif";
import arro from "../assets/arro.png";
import vent from "../assets/vent.png";
import on_arrosage from "../assets/on-button.png";
import off_arrosage from "../assets/off-button.png";
import { useEffect, useState } from "react";
import Navbarre from "./navbarre";
import socketIOClient from "socket.io-client";
import { useNavigate } from "react-router-dom";
const connection = "http://localhost:3000/";
const Dashboard = () => {
  const [donnees, setDonnee] = useState<any>(null);
  const [data, setData] = useState<any>(null);
  const [cacher, setCacher] = useState<any>(null);
  const [cacher_, setCacher_] = useState<any>(null);
  const [_45, set_45] = useState<any>(false);
  const [_90, set_90] = useState<any>(false);
  const [_180, set_180] = useState<any>(false);
  const [seconde, setSeconde] = useState<string>();
  const [minute, setMinute] = useState<string>("");
  const [heure, setHeure] = useState<string>();
  const [mois, setMois] = useState<string>();
  const [annee, setAnnee] = useState<string>();
  const [jour, setJour] = useState<string>();
  const [cacher_auto, setcacher_auto] = useState<boolean>(false);
  const [temperature, setTemperature] = useState<string>("--");
  const [humid_sol, setHumid_sol] = useState<string>("--");
  const [humid_serre, setHumid_serre] = useState<string>("--");
  const [luminosite, setLuminosite] = useState<string>("--");
  const [periode, setPeriode] = useState<string>();
  const [temps, setTemps] = useState<string>();
  const [restant, setRestant] = useState<string>("");
  const [restant2, setRestant2] = useState<string>("");
  const [restant3, setRestant3] = useState<string>("");
  let etatBtn = false;
  let etatBtn_ = false;
  //parametre
  const [heure1, setHeure1] = useState<string>("");
  const [heure2, setHeure2] = useState<string>("");
  const [heure3, setHeure3] = useState<string>("");
  const [minute1, setMinute1] = useState<string>("");
  const [minute2, setMinute2] = useState<string>("");
  const [minute3, setMinute3] = useState<string>("");
  const [duree, setDuree] = useState<string>("");

  //recuperation données parametres
  useEffect(() => {
    fetch("http://localhost:3000/parametre", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setDuree(res[0].duree);
        setHeure1(res[0].heure_arrosage1);
        setHeure2(res[0].heure_arrosage2);
        setHeure3(res[0].heure_arrosage3);
        setMinute1(res[0].minute_arrosage1);
        setMinute2(res[0].minute_arrosage2);
        setMinute3(res[0].minute_arrosage3);
        //console.log(duree);
      });
  }, [seconde]);

  useEffect(() => {
      if (heure == "15" && minute == "0" && seconde == "0") {
    fetch("http://localhost:3000/historique", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        temperature: temperature,
        humid_sol: humid_sol,
        humid_serre: humid_serre,
        luminosite: luminosite,
        date: periode,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(jour);
        //console.log(annee.length)
        //window.location.reload();
      });
      }
      if (localStorage.getItem("auto") == "true") {
        //calcule pour demarrage
        let test;
        let test2;
        let test3;
        test = parseInt(minute1) - parseInt(minute);
        test2 = parseInt(minute2) - parseInt(minute);
        test3 = parseInt(minute3) - parseInt(minute);
        /*  console.log(test)
        console.log(test2)
        console.log(test3) */
        if (test > 0 && test < 3) {
          //console.log(`prochain arrosage dans ${test}`)
          setRestant(`arrosage dans ${test} mn`);
          setRestant2("");
          setRestant3("");
        } else {
          setRestant("");
        }
        if (test2 > 0 && test2 < 3) {
          setRestant2(`arrosage dans ${test2} mn`);
          setRestant("");
          setRestant3("");
        } else {
          setRestant2("");
        }
        if (test3 > 0 && test3 < 3) {
          setRestant3(`arrosage dans ${test3} mn`);
          setRestant2("");
          setRestant("");
        } else {
          setRestant3("");
        }
  
        if (
          (heure == heure1 && minute == minute1 && seconde == "0") ||
          (heure == heure2 && minute == minute2 && seconde == "0") ||
          (heure == heure3 && minute == minute3 && seconde == "0")
        ) {
          off_Arrosage();
  
          if (duree == "1") {
            setTimeout(() => {
              on_Arrosage();
            }, 60000);
          }
          if (duree == "2") {
            setTimeout(() => {
              on_Arrosage();
            }, 120000);
          }
          if (duree == "3") {
            setTimeout(() => {
              on_Arrosage();
            }, 180000);
          }
          if (duree == "4") {
            setTimeout(() => {
              on_Arrosage();
            }, 240000);
          }
          if (duree == "5") {
            setTimeout(() => {
              on_Arrosage();
            }, 300000);
          }
          if (duree == "6") {
            setTimeout(() => {
              on_Arrosage();
            }, 360000);
          }
          if (duree == "7") {
            setTimeout(() => {
              on_Arrosage();
            }, 420000);
          }
          if (duree == "8") {
            setTimeout(() => {
              on_Arrosage();
            }, 480000);
          }
          if (duree == "9") {
            setTimeout(() => {
              on_Arrosage();
            }, 540000);
          }
          if (duree == "10") {
            setTimeout(() => {
              on_Arrosage();
            }, 600000);
          }
        }
      }
  }, [seconde]);

  useEffect(() => {
    const socket = socketIOClient(connection);
    socket.on("connection", (data) => {
      setDonnee(Array(data));
      //console.log(data);
      setHumid_serre(data.humid_serre);
      setHumid_sol(data.humid_sol);
      setLuminosite(data.luminosite);
      setTemperature(data.temperature);
    });
    if (localStorage.getItem("auto") == "false") {
      setcacher_auto(true);
    }
    if (localStorage.getItem("auto") == "true") {
      setcacher_auto(false);
    }
    if (localStorage.getItem("etat_arrosage") == "false") {
      setCacher(false);
    }
    if (localStorage.getItem("etat_arrosage") == "true") {
      setCacher(true);
    }
    if (localStorage.getItem("etat_ventilateur") == "false") {
      setCacher_(false);
    }
    if (localStorage.getItem("etat_ventilateur") == "true") {
      setCacher_(true);
    }
    //toit
    if (localStorage.getItem("etat_toit1") == "true") {
      set_45(true);
      set_90(false);
      set_180(false);
    }
    if (localStorage.getItem("etat_toit2") == "true") {
      set_45(false);
      set_90(true);
      set_180(false);
    }
    if (localStorage.getItem("etat_toit3") == "true") {
      set_45(false);
      set_90(false);
      set_180(true);
    }
    if (localStorage.getItem("etat_toit1") == "false") {
      set_45(false);
    }
    if (localStorage.getItem("etat_toit2") == "false") {
      set_90(false);
    }
    if (localStorage.getItem("etat_toit3") == "false") {
      set_180(false);
    }
  }, []);
  useEffect(() => {
    if (parseInt(humid_serre) > 80) {
      setCacher_(true);
      localStorage.setItem("etat_ventilateur", "true");
    }
    if (parseInt(humid_serre) > 77 && parseInt(humid_serre) <= 80) {
      setCacher_(false);
      localStorage.setItem("etat_ventilateur", "false");
    } /* 
       if (  parseInt(humid_sol) < 5) {
      setCacher(true);
      localStorage.setItem("etat_arrosage", "true");
    
    } 
      if ((parseInt(humid_sol) > 5) && (parseInt(humid_sol) < 8) ) {
      setCacher(false);
      localStorage.setItem("etat_arrosage", "false");
    
    } */
    if (  parseInt(luminosite) < 5) {
    set_45(true);
    set_90(false);
    set_180(false);
    localStorage.setItem("etat_toit1", "true");
    localStorage.setItem("etat_toit2", "false");
    localStorage.setItem("etat_toit3", "false");
    
    }   
  }, [humid_sol, humid_serre, luminosite]);

  //param arrosage automatique
/*   useEffect(() => {
  
  }, [seconde]); */

  const perso1 = () => {
    setcacher_auto(true);
    localStorage.removeItem("auto");
    localStorage.setItem("auto", "false");
    /*   localStorage.removeItem("_TIME1");
    localStorage.removeItem("_TIME2");
    localStorage.removeItem("_TIME3");
    localStorage.removeItem("_DELAI");
    localStorage.removeItem("CHOIX"); */
  };
  const perso2 = () => {
    setcacher_auto(false);
    localStorage.removeItem("auto");
    localStorage.setItem("auto", "true");
    /*   localStorage.setItem("_DELAI", "1");
    localStorage.setItem("CHOIX", "Laitue");
    localStorage.setItem("_TIME1", "0");
    localStorage.setItem("_TIME2", "30");
    localStorage.setItem("_TIME3", "nan"); */
  };

  setInterval(() => repeter(), 1000);

  const repeter = () => {
    let currentDate =
      new Date().getFullYear() +
      "-" +
      "0" +
      (parseInt(String(new Date().getMonth())) + 1) +
      "-" +
      new Date().getDate();

    let date = new Date();
    let seconde = date.getSeconds();
    let minute = date.getMinutes();
    let heure = date.getHours();
    let mois = date.getMonth() + 1;
    let annee = date.getFullYear();
    let jour = date.getDay();
    let moisStr = mois.toString();
    let jourStr = jour.toString();

    if (mois < 10) {
      moisStr = "0" + mois;
    }
    if (jour < 10) {
      jourStr = "0" + jour;
    }

    setSeconde(seconde.toString());
    setMinute(minute.toString());
    setHeure(heure.toString());
    setMois(moisStr);
    setAnnee(annee.toString());
    setJour(jourStr);

    setPeriode(currentDate);
  };

  const on_Arrosage = () => {
    setCacher(false);
    const socket = socketIOClient(connection);
    socket.emit("fanOn", "6");
    localStorage.setItem("etat_arrosage", "false");
  };
  const off_Arrosage = () => {
    setCacher(true);
    const socket = socketIOClient(connection);
    socket.emit("fanOn", "7");
    localStorage.setItem("etat_arrosage", "true");
  };

  const on_Ventilateur = () => {
    setCacher_(false);
    const socket = socketIOClient(connection);
    socket.emit("fanOn", "0");
    localStorage.setItem("etat_ventilateur", "false");
  };
  const off_Ventilateur = () => {
    setCacher_(true);
    const socket = socketIOClient(connection);
    socket.emit("fanOn", "1");
    localStorage.setItem("etat_ventilateur", "true");
  };
  //Les fonctions du toit l'ouverture consiste à mettre une condition
  // true sur le bonton clicker et grisser les autre en meme temps
  const ouverture_45 = () => {
    set_45(true);
    set_90(false);
    set_180(false);
    const socket = socketIOClient(connection);
    socket.emit("fanOn", "2");
    localStorage.setItem("etat_toit1", "true");
    localStorage.setItem("etat_toit2", "false");
    localStorage.setItem("etat_toit3", "false");
  };

  const ouverture_90 = () => {
    set_45(false);
    set_90(true);
    set_180(false);
    const socket = socketIOClient(connection);
    socket.emit("fanOn", "3");
    localStorage.setItem("etat_toit2", "true");
    localStorage.setItem("etat_toit1", "false");
    localStorage.setItem("etat_toit3", "false");
  };
  const ouverture_180 = () => {
    set_45(false);
    set_90(false);
    set_180(true);
    const socket = socketIOClient(connection);
    socket.emit("fanOn", "4");
    localStorage.setItem("etat_toit3", "true");
    localStorage.setItem("etat_toit1", "false");
    localStorage.setItem("etat_toit2", "false");
  };
  //fermeture
  const fermeture_45 = () => {
    set_45(false);
    const socket = socketIOClient(connection);
    socket.emit("fanOn", "5");
    localStorage.setItem("etat_toit1", "false");
  };
  const fermeture_90 = () => {
    set_90(false);
    const socket = socketIOClient(connection);
    socket.emit("fanOn", "5");
    localStorage.setItem("etat_toit2", "false");
  };
  const fermeture_180 = () => {
    set_180(false);
    const socket = socketIOClient(connection);
    socket.emit("fanOn", "5");
    localStorage.setItem("etat_toit3", "false");
  };

  const usenavigate = useNavigate();
  if (localStorage.getItem("token") == undefined) {
    return (<div>Not found</div>)
  } else {
    return (
      <>
        <Navbarre></Navbarre>
        <div className="container container_">
          <div className="row">
            <div className="col-lg-4">
              <div className="card card_">
                <div className="titlee">
                  <h5 className="titl">TEMPERATURE</h5>
                </div>
                <div className="icon">
                  <img className="imga" src={temp} alt="" />
                </div>
                <div className="cont-temp">
                  <p className="real-time">{temperature} °C</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card card_">
                <div className="titlee">
                  <h5 className="titl">LUMINOSITE</h5>
                </div>
                <div className="icon">
                  <img className="imga" src={sun} alt="" />
                </div>
                <div className="cont-temp">
                  <p className="real-time">{luminosite} LUX</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 ">
              <div className="card card_">
                <div className="titlee">
                  <h5 className="titl">HUMIDITE</h5>
                </div>
                <div className="icon">
                  <img className="imga" src={humid} alt="" />
                </div>
                <div className="cont-temp">
                  <p className="real-time">{humid_serre} % </p>
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              {" "}
              <br />
              <div className=" card card_ ">
                <div className="">
                  <img className="img-humid" src={humidity} alt="" />
                </div>
                <div className="cont-temp"></div>
                <div className=" ">
                  <p className="real-time humid">HUMIDITE : {humid_sol}</p>
                </div>
              </div>
            </div>
            <div className="col-lg-8">
              <br />
              <div className=" card card_ ">
                <div className="h4">
                  <h4 className=" card-title ">CONTROLE DU SYSTEME</h4>
                </div>

                <div className="action">
                  <div className="act">
                    <div className="parat">
                      <div className="toit">
                        <p>TOIT</p>
                        <img className="imga_" src={toit} alt="" />
                      </div>
                    </div>
                    <div className="parat">
                      {/* <Form>
                      <Form.Check type="switch" id="toit1" />
                    </Form>{" "} */}
                      <div className="angle_1">
                        <img
                          className={`lesBtn ${!_45 ? "cacher" : ""}`}
                          src={on_arrosage}
                          alt=""
                          onClick={() => {
                            fermeture_45();
                          }}
                        />
                        <img
                          onClick={() => {
                            ouverture_45();
                          }}
                          className={`lesBtn ${_45 ? "cacher" : ""}`}
                          src={off_arrosage}
                          alt=""
                        />
                      </div>
                      45°
                      {/* <Form>
                      <Form.Check type="switch" id="toit2" />
                    </Form>{" "} */}
                      <div className="angle_1">
                        <img
                          onClick={() => {
                            fermeture_90();
                          }}
                          className={`lesBtn ${!_90 ? "cacher" : ""}`}
                          src={on_arrosage}
                          alt=""
                        />
                        <img
                          onClick={() => {
                            ouverture_90();
                          }}
                          className={`lesBtn ${_90 ? "cacher" : ""}`}
                          src={off_arrosage}
                          alt=""
                        />
                      </div>
                      90°
                      {/* <Form>
                      <Form.Check type="switch" id="toit3" />
                    </Form> */}
                      <div className="angle_1">
                        <img
                          onClick={() => {
                            fermeture_180();
                          }}
                          className={`lesBtn ${!_180 ? "cacher" : ""}`}
                          src={on_arrosage}
                          alt=""
                        />
                        <img
                          onClick={() => {
                            ouverture_180();
                          }}
                          className={`lesBtn ${_180 ? "cacher" : ""}`}
                          src={off_arrosage}
                          alt=""
                        />
                      </div>
                      180°
                    </div>
                  </div>
                  <div className="act">
                    <div className="parat">
                      <div className="toit">
                        <p>ARROSEUR</p>
                        {/*  arrosage automatique */}
                        <div className="switch_arro">
                          <img
                            className={`${cacher_auto ? "cacher" : ""}`}
                            onClick={() => {
                              perso1();
                            }}
                            src={on_arrosage}
                            alt=""
                          />
                          <p
                            className={`text-success ${
                              cacher_auto ? "cacher" : ""
                            }`}
                          >
                            auto activé <br /> {restant}
                            {restant2}
                            {restant3}{" "}
                          </p>
                          <img
                            className={`${!cacher_auto ? "cacher" : ""}`}
                            onClick={() => {
                              perso2();
                            }}
                            src={off_arrosage}
                            alt=""
                          />
                          <p
                            className={`text-danger ${
                              !cacher_auto ? "cacher" : ""
                            }`}
                          >
                            auto désactivé
                          </p>
                        </div>
                        <img
                          id="voir"
                          className={`imga_ ${cacher ? "cacher" : ""}`}
                          src={arro}
                          alt=""
                        />
                        <img
                          id="radius"
                          className={`imga_ ${!cacher ? "cacher" : ""}`}
                          src={arrosage}
                          alt=""
                        />
                      </div>
                    </div>
                    <div className="parat">
                      {/*  { <Form>
                      <Form.Check type="switch" onClick={() => {
                          switcher();
                        }}
                      id="arrosage" />
                    </Form> } */}
                      <img
                        className={`lesBtn ${!cacher ? "cacher" : ""}`}
                        onClick={() => {
                          on_Arrosage();
                        }}
                        src={on_arrosage}
                        alt=""
                      />

                      <img
                        className={`lesBtn ${cacher ? "cacher" : ""}`}
                        onClick={() => {
                          off_Arrosage();
                        }}
                        src={off_arrosage}
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="act">
                    <div className="parat">
                      <div className="toit">
                        <p>VENTILATEUR</p>
                        <div className="toit">
                          <img
                            className={`imga_ ${cacher_ ? "cacher" : ""}`}
                            src={vent}
                            alt=""
                          />
                          <img
                            className={`imga_ ${!cacher_ ? "cacher" : ""}`}
                            src={ventilateur}
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                    <div className="parat">
                      {/* <Form>
                      <Form.Check type="switch" onClick={() => {
                          switcher_();}} id="ventilateur" />
                    </Form> */}
                      <img
                        className={`lesBtn ${!cacher_ ? "cacher" : ""}`}
                        onClick={() => {
                          on_Ventilateur();
                        }}
                        src={on_arrosage}
                        alt=""
                      />

                      <img
                        className={`lesBtn ${cacher_ ? "cacher" : ""}`}
                        onClick={() => {
                          off_Ventilateur();
                        }}
                        src={off_arrosage}
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default Dashboard;
