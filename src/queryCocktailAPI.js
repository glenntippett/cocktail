const cocktailList = document.querySelector('.cocktail-list');
const cocktailSearchForm = document.querySelector('.form-cocktail-search');


const linkToCocktailRecipePage = () => {
  const cocktailThumbnails = document.querySelectorAll('.img-cocktail');
  cocktailThumbnails.forEach((thumbnail) => {
    console.log(thumbnail.innerText);
    thumbnail.addEventListener('click', (event) => {
      event.preventDefault
      console.log('I was clicked');
    });
  });
}

const buildCocktailList = (data) => {
  // Check if drink name entered is found
  if (data.drinks === null) {
    const noDrinksFound = '<p>No drinks found...</p>';
    cocktailList.insertAdjacentHTML('beforeend', noDrinksFound);
  } else {
    data.drinks.forEach(drink => {
      const cocktailNameList = `
      <a class="img-cocktail" href="cocktail-recipe.html"
      style="background-image: linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${drink.strDrinkThumb})"
      href="#">
      ${drink.strDrink}</a>
      `;
      cocktailList.insertAdjacentHTML('beforeend', cocktailNameList);
      linkToCocktailRecipePage();
    });
  }
}

const queryCocktailAPI = cocktailName => {
  return new Promise ((resolve, reject) => {
    if (resolve) {
      fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktailName}`)
      .then(response => { 
        // Check for bad/good http response
        if (!response.ok) { console.log('error') }  
        return response.json()})
        .then((data) => {
          resolve(data);
        });
      } else {
        console.log('promise not resolved');
      }
    });
  };
  
  // Generate cocktail list based on user input into search form
  cocktailSearchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    cocktailList.innerHTML = "";
    const cocktailName = document.querySelector('#input-cocktail-name').value;
    queryCocktailAPI(cocktailName);
  });
  
  // Show default cocktails on home page
  const populateFirstPageLoad = async () => {
    const data = await queryCocktailAPI('martini');
    buildCocktailList(data);
  }
  
  populateFirstPageLoad();
  
  export { queryCocktailAPI };