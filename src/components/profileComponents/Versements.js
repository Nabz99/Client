import React, { useState, useEffect } from 'react';
import { getVersementbyclient } from '../../../src/api/historique';

const Versements = () => {
    const [versementDetails, setVersementDetails] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                // Fetch order details from the API endpoint
                const storedClient = localStorage.getItem('client');
                const parsedUser = JSON.parse(storedClient);
                const response = await getVersementbyclient(parsedUser._id);
                console.log('API Response:', response); // Log the response
                setVersementDetails(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching order details:', error);
                setLoading(false);
            }
        };

        fetchOrderDetails();
    }, []);

    return (
        <div className="d-flex justify-content-center align-items-center flex-column">
            {loading ? (
                <p>Loading order details...</p>
            ) : versementDetails.length === 0 ? (
                <div className="col-12 alert alert-info text-center mt-3">
                    Pas de Versements
                </div>
            ) : (
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>DATE</th>
                                <th>MONTANT</th>
                            </tr>
                        </thead>
                        <tbody>
                            {versementDetails.map((versement, index) => (
                                <tr key={versement._id}>
                                    <td>{index + 1}</td>
                                    <td>{new Date(versement.created_at).toLocaleDateString('en-GB', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric',
                                    })}</td>
                                    <td>{versement.montant} DA</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Versements;
