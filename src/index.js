import { 
  searchForCocktail,
  populateFirstPageLoad
} from './queryCocktailAPI';

const cocktailSearchForm = document.querySelector('.form-cocktail-search');

// Show default cocktails on home page
populateFirstPageLoad(); 

// Generate cocktail list based on user input into search form
cocktailSearchForm.addEventListener('submit', searchForCocktail)
