import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import realisations from "../../data/Realisations";

const ShopSection = () => {

  // Settings for the react-slick slider
  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3, // Adjust the number of products shown at a time
    slidesToScroll: 3,
  };

  return (
    <>
      <div id="realisation" className="shopcontainer row">
        <div className="section">
          <div className="row">
            <div className="col-lg-12 col-md-12 article">
              <div className="col-md-12 text-center mb-4">
                <h2>Nos Réalisations :</h2>
              </div>
              <div className="shopcontainer row">
                <Slider {...sliderSettings}>
                  {realisations.map((realisation) => (
                    <div
                      className="shop col-lg-4 col-md-6 col-sm-6"
                      key={realisation._id}
                    >
                      <div className="border-product">

                        <div className="shopBack">
                          <img src={realisation.image} alt={realisation.name} />
                        </div>


                        <div className="shoptext">
                          <h3>

                            {realisation.name}

                          </h3>
                          <p>{realisation.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopSection;
