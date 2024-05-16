import React from "react";
import { useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import Header from "./../components/Header";
import { signup } from '../api/auth';

const Register = () => {

  const history = useHistory();

  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [entreprise, setEntreprise] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPaswword] = useState('');
  const [tel, setTel] = useState('');

  const handleTelChange = (event) => {
    const inputText = event.target.value;
    // Use a regular expression to remove non-numeric characters
    const numericOnly = inputText.replace(/[^0-9]/g, '');
    setTel(numericOnly === '' ? null : numericOnly);
  };

  const handleSignUp = () => {
    const client_ = {
      nom,
      prenom,
      entreprise,
      email: email.toLowerCase(),
      password,
      tel,
      solde: 0
    };

    signup(client_)
      .then(() => {
        alert('Votre compte a été créé avec succès !');
        history.push('/');
      })
      .catch(error => {
        console.error(error);
        alert('E-mail déjà utilisé. Veuillez le changer.');
      });
  };

  return (
    <>
      <Header />
      <div className="container d-flex flex-column justify-content-center align-items-center login-center">
        <form className="Login col-md-8 col-lg-4 col-11">
          <input type="text" placeholder="Nom" onChange={(event) => setNom(event.target.value)} />
          <input type="text" placeholder="Prenom" onChange={(event) => setPrenom(event.target.value)} />
          <input type="text" placeholder="Entreprise" onChange={(event) => setEntreprise(event.target.value)} />
          <input type="email" placeholder="Email" onChange={(event) => setEmail(event.target.value)} />
          <input type="password" placeholder="Password" onChange={(event) => setPaswword(event.target.value)} />
          <input type="tel" placeholder="Telephone" onChange={handleTelChange} />

          <button type="button" onClick={handleSignUp}>SignUp</button>
          <p>
            <Link to={"/login"}>
              I Have Account <strong>Login</strong>
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Register;
