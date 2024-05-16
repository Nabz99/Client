import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCmdArticlebyclient } from '../../../src/api/historique';
import { Modal, Button } from 'react-bootstrap';
import { FaEye } from 'react-icons/fa';


const Orders = () => {
  const [orderDetails, setOrderDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        // Fetch order details from the API endpoint
        const storedClient = localStorage.getItem('client');
        const parsedUser = JSON.parse(storedClient);
        const response = await getCmdArticlebyclient(parsedUser._id);
        console.log('API Response:', response); // Log the response
        setOrderDetails(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching order details:', error);
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, []);

  const handleOrderClick = (orderId) => {
    const clickedOrder = orderDetails.find((order) => order._id === orderId);
    setSelectedOrder(clickedOrder);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="d-flex justify-content-center align-items-center flex-column">
      {loading ? (
        <p>Loading order details...</p>
      ) : orderDetails.length === 0 ? (
        <div className="col-12 alert alert-info text-center mt-3">
          No Orders
          <Link
            className="btn btn-success mx-2 px-3 py-2"
            to="/"
            style={{
              fontSize: '12px',
            }}
          >
            START SHOPPING
          </Link>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>STATUS</th>
                <th>LIVRAISON</th>
                <th>DATE</th>
                <th>VERSEMENT</th>
                <th>TOTAL</th>
              </tr>
            </thead>
            <tbody>
              {orderDetails.map((cmdArticle) => (
                <tr
                  key={cmdArticle.numero}
                  className={cmdArticle.paye === 'Payé' || cmdArticle.paye === 'Payé Partiellement' ? 'alert-success' : 'alert-danger'}
                >
                  <td>{cmdArticle.numero} </td>
                  <td>{cmdArticle.paye}</td>
                  <td>{cmdArticle.livraison}</td>
                  <td>
                    {new Date(cmdArticle.created_at).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                    })}
                  </td>
                  <td>{cmdArticle.versement} DA</td>
                  <td>{cmdArticle.prixtotal} DA</td>
                  <Link to="#" className="link" onClick={() => handleOrderClick(cmdArticle._id)}>
                    <FaEye /> {/* Eye icon */}
                  </Link>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Commande d'article(s)</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Display detailed order information here */}
          {selectedOrder && (
            <>
              <p style={{
                textAlign: 'center',
                fontSize: '18px',
                fontWeight: 'bold',
                color: selectedOrder.paye === 'Payé' || selectedOrder.paye === 'Payé Partiellement' ? 'green' : 'red',
              }}>
                Status : {selectedOrder.paye}
              </p>
              <p>Order ID: {selectedOrder.numero}</p>
              <p>Etat de la commande: {selectedOrder.etat}</p>
              <p>Livraison: {selectedOrder.livraison}</p>
              {/* Add more details as needed */}
              <h5 style={{ textAlign: 'center', fontSize: '18px', fontWeight: 'bold', color: 'blue' }}>Article(s) Commandé(s)</h5>
              <table className="table">
                <thead>
                  <tr>
                    <th>Reference</th>
                    <th>Designation</th>
                    <th>Quantite (Unité)</th>
                    <th>Prix Unitaire (DA)</th>
                    <th>Prix Total(DA)</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedOrder.articles.map((article, index) => (
                    <tr key={index}>
                      <td>{article.reference}</td>
                      <td>{article.designation}</td>
                      <td>{article.quantite}</td>
                      <td>{article.prixu}</td>
                      <td>{article.prixt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="contentContainer">
                <div className="rightContent">
                  <h5 style={{ textAlign: 'center', fontSize: '18px', fontWeight: 'bold', color: 'blue' }}>Paiement</h5>
                  <p>Versement: {selectedOrder.versement} DA</p>
                  <p>Prix Total: {selectedOrder.prixtotal} DA</p>
                </div>
              </div>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Orders;
