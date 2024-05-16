import React, { useState } from 'react';
import Header from "../components/Header";
import { Grid, InputAdornment } from '@mui/material';
import { Box, TextField, Button, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';
import { createPub } from '../api/pub';

export default function Create() {
    const client = localStorage.getItem('client');
    const parsedUser = JSON.parse(client);
    const [hauteur, setHauteur] = useState('');
    const [largeur, setLargeur] = useState('');
    const [description, setDescription] = useState('');
    const [titre, setTitre] = useState('');
    const titleList = ['Carte de visite', 'Carte de Rendez-Vous', 'Flyer','Dépliant','Etiquettes','Ordonnance','Banner','Banderole','Panneau publicitaire avec Bache','Habillage de vitrine','Habillage de voiture','Habillage de façades extérieures','Lettre boitier', 'Lettre en Forex', 'Lettre en Alucobond', 'Caissons lumineux', 'LED neon flexible', 'Flocage T-shirt', 'Flocage Casquette', 'Flocage Sac', 'Habillage façade en Aluco']; // Replace with your list of titles

    const handleHauteurChange = (event) => {
        const inputText = event.target.value;
        // Use a regular expression to remove non-numeric characters
        const numericOnly = inputText.replace(/[^0-9]/g, '');
        setHauteur(numericOnly);
    };
    const handleLargeurChange = (event) => {
        const inputText = event.target.value;
        // Use a regular expression to remove non-numeric characters
        const numericOnly = inputText.replace(/[^0-9]/g, '');
        setLargeur(numericOnly);
    };


    const handleSubmit = () => {
        const pub = {
            client: parsedUser._id,
            titre,
            dimension: {
                hauteur,
                largeur
            },
            description,
            etat: "Confirmation en attente",
            paye: "Non Payé",
        };

        // Send the FormData object to the server using axios
        createPub(pub)
            .then((res) => {
                console.log(res);
                window.alert("Commande de publicité ajoutée avec succès!");
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <form>
            <Header />
            <h4 style={{ display: 'flex', justifyContent: 'center' }}>
                Ajouter une nouvelle Commande de publicité
            </h4>
            <Box sx={{ width: '100%' }}>
                <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'center' }}>
                            <TextField
                                id="titre"
                                label="Titre"
                                variant="outlined"
                                value={titre}
                                onChange={(event) => setTitre(event.target.value)}
                                name="titre"
                                select
                                fullWidth
                                required
                            >
                                {titleList.map((title, index) => (
                                    <MenuItem key={index} value={title}>
                                        {title}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                    </Grid>
                    <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <TextField id="hauteur" label="Hauteur" variant="outlined" value={hauteur} onChange={handleHauteurChange} name="hauteur" InputProps={{
                            endAdornment: <InputAdornment position="start">Cm</InputAdornment>,
                        }} />
                    </Grid>
                    <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <TextField id="largeur" label="Largeur" variant="outlined" value={largeur} onChange={handleLargeurChange} name="largeur" InputProps={{
                            endAdornment: <InputAdornment position="start">Cm</InputAdornment>,
                        }} />
                    </Grid>
                    <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '30vh' }}>
                        <Grid item xs={6} md={6}>
                            <TextField
                                id="description"
                                label="Description"
                                variant="outlined"
                                value={description}
                                onChange={(event) => {
                                    setDescription(event.target.value);
                                }}
                                name="description"
                                required
                                multiline
                                rows={5} // You can adjust the number of rows as needed
                                style={{ width: '100%' }}
                            />
                        </Grid>
                    </Grid>

                </Grid>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Link to="/">
                        <Button variant="contained" onClick={handleSubmit} sx={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
                            Ajouter Commande de pub
                        </Button>
                    </Link>
                </Grid>
            </Box>
        </form>
    );
}
