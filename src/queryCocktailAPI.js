const queryCocktailAPI = cocktailName => {
  return new Promise ((resolve, reject) => {
    if (resolve) {
      fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktailName}`).then(response => { 
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

const queryCocktailById = cocktailId => {
  return new Promise ((resolve, reject) => {
    if (resolve) {
      fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${cocktailId}`).then(response => { 
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
}

const querySingleCocktailInfo = async (event) => {
  const drinkId = event.currentTarget.dataset.id;
  const queryString = `?id=${drinkId}`;
  window.location.href = `cocktail-recipe.html${queryString}`;
  // const data = await queryCocktailById(drinkId);
}

const linkToCocktailRecipePage = () => {
  const cocktailThumbnails = document.querySelectorAll('.img-cocktail');
  cocktailThumbnails.forEach((thumbnail) => {
    thumbnail.addEventListener('click', querySingleCocktailInfo)
  });
}

const buildCocktailList = (data) => {
  // Check if drink name entered is found
  const cocktailList = document.querySelector('.cocktail-list');
  cocktailList.innerHTML = "";
  if (data.drinks === null) {
    const noDrinksFound = '<p>No drinks found...</p>';
    cocktailList.insertAdjacentHTML('beforeend', noDrinksFound);
  } else {
    data.drinks.forEach(drink => {
      const cocktailNameList = `
      <a class="img-cocktail" data-id="${drink.idDrink}"
      style="background-image: linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${drink.strDrinkThumb})"
      href="#">
      ${drink.strDrink}</a>
      `;
      cocktailList.insertAdjacentHTML('beforeend', cocktailNameList);
    });
  }
}

const searchForCocktail = async (event) => {
  event.preventDefault();
  const cocktailName = document.querySelector('#input-cocktail-name').value;
  const data = await queryCocktailAPI(cocktailName);
  buildCocktailList(data);
}

const populateFirstPageLoad = async () => {
  const data = await queryCocktailAPI('martini');
  buildCocktailList(data);
  linkToCocktailRecipePage();
}

export { 
  searchForCocktail,
  populateFirstPageLoad
};