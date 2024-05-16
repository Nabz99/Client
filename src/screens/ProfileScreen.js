import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import ProfileTabs from "../components/profileComponents/ProfileTabs";
import Orders from "./../components/profileComponents/Orders";
import Pubs from "../components/profileComponents/Pubs";
import Versements from "../components/profileComponents/Versements";

const ProfileScreen = () => {
  const [clientInfo, setClientInfo] = useState('');

  useEffect(() => {
    // Fetch client information from local storage
    const storedClient = localStorage.getItem('client');
    if (storedClient) {
      const parsedClient = JSON.parse(storedClient);
      console.log('Solde:', parsedClient.solde);
      console.log('Parsed Client:', parsedClient);
      // Log the solde value
      const formattedJoinDate = new Date(parsedClient.created_at).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
      // Update the state with client information
      setClientInfo({
        name: `${parsedClient.nom} ${parsedClient.prenom}`,
        doit: parsedClient.solde,
        joinDate: formattedJoinDate, // You need to replace this with the actual property name of the join date
      });
    }
  }, []);

  return (
    <>
      <Header />
      <div className="container mt-lg-5 mt-3">
        <div className="row align-items-start">
          <div className="col-lg-4 p-0 shadow">
            <div className="author-card pb-0 pb-md-3">
              <div className="author-card-cover"></div>
              <div className="author-card-profile row">
                <div className="author-card-avatar col-md-5">
                  <img src="./images/user.png" alt="userprofileimage" />
                </div>
                <div className="author-card-details col-md-7">
                  <h5 className="author-card-name mb-2">
                    <strong>{clientInfo.name}</strong>
                  </h5>
                  <h5 className="author-card-name mb-2">
                    <>Doit : {clientInfo.doit} DA</>
                  </h5>
                  <span className="author-card-position">
                    <>Ajouté le : {clientInfo.joinDate}</>
                  </span>
                </div>
              </div>
            </div>
            <div className="wizard pt-3 ">
              <div class="d-flex align-items-start">
                <div
                  class="nav align-items-start flex-column col-12 nav-pills me-3 "
                  id="v-pills-tab"
                  role="tablist"
                  aria-orientation="vertical"
                >
                  <button
                    class="nav-link active"
                    id="v-pills-home-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-home"
                    type="button"
                    role="tab"
                    aria-controls="v-pills-home"
                    aria-selected="true"
                  >
                    Profile Settings
                  </button>
                  <button
                    class="nav-link d-flex justify-content-between"
                    id="v-pills-profile-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-profile"
                    type="button"
                    role="tab"
                    aria-controls="v-pills-profile"
                    aria-selected="false"
                  >
                    Commandes d'articles
                  </button>
                  <button
                    class="nav-link d-flex justify-content-between"
                    id="v-pills-profile-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-profiles"
                    type="button"
                    role="tab"
                    aria-controls="v-pills-profile"
                    aria-selected="false"
                  >
                    Commande de publicité
                  </button>
                  <button
                    class="nav-link d-flex justify-content-between"
                    id="v-pills-profile-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-profiless"
                    type="button"
                    role="tab"
                    aria-controls="v-pills-profile"
                    aria-selected="false"
                  >
                    Versements
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* panels */}
          <div
            class="tab-content col-lg-8 pb-5 pt-lg-0 pt-3"
            id="v-pills-tabContent"
          >
            <div
              class="tab-pane fade show active"
              id="v-pills-home"
              role="tabpanel"
              aria-labelledby="v-pills-home-tab"
            >
              <ProfileTabs />
            </div>
            <div
              class="tab-pane fade"
              id="v-pills-profile"
              role="tabpanel"
              aria-labelledby="v-pills-profile-tab"
            >
              <Orders />
            </div>
            <div
              class="tab-pane fade"
              id="v-pills-profiles"
              role="tabpanel"
              aria-labelledby="v-pills-profile-tab"
            >
              <Pubs />
            </div>
            <div
              class="tab-pane fade"
              id="v-pills-profiless"
              role="tabpanel"
              aria-labelledby="v-pills-profile-tab"
            >
              <Versements />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileScreen;
