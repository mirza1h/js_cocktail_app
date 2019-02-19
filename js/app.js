const ui = new UI(),
      cocktail = new CocktailAPI(),
      cocktailDB = new CocktailDB();


eventListeners();

function eventListeners() {
  document.addEventListener("DOMContentLoaded", documentReady);

  const searchForm = document.getElementById("search-form");
  if(searchForm) 
    searchForm.addEventListener("submit", getCocktails);
  const resultsDiv = document.getElementById("results");
  if(resultsDiv) {
    resultsDiv.addEventListener("click", resultsDelegation);
  }
}

function getCocktails(e) {
  e.preventDefault();

  const searchTerm = document.getElementById("search").value;
  if(searchTerm === '')
    ui.printMessage("Please enter something!", "danger");
  else {
    let serverResponse;
    const type = document.querySelector("#type").value;

    switch (type) {
      case "name":
          serverResponse = cocktail.getCocktailsByName(searchTerm);
        break;
      case "ingredient":
        serverResponse = cocktail.getDrinksByIngredient(searchTerm);
        break;
      case "category":
        serverResponse = cocktail.getDrinksByCategory(searchTerm);
        break;
      case "alcohol":
        serverResponse = cocktail.getDrinksByType(searchTerm);
        break;
    }

    ui.clearResults();

    serverResponse.then( (cocktailName) => {
      if(cocktailName.response.drinks === null)
        ui.printMessage("No results!", "danger");  
      else {
        if(type === "name")
          ui.displayDrinksWithIngredients(cocktailName.response.drinks);
        else 
          ui.displayDrinks(cocktailName.response.drinks); 
      }
    } );
  }
}

function resultsDelegation(e) {
  e.preventDefault();
  if(e.target.classList.contains("get-recipe")) {
    cocktail.showSingleRecipe(e.target.dataset.id).then( recipe => {
      ui.displaySingleRecipe(recipe.response.drinks[0]);
    })
  }
  if(e.target.classList.contains("favorite-btn")) {
    if(e.target.classList.contains("is-favorite")) {
      e.target.classList.remove("is-favorite");
      e.target.textContent = "+";
      cocktailDB.removeFromDB(e.target.dataset.id);

    }
    else {
      e.target.classList.add("is-favorite")
      e.target.textContent = "-";
      
      const cardBody = e.target.parentElement;

      const drinkInfo = {
        id: e.target.dataset.id,
        name: cardBody.querySelector(".card-title").textContent,
        img: cardBody.querySelector(".card-img-top").src
      };
    cocktailDB.saveToDB(drinkInfo);
    }
  }
}

function documentReady() {
  ui.isFavorite();
  const searchCategory = document.querySelector(".search-category");
  if(searchCategory) {
    ui.displayCategories();
  }

  const favoritesList = document.getElementById("favorites");
  if(favoritesList) {
    const drinks = cocktailDB.getFromDB();
    ui.displayFavorites(drinks);

    favoritesList.addEventListener("click", e => {
      e.preventDefault();

      if(e.target.classList.contains("get-recipe")) {
        cocktail.showSingleRecipe(e.target.dataset.id).then( recipe => {
          ui.displaySingleRecipe(recipe.response.drinks[0]);
        })
      }
      if(e.target.classList.contains("remove-recipe")) {
        ui.removeFavorite(e.target.parentElement.parentElement);  
        cocktailDB.removeFromDB(e.target.dataset.id);
      }
    })
  }
}