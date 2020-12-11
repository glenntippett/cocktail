const queryCocktailAPI = () => {
  fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=martini')
  .then(response => response.json())
  .then(data => {
    data.drinks.forEach(drink => {
      const cocktailNameList = `
      <a class="img-cocktail" 
      style="background-image: linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${drink.strDrinkThumb})"
      href="#">
      ${drink.strDrink}</a>
      `;
      const cocktailList = document.querySelector('.cocktail-list');
      cocktailList.insertAdjacentHTML('beforeend', cocktailNameList);
    });
  });
};

export { queryCocktailAPI };