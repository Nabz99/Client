import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPubbyclient } from '../../../src/api/historique';
import { Modal, Button } from 'react-bootstrap';
import { FaEye } from 'react-icons/fa';

const Pubs = () => {
    const [pubDetails, setPubDetails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                // Fetch order details from the API endpoint
                const storedClient = localStorage.getItem('client');
                const parsedUser = JSON.parse(storedClient);
                const response = await getPubbyclient(parsedUser._id);
                console.log('API Response:', response); // Log the response
                setPubDetails(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching order details:', error);
                setLoading(false);
            }
        };

        fetchOrderDetails();
    }, []);

    const handleOrderClick = (orderId) => {
        const clickedOrder = pubDetails.find((order) => order._id === orderId);
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
            ) : pubDetails.length === 0 ? (
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
                                <th>ETAT</th>
                                <th>DATE</th>
                                <th>VERSEMENT</th>
                                <th>DEVIS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pubDetails.map((pub, index) => (
                                <tr key={pub._id} className={pub.paye === 'Payé' || pub.paye === 'Payé Partiellement' ? 'alert-success' : 'alert-danger'}>
                                    <td>{index + 1}</td>
                                    <td>{pub.paye}</td>
                                    <td>{pub.etat}</td>
                                    <td>{new Date(pub.created_at).toLocaleDateString('en-GB', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric',
                                    })}</td>
                                    <td>{pub.versement} DA</td>
                                    <td>{pub.devis} DA</td>
                                    <Link to="#" className="link" onClick={() => handleOrderClick(pub._id)}>
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
                    <Modal.Title>Commande de publicité</Modal.Title>
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
                            <h5 style={{ textAlign: 'center', fontSize: '18px', fontWeight: 'bold', color: 'blue' }}>Titre de la publicité</h5>
                            <p>{selectedOrder.titre}</p>
                            <h5 style={{ textAlign: 'center', fontSize: '18px', fontWeight: 'bold', color: 'blue' }}>Dimensions</h5>
                            <p>Hauteur : {selectedOrder.dimension.hauteur} Cm</p>
                            <p>Largeur : {selectedOrder.dimension.largeur} Cm</p>
                            <h5 style={{ textAlign: 'center', fontSize: '18px', fontWeight: 'bold', color: 'blue' }}>Description</h5>
                            <p>{selectedOrder.description}</p>

                            {/* Add more details as needed */}
                            <div className="contentContainer">
                                <div className="rightContent">
                                    <h5 style={{ textAlign: 'center', fontSize: '18px', fontWeight: 'bold', color: 'blue' }}>Paiement</h5>
                                    <p>Versement : {selectedOrder.versement} DA</p>
                                    <p>Devis : {selectedOrder.devis} DA</p>
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

export default Pubs;
