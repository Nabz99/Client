import React from "react";

const ContactInfo = () => {
  const openGoogleMaps = () => {
    const latitude = "36.729825"; // Replace with your desired latitude
    const longitude = "3.957575"; // Replace with your desired longitude
    const mapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
    window.open(mapsUrl, "_blank");
  };
  return (
    <div id="contact-info" className="contactInfo container">
      <div className="row">
        <div className="col-12 col-md-4 contact-Box">
          <div className="box-info">
            <div className="info-image">
              <i className="fas fa-phone-alt"></i>
            </div>
            <h5>Appelez-Nous</h5>
            <p>0796 37 41 73</p>
          </div>
        </div>
        <div className="col-12 col-md-4 contact-Box">
          <div className="box-info">
            <div className="info-image">
              <i className="fas fa-map-marker-alt"></i>
            </div>
            <h5>Position</h5>
            <p>Draa Ben Khadda </p>
            <p>Wilaya Tizi Ouzzou</p>
            <button onClick={openGoogleMaps} className="btn btn-primary">
              Open in Google Maps
            </button>
          </div>
        </div>
        <div className="col-12 col-md-4 contact-Box">
          <div className="box-info">
            <div className="info-image">
              <i className="fas fa-envelope"></i>
            </div>
            <h5>E-mail</h5>
            <p>mcpub.dz@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
