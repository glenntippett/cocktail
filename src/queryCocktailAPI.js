const queryCocktailAPI = () => {
  fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita')
  .then(response => response.json())
  .then(data => {
    data.drinks.forEach(drink => {
      const cocktailNameList = `
      <li class="img-cocktail" 
      style="background-image: url(${drink.strDrinkThumb})">
      ${drink.strDrink}</li>
      `;
      const cocktailList = document.querySelector('.cocktail-list');
      cocktailList.insertAdjacentHTML('beforeend', cocktailNameList);
    });
  });
};

export { queryCocktailAPI };