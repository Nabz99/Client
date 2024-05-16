import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import products from "../../data/Products";

const ShopSection = () => {
  const isLoggedIn = localStorage.getItem('token');

  // Settings for the react-slick slider
  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3, // Adjust the number of products shown at a time
    slidesToScroll: 3,
  };

  const handleOrderClick = () => {
    if (isLoggedIn) {
      // Redirect to the order page
      window.location.href = "/order";
    } else {
      // Show an alert when the user is not logged in
      window.alert("Vous n'êtes pas connecté, veuillez vous connecter pour continuer votre commande.");
      // Redirect to the login page
      window.location.href = "/login";
    }
  };

  return (
    <>
      <div id="shop-section" className="shopcontainer row">
        <div className="section">
          <div className="row">
            <div className="col-lg-12 col-md-12 article">
              <div className="col-md-12 text-center mb-4">
                <h2>Produits à vendre :</h2>
              </div>
              <div className="shopcontainer row">
                <Slider {...sliderSettings}>
                  {products.map((product) => (
                    <div
                      className="shop col-lg-4 col-md-6 col-sm-6"
                      key={product._id}
                    >
                      <div className="border-product">
                          <div className="shopBack">
                            <img src={product.image} alt={product.name} />
                          </div>
                        

                        <div className="shoptext">
                          <h3>
                              {product.name}
                          </h3>
                          <p>{product.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
              <div className="col-md-12 text-center mt-4 mb-4 d-flex justify-content-center align-items-center">
                <button
                  className="btn btn-primary order-button"
                  onClick={handleOrderClick}
                >
                  Commandez vos produits maintenant
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopSection;
