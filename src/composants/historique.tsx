import Navbarre from "./navbarre";
import { useEffect, useState } from "react";
import "./styles/historique.css";
import { useNavigate } from "react-router-dom";

const Historique = () => {
  const [users, setUsers] = useState<any>(null);
  const [etat, setEtat] = useState<any>(null);
  const [start, setStart] = useState<number>(0);
  const [end, setEnd] = useState<number>(7);
  const [active1, setActive1] = useState<boolean>(true);
  const [active2, setActive2] = useState<boolean>(false);
  const [rechercher, setRecherche] = useState<String>("");
  const [cacher2, setCacher2] = useState<boolean>(true);

  const jour = new Date().getDate();
  const mois = new Date().getMonth() + 1;
  const annee = new Date().getFullYear();
  const max = `${annee}-0${mois}-${jour}`;

  useEffect(() => {
    fetch("http://localhost:3000/historique/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        //console.log(res);
        //masquer ou afficher la pagination
        if (res.length > 7) {
          setCacher2(false);
        } else {
          setCacher2(true);
        }
        setUsers(
          res.filter((_a: any, index: number) => {
            if (rechercher == "") {
              return index >= start && index < end;
            } else {
              setCacher2(true); //mis à jour to be merged MHDLamine->DEV
              return _a.date == rechercher;
            }
          })
        );
      });
      //console.log(users);
      
  }, [start, end, rechercher, cacher2]);

  const fleche = () => {
    if (active1 == true) {
      setActive1(false);
      setActive2(true);
      setStart(7);
      setEnd(14);
    }
    if (active2 == true) {
      setActive1(true);
      setActive2(false);
      setStart(0);
      setEnd(7);
    }
  };

  const Data = () => {
    return (
      <tbody>
        {users?.map((user: any) => (
          <tr>
            <td className="td_">{user.date}</td>
            <td className="td_">{user.temperature}</td>
            <td className="td_">{user.humid_sol}</td>
            <td className="td_">{user.humid_serre}</td>
            <td className="td_">{user.luminosite}</td>
          </tr>
        ))}
      </tbody>
    );
  };
  const search = (chercher: any) => {
    const valeur = chercher;
    setRecherche(valeur);
  };
  const usenavigate = useNavigate();
  if (localStorage.getItem("token") == undefined) {
    return (<div>Not found</div>)
  } else {
    return (
      <>
        <Navbarre></Navbarre>

        <div className="container box">
          <div className="h4-container">
            <h4 className="h4_">Historique</h4>
          </div>

          <div className="table_">
            <div className="table">
              <input
                onChange={(e) => search(e.target.value)}
                type="date"
                name="date"
                id="date"
                max={max}
                min="2023-03-01"
              />

              <table border={1}>
                <thead className="backblue">
                  <td className="td_ th_"> Date </td>
                  <td className="td_ th_">Temperature en °C</td>
                  <td className="td_ th_">Humidité sol en %</td>
                  <td className="td_ th_">Humidité serre en %</td>
                  <td className="td_ th_">luminosité en lux</td>
                </thead>
                <Data></Data>
              </table>
              <div className="box-pagination">
                <nav aria-label="Page navigation example">
                  <ul className="pagination pagination_ ">
                    <li className="page-item ">
                      <a
                        className={`pagenav ${cacher2 ? "cacher" : ""}`}
                        href="#"
                        aria-label="Previous"
                        onClick={() => {
                          fleche();
                        }}
                      >
                        <span aria-hidden="true">&laquo;</span>
                      </a>
                    </li>
                    <li className="page-item">
                      <a
                        className={`pagelinkupdate ${
                          active1 ? "bg-focus" : ""
                        }  `}
                        id="un"
                        href="#"
                        onClick={() => {
                          setStart(0);
                          setEnd(7);
                          setActive1(true);
                          setActive2(false);
                        }}
                      >
                        1
                      </a>
                    </li>
                    <li className="page-item">
                      <a
                        className={`pagelinkupdate ${
                          active2 ? "bg-focus" : ""
                        } ${cacher2 ? "cacher" : ""}`}
                        href="#"
                        onClick={() => {
                          setStart(7);
                          setEnd(11);
                          setActive1(false);
                          setActive2(true);
                        }}
                      >
                        2
                      </a>
                    </li>
                    <li className="page-item">
                      <a
                        className={`pagenav ${cacher2 ? "cacher" : ""}`}
                        href="#"
                        onClick={() => {
                          fleche();
                        }}
                        aria-label="Next"
                      >
                        <span aria-hidden="true">&raquo;</span>
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default Historique;