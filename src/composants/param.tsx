import { useEffect, useState } from "react";
import "./styles/parametre.css";
function Param() {
  const [duree, setDuree] = useState<string>("");
  const [heure1, setHeure1] = useState<string>("");
  const [heure2, setHeure2] = useState<string>("");
  const [heure3, setHeure3] = useState<string>("");
  const [minute1, setMinute1] = useState<string>("");
  const [minute2, setMinute2] = useState<string>("");
  const [minute3, setMinute3] = useState<string>("");
  const [rep, setRep] = useState<string>("");
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
        setRep(res);
        setDuree(res[0].duree);
        setHeure1(res[0].heure_arrosage1);
        setHeure2(res[0].heure_arrosage2);
        setHeure3(res[0].heure_arrosage3);
        setMinute1(res[0].minute_arrosage1);
        setMinute2(res[0].minute_arrosage2);
        setMinute3(res[0].minute_arrosage3);
        //console.log(duree);
      });
  }, [rep]);
  return (
    <div>
      <div
        className="div"
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          position: "absolute",
          width: "13%",
          height: "auto",
          background: "white",
          marginTop: "100px",
          paddingTop: "20px",
          paddingLeft: "20px",
          boxShadow:"2px 2px 20px grey",
          fontSize: "20px"
          
        }}
      >
        <p>paramétre active</p>
        <p>durée d'arrosage : {duree} mn</p>
        <p className={`${heure1 == "" ? "cacher" : ""} `} ><li>{heure1} h {minute1} mn</li></p>
        <p className={`${heure2 == "" ? "cacher" : ""} `} ><li>{heure2} h {minute2} mn</li></p>
        <p className={`${heure3 == "" ? "cacher" : ""} `} ><li>{heure3} h {minute3} mn</li></p>
      </div>
    </div>
  );
}
export default Param;
