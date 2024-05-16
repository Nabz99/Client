import React, { useState, useEffect } from "react";
import { updateClient } from '../../api/client';

const ProfileTabs = () => {
  // State to track form input values
  const [id, setId] = useState(null);
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [entreprise, setEntreprise] = useState('');
  const [email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [tel, setTel] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const client = localStorage.getItem('client');
        const parsedUser = JSON.parse(client);
        setId(parsedUser._id);
        setNom(parsedUser.nom);
        setPrenom(parsedUser.prenom);
        setEntreprise(parsedUser.entreprise);
        setEmail(parsedUser.email);
        setTel(parsedUser.tel);
      } catch (error) {
        console.error('Error fetching user data:', error);
        // Handle the error as needed
      }
    };

    fetchUser();
  }, []);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if newPassword and confirmPassword match
    if (Password !== confirmPassword) {
      alert('New password and confirm password do not match');
      return;
    }

    const client = {
      nom,
      prenom,
      email,
      password: Password,
      entreprise,
      tel
    };

    if (window.confirm("Voullez vous vraiment modifier vos Infos?")) {
      updateClient(client, id)
        .then((res) => {
          console.log(res)
          window.alert("Modification avec Succes!");
        })
        .catch((error) => {
          window.alert("Moification n'etait pas faite, Veuillez vérifier les informations saisies!!!");
          console.error(error);
        });
    }
  };

  return (
    <>
      <form className="row  form-container" onSubmit={handleSubmit}>
        <div className="col-md-6">
          <div className="form">
            <label htmlFor="account-fn">Nom</label>
            <input
              className="form-control"
              type="text"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              disabled
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form">
            <label htmlFor="account-ln">Prenom</label>
            <input
              className="form-control"
              type="text"
              value={prenom}
              onChange={(e) => setPrenom(e.target.value)}
              disabled
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form">
            <label htmlFor="account-email">E-mail Address</label>
            <input
              className="form-control"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form">
            <label htmlFor="account-entreprise">Entreprise</label>
            <input
              className="form-control"
              type="text"
              value={entreprise}
              onChange={(e) => setEntreprise(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form">
            <label htmlFor="account-pass">Password</label>
            <input
              className="form-control"
              type="password"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form">
            <label htmlFor="account-confirm-pass">Confirm Password</label>
            <input
              className="form-control"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>

        <div className="col-md-6">
          <div className="form">
            <label htmlFor="account-tel">Telephone</label>
            <input
              className="form-control"
              type="tel"
              value={tel}
              onChange={(e) => setTel(e.target.value)}
            />
          </div>
        </div>
        <button type="submit">Update Profile</button>
      </form>
    </>
  );
};

export default ProfileTabs;
