import React, { useState, useEffect } from 'react';
import Header from "../components/Header";
import { Grid, FormControl, InputLabel, MenuItem, Select, InputAdornment, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { Box, TextField, Button } from '@mui/material';
import { createCmdArticle } from '../api/cmdarticle';
import { getArticles } from '../api/article';

export default function Create() {
  const client = localStorage.getItem('client');
  const parsedUser = JSON.parse(client);
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState('');
  const [quantite, setQuantite] = useState("");
  const [selectedArticleData, setSelectedArticleData] = useState(null);
  const numero = generateRandomNumero();
  const [livraison, setLivraison] = useState("");
  const [prixtotal, setPrixtotal] = useState("");
  const [inputItems, setInputItems] = useState([]); // State to hold selected articles and quantities

  function generateRandomNumero() {
    const randomNum = Math.floor(100000 + Math.random() * 900000); // Generates a random 6-digit number
    return `${randomNum}`;
  }

  const handleArticleChange = (event) => {
    setSelectedArticle(event.target.value);
    // Fetch the selected article's data
    const selectedArticleInfo = articles.find(article => article._id === event.target.value);
    setSelectedArticleData(selectedArticleInfo);
  };

  const handleQuantiteChange = (event) => {
    const inputText = event.target.value;
    const numericOnly = inputText.replace(/[^0-9]/g, '');
    setQuantite(numericOnly);
  };

  const handleAddArticle = () => {
    // Add the selected article and quantity to the list
    const newInputItem = {
      id: Date.now(),
      selectedArticle,
      quantite,
      selectedArticleData,
    };

    // Calculate the price for the new item
    const priceForNewItem = (quantite || 0) * (selectedArticleData.prixunitaire || 0);

    // Update the total price with the new item's price
    setPrixtotal(parseFloat(prixtotal || 0) + priceForNewItem);

    // Update the list of selected items
    setInputItems([...inputItems, newInputItem]);

    // Clear the selected article and quantity
    setSelectedArticle('');
    setQuantite('');
    setSelectedArticleData(null);
  };

  const handleRemoveArticle = (itemId) => {
    // Find the selected item by id
    const removedItem = inputItems.find(item => item.id === itemId);
  
    // Calculate the price for the removed item
    const priceForRemovedItem = (removedItem.quantite || 0) * (removedItem.selectedArticleData ? removedItem.selectedArticleData.prixunitaire : 0);
  
    // Update the total price by subtracting the removed item's price
    setPrixtotal(parseFloat(prixtotal || 0) - priceForRemovedItem);
  
    // Remove the item from the list of selected items
    setInputItems(inputItems.filter(item => item.id !== itemId));
  };
  



  useEffect(() => {
    getArticles()
      .then(res => setArticles(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleSubmit = () => {
    // Create a cmdarticle object with the selected articles and quantities
    const articlesList = inputItems.map(item => ({
      article: item.selectedArticle,
      quantite: item.quantite,
      reference: item.selectedArticleData ? item.selectedArticleData.reference : '', // Use selectedArticleData
      designation: item.selectedArticleData ? item.selectedArticleData.designation : '', // Use selectedArticleData
      prixa: item.selectedArticleData ? item.selectedArticleData.prixdachat : 0,
      prixu: item.selectedArticleData ? item.selectedArticleData.prixunitaire : 0, // Use selectedArticleData
      prixt: (item.quantite || 0) * (item.selectedArticleData ? item.selectedArticleData.prixunitaire : 0), // Use selectedArticleData
      prixd: (item.quantite || 0) * (item.selectedArticleData.prixunitaire - (item.selectedArticleData.prixdachat || 0))
    }));
    const cmdarticle = {
      numero,
      client: parsedUser._id,
      articles: articlesList,
      livraison,
      etat: "Confirmation en attente",
      prixtotal,
      paye: "Non Payé",
      versement: 0
    };
    console.log('cmdarticle:', cmdarticle);

    // Send the FormData object to the server using axios
    createCmdArticle(cmdarticle)
      .then((res) => {
        console.log(res);
        window.alert("Commande d'achat d'article ajoutée avec succès!");
      })
      .catch((error) => {
        console.log(cmdarticle)
        console.error(error);
      });
  };

  return (
    <form>
      <Header />
      <h4 style={{ display: 'flex', justifyContent: 'center' }}>
        Ajouter une nouvelle Demande d'achat d'article
      </h4>
      <Box sx={{ width: '100%' }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Grid container rowSpacing={2} sx={{ display: 'flex', justifyContent: 'center' }} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              <Grid item xs={3}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel id="article-label">Article:</InputLabel>
                  <Select
                    labelId="article-label"
                    id="article"
                    value={selectedArticle}
                    onChange={handleArticleChange}
                    label="Article"
                  >
                    <MenuItem value="">
                      <em>Selectionner un Article</em>
                    </MenuItem>
                    {articles.map((article) => (
                      <MenuItem key={article._id} value={article._id}>
                        {article.designation}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={2}>
                <TextField
                  id="quantite"
                  label="Quantité"
                  variant="outlined"
                  value={quantite}
                  onChange={handleQuantiteChange}
                  name="quantite"
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  id={`unit-price`}
                  label="Prix Unitaire"
                  variant="outlined"
                  InputProps={{
                    endAdornment: <InputAdornment position="start">DA</InputAdornment>,
                  }}
                  value={selectedArticleData ? selectedArticleData.prixunitaire : ''}
                  disabled
                  fullWidth
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  id={`total-price`}
                  label="Prix Total D'article"
                  variant="outlined"
                  InputProps={{
                    endAdornment: <InputAdornment position="start">DA</InputAdornment>,
                  }}
                  value={(quantite * (selectedArticleData ? selectedArticleData.prixunitaire : 0)).toString()}
                  disabled
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button variant="contained" onClick={handleAddArticle}>
                  Ajouter Article
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {/* Display selected articles */}
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',  // This allows articles to wrap to the next line when they don't fit horizontally
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            marginTop: '20px', // Adjust this value as needed for spacing
          }}
        >
          {inputItems.map((inputItem, index) => (
            <Box key={inputItem.id} sx={{ border: '1px solid #ccc', borderRadius: '5px', padding: '10px', marginBottom: '10px' }}>
              <Grid container rowSpacing={1} sx={{ display: 'flex', justifyContent: 'center' }} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={3}>
                  <TextField
                    id={`designation-${index}`}
                    label="Article Designation"
                    variant="outlined"
                    value={inputItem.selectedArticleData ? inputItem.selectedArticleData.designation : ''}
                    disabled
                    fullWidth
                  />
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    id={`quantite-${index}`}
                    label="Quantité"
                    variant="outlined"
                    value={inputItem.quantite}
                    disabled
                    fullWidth
                    InputProps={{
                      endAdornment: <InputAdornment position="start">Pièce(s)</InputAdornment>,
                  }}
                  />
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    id={`quantite-${index}`}
                    label="Prix Unitaire"
                    variant="outlined"
                    value={inputItem.selectedArticleData.prixunitaire}
                    disabled
                    fullWidth
                    InputProps={{
                      endAdornment: <InputAdornment position="start">DA</InputAdornment>,
                  }}
                  />
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    id={`prix-total-${index}`}
                    label="Prix Total D'aticle"
                    variant="outlined"
                    InputProps={{
                      endAdornment: <InputAdornment position="start">DA</InputAdornment>,
                    }}
                    value={inputItem.selectedArticleData ? (inputItem.quantite * inputItem.selectedArticleData.prixunitaire).toString() : ''}
                    disabled
                    fullWidth
                  />
                </Grid>
                <Grid item xs={1}>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleRemoveArticle(inputItem.id)}
                  >
                    X
                  </Button>
                </Grid>
              </Grid>
            </Box>

          ))}
        </Box>
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Livraison:</FormLabel>
              <RadioGroup
                aria-label="livraison"
                name="livraison"
                value={livraison}
                onChange={(event) => setLivraison(event.target.value)}
              >
                <FormControlLabel value="Avec" control={<Radio />} label="Avec" />
                <FormControlLabel value="Sans" control={<Radio />} label="Sans" />
              </RadioGroup>
            </FormControl>
          </Grid>
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
          <TextField
            id="total-price"
            label="Prix Total HT"
            variant="outlined"
            value={prixtotal}
            InputProps={{
              endAdornment: <InputAdornment position="start">DA</InputAdornment>,
            }}
            disabled
          />
        </Grid>
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
          {/* <Link to="/"> */}
            <Button variant="contained" onClick={handleSubmit} sx={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
              Ajouter Commande
            </Button>
          {/* </Link> */}
        </Grid>
      </Box>
    </form>
  );
}
