import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Card, Form } from "react-bootstrap";
import "./styles/update_password.css";
import eyeon from "../assets/eyes-on.png";
import eyesoff from "../assets/eyes-off.png";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import './styles/navebarre.css';

function navbarre() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [errorsms, setErrorsms] = useState<boolean>(true);
  const [password_actuel, setpassword_actuel] = useState(false);
  const [password_news, setpassword_news] = useState(false);
  const [password_confirm, setpassword_confirm] = useState(false);

  const [eye, seteye] = useState(true);
  const [eye2, seteye2] = useState(true);
  const [eye3, seteye3] = useState(true);

  const [password, setpassword1] = useState("");
  const [newPassword, setpassword2] = useState("");
  const [password3, setpassword3] = useState("");

  const [password1, setpassword11] = useState("password");
  const [password2, setpassword22] = useState("password");
  const [password33, setpassword33] = useState("password");

  const [errorPassword1, setErrorPassword1] = useState<string | null>(null);
  const [errorPassword2, setErrorPassword2] = useState<string | null>(null);
  const [errorPassword3, setErrorPassword3] = useState<string | null>(null);
  const [errorBack, setErrorBack] = useState("");
  const [etat, setEtat] = useState<boolean>(false);

  const [type, settype] = useState(false);
  const [type2, settype2] = useState(false);
  const [type3, settype3] = useState(false);

  const [musted, setMusted] = useState(null);
  const usenavigate = useNavigate();
 
  const onSubmit = (e: any) => {
    e.preventDefault();
    if (password === "" || newPassword === "" || password3 === "") {
      setErrorPassword1("Ce champ est requis");
      setErrorPassword2("Ce champ est requis");
      setErrorPassword3("Ce champ est requis");
    }else if(newPassword !== password3){
      setErrorPassword3("Les valeurs ne correspondent pas");
    }
    else {
      fetch(`http://localhost:3000/auth/${localStorage.getItem("id")}`, {
        method: "PUT",
        body: JSON.stringify({password, newPassword}),
        headers: {
          "Content-Type": "application/json",
           Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data.message)
          if (data.message) {
            setErrorBack(data.message);
            setEtat(true);
          }
          else{
            setShow(false);
            setEtat(false);
          }
        });
    }
  };

  const checkPassword1 = (password: string) => {
    setpassword1(password);
    if (password === "") {
      setErrorPassword1("Ce champ est requis");
    } else if (password.length < 6) {
      setErrorPassword1("au moins 6 caractères");
    } else {
      setErrorPassword1(null);
    }
  };
  const checkPassword2 = (newPassword: string) => {
    setpassword2(newPassword);
    if (newPassword === "") {
      setErrorPassword2("Ce champ est requis");
    } else if (newPassword.length < 6) {
      setErrorPassword2("au moins 6 caractères");
    } else {
      setErrorPassword2(null);
    }
  };
  const checkPassword3 = (password3: string) => {
    setpassword3(password3);
    if (password3 === "") {
      setErrorPassword3("Ce champ est requis");
    } else if(newPassword !== password3){
      setErrorPassword3("Les valeurs ne correspondent pas");
    } else {
      setErrorPassword3(null);
    }
  };

  

  const Eye = () => {
    if (password1 == "password") {
      setpassword11("text");
      seteye(false);
      settype(true);
    } else {
      setpassword11("password");
      seteye(true);
      settype(false);
    }
  };

  const Eye_news = () => {
    if (password2 == "password") {
      setpassword22("text");
      seteye2(false);
      settype2(true);
    } else {
      setpassword22("password");
      seteye2(true);
      settype2(false);
    }
  };

  const Eye_confirm = () => {
    if (password33 == "password") {
      setpassword33("text");
      seteye3(false);
      settype3(true);
    } else {
      setpassword33("password");
      seteye3(true);
      settype3(false);
    }
  };

  
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
        <div > 
      <nav className="navbar" id='navbar'>
        <div className="nav gap-5"> 
          <img  src="../public/user4.jpg" className='img' alt="" /> 
          <div className='drop'> 
            <div className='d-flex gap-2'>
          
                  <p className='info'>{localStorage.getItem('prenom')}</p>
                  <p className='info'>{localStorage.getItem('nom')}</p>
              </div>
              <div className="dropdown d-flex justify-content-center">
                <li className='items'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-caret-down-fill mb-3" viewBox="0 0 16 16">
                    <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                  </svg>
                    <ul className='sous'>
                      <li className="items-sous-liste"><a className='a' onClick={handleShow}>Modifier mot de passe</a></li>
                      <li className='items-sous-liste d-flex justify-content-center gap-1'>
                      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-box-arrow-right fw-bold" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
                        <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
                      </svg>
                        <a className='a' onClick={() => setModalShow(true)}>Deconnection</a>
                        </li>
                    </ul>
                  </li>
            </div>
          </div>
        </div>
        <div className='burger'>
          <li className='items'>
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
            </svg>
              <ul className='sous'>
                <li className="items-sous-liste"><a className='a' href={`/dashboard`}>DASHBOARD</a></li>
                <li className='items-sous-liste'><a className='a' href={`/historique`}>HISTORIQUE</a></li>
                <li className='items-sous-liste'><a className='a' href={`/parametre`}>PARAMETRES</a></li>
              </ul>
            </li>
          </div>
      </nav> 
    </div>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header className='header' closeButton>
          <Modal.Title>MODIFICATION MOT DE PASSE</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={onSubmit} className="">
                  <div
                    className={`alert alert-danger text-center ${
                      !etat ? "cacher" : ""
                    }`}>
                    
                      {errorBack}
                   
                  </div>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <div className="input-text">
                        <Form.Label>
                          Actuel mot de passe<span id="etoile">*</span>
                        </Form.Label>
                        <Form.Control
                          type={password1}
                          className={` ${password_actuel ? "warning" : ""} ${
                            type ? "type_password" : ""
                          }`}
                          placeholder="veillez saisir votre mot de passe"
                          onChange={(e) => checkPassword1(e.target.value)}
                          
                        />
                        <i className="bi bi-eye"></i>
                        <i
                          onClick={() => {
                            Eye();
                          }}
                          className={`bi ${eye ? "bi bi-eye-slash" : "bi-eye"}`}
                        ></i>
                      </div>

                      <div id="msgerror">
                        {errorPassword1}
                        
                      </div>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <div className="input-text">
                        <Form.Label>
                          Nouveau mot de passe<span id="etoile">*</span>
                        </Form.Label>
                        <Form.Control
                          id="compa"
                          type={password2}
                          className={` ${password_news ? "warning" : ""} ${
                            type ? "type_password" : ""
                          }`}
                          placeholder="veillez saisir votre mot de passe"
                          onChange={(e) => checkPassword2(e.target.value)}
                          
                        />
                        <i className="bi bi-eye"></i>
                        <i
                          onClick={() => {
                            Eye_news();
                          }}
                          className={`bi ${
                            eye2 ? "bi bi-eye-slash" : "bi-eye"
                          }`}
                        ></i>
                      </div>

                      <div id="msgerror">
                        {errorPassword2}
                        
                      </div>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <div className="input-text">
                        <Form.Label>
                          Confirmation mot de passe<span id="etoile">*</span>
                        </Form.Label>
                        <Form.Control
                          type={password33}
                          className={` ${password_confirm ? "warning" : ""} ${
                            type ? "type_password" : ""
                          }`}
                          placeholder="veillez saisir votre mot de passe"
                          onChange={(e) => checkPassword3(e.target.value)}
                         
                        />
                        <i className="bi bi-eye"></i>
                        <i
                          onClick={() => {
                            Eye_confirm();
                          }}
                          className={`bi ${
                            eye3 ? "bi bi-eye-slash" : "bi-eye"
                          }`}
                        ></i>
                      </div>
                      <div id="msgerror">
                      {errorPassword3}
                        
                      </div>
                    </Form.Group>

                    <Form.Group
                      className="mb-3"
                      controlId="formBasicCheckbox"
                    ></Form.Group>

                    <br />

                    <input id="button" type="submit" />
                  </Form>
                  </Modal.Body>
      </Modal>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );}
  function MyVerticallyCenteredModal(props:any) {
    const logOut = () => {
      localStorage.removeItem('prenom');
      localStorage.removeItem('nom');
      localStorage.removeItem('email');
      localStorage.removeItem('id');
      localStorage.removeItem('token');
      localStorage.removeItem('etat_toit1');
      localStorage.removeItem('etat_toit2');
      localStorage.removeItem('etat_toit3');
      localStorage.removeItem('etat_ventilateur');
      localStorage.removeItem('etat_arrosage');
    };
    return (
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className='d-flex justify-content-center'>
          <Modal.Title id="contained-modal-title-vcenter">
            Deconnection
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className='d-flex justify-content-center'>
          <p className='req'>
            Êtes-vous sûre de vouloir vous déconnecter ?
          </p>
        </Modal.Body>
        <Modal.Footer className='d-flex justify-content-center gap-5'>
        <Button variant='danger' onClick={props.onHide}>Annuler</Button>
          <Button href={`/connection`} onClick={logOut}>Confirmer</Button>
        </Modal.Footer>
      </Modal>
    );
  }

export default navbarre

