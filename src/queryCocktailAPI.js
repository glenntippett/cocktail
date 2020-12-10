const queryCocktailAPI = () => {
  fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita')
  .then(response => response.json())
  .then(data => {
    console.log(data);
    data.drinks.forEach(drink => {
      const cocktailNameList = `<li>${drink.strDrink}<img class="img-cocktail" src="${drink.strDrinkThumb}"></li>`;
      const cocktailList = document.querySelector('.cocktail-list');
      cocktailList.insertAdjacentHTML('beforeend', cocktailNameList);
    });
  });
};

export { queryCocktailAPI };
