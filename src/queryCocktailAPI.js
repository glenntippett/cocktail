const cocktailList = document.querySelector('.cocktail-list');


const queryCocktailAPI = (cocktailName) => {
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktailName}`)
  .then(response => response.json())
  .then(data => {
    data.drinks.forEach(drink => {
      const cocktailNameList = `
      <a class="img-cocktail" 
      style="background-image: linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${drink.strDrinkThumb})"
      href="#">
      ${drink.strDrink}</a>
      `;
      cocktailList.insertAdjacentHTML('beforeend', cocktailNameList);
    });
  });
};

queryCocktailAPI('martini');

const cocktailSearchForm = document.querySelector('.form-cocktail-search');
cocktailSearchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  cocktailList.innerHTML = "";
  const cocktailName = document.querySelector('#input-cocktail-name').value;
  queryCocktailAPI(cocktailName);
});

export { queryCocktailAPI };