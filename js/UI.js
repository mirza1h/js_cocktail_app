class UI {
  printMessage(message, className) {
    const div = document.createElement("div");

    div.innerHTML = `
      <div class="alert alert-dismissable alert-${className}">
        <button  type="button" class="close" data-dismiss="alert">x</button> 
        ${message}
      </div>
    `;
    const reference = document.querySelector(".jumbotron h1");
    const parentNode = reference.parentElement;
    parentNode.insertBefore(div, reference);

    setTimeout( () => {
      div.remove();
    }, 4000);
  }
  
  displayDrinksWithIngredients(drinks) {

    // Show the Results
    const resultsWrapper = document.querySelector('.results-wrapper');
    resultsWrapper.style.display = 'block';

    // Insert the results
    const resultsDiv = document.querySelector('#results');

    drinks.forEach(drink => {
         resultsDiv.innerHTML += `
              <div class="col-md-6">
                   <div class="card my-3">
                        <button type="button" data-id="${drink.idDrink}" class="favorite-btn btn btn-outline-info">
                        +
                        </button>
                        <img class="card-img-top" src="${drink.strDrinkThumb}" alt="${drink.strDrink}">

                        <div class="card-body">
                             <h2 class="card-title text-center">${drink.strDrink}</h2>
                             <p class="card-text font-weight-bold">Instructions: </p>
                             <p class="card-text">
                                   ${drink.strInstructions}
                             </p>
                             <p class="card-text">
                                  <ul class="list-group">
                                       <li class="list-group-item alert alert-danger">Ingredients</li>
                                       ${this.displayIngredients(drink)}
                                  </ul>
                             </p>
                             <p class="card-text font-weight-bold">Extra Information:</p>
                             <p class="card-text">
                                  <span class="badge badge-pill badge-success">
                                       ${drink.strAlcoholic}
                                  </span>
                                  <span class="badge badge-pill badge-warning">
                                       Category: ${drink.strCategory}
                                  </span>
                             </p>
                        </div>
                   </div>
              </div>
         `;
    });
    this.isFavorite();
  }
  
  displayIngredients(drink) {
    let ingredients = [];
    for(let i = 1; i < 16; ++i) {
      const ingredientMeasure = {};
      if(drink[`strIngredient${i}`] !== '') {
        ingredientMeasure.ingredient = drink[`strIngredient${i}`];
        ingredientMeasure.measure = drink[`strMeasure${i}`];
        ingredients.push(ingredientMeasure);
      }
    }
    let ingredientsTemplate = ``;
    ingredients.forEach( (ingredient) => {
    ingredientsTemplate += `
      <li class="list-group-item">${ingredient.ingredient} - ${ingredient.measure}</li>
    `;
    });
    return ingredientsTemplate;
  }

  displayDrinks(drinks) {
    const resultsWrapper = document.querySelector('.results-wrapper');
    resultsWrapper.style.display = 'block';

    // Insert the results
    const resultsDiv = document.querySelector('#results');

    drinks.forEach( drink => {
      resultsDiv.innerHTML += `<div class="col-md-4">
      <div class="card my-3">
           <button type="button" data-id="${drink.idDrink}" class="favorite-btn btn btn-outline-info">
           +
           </button>
           <img class="card-img-top" src="${drink.strDrinkThumb}" alt="${drink.strDrink}">
           <div class="card-body">
                <h2 class="card-title text-center">${drink.strDrink}</h2>
                <a data-target="#recipe" class="btn btn-success get-recipe" href="#" data-toggle="modal" data-id="${drink.idDrink}">Get Recipe</a>
           </div>
      </div>
      </div>
      `;
  });
  this.isFavorite();
}

  clearResults() {
    const resultsDiv = document.querySelector('#results');
    resultsDiv.innerHTML = '';
  }

  displaySingleRecipe(recipe) {
    const modalTitle = document.querySelector(".modal-title"),
          modalBody = document.querySelector(".modal-body .description-text");
    let modalIngredients = document.querySelector(".modal-body .ingredient-list .list-group");
    modalTitle.innerHTML = recipe.strDrink;
    modalBody.innerHTML = recipe.strInstructions;
    modalIngredients.innerHTML = this.displayIngredients(recipe);
  }

  displayCategories() {
    cocktail.getCategoriesList()
    .then( categories => {
      const catList = categories.response.drinks;
      const select = document.querySelector(".search-category");
      catList.forEach(drink => {
        const option = document.createElement("option")
        option.textContent = drink.strCategory;
        option.value = drink.strCategory.split(' ').join('_'); 
        select.appendChild(option);
      });
    });
  }

  displayFavorites(drinks) {
    const favoritesList = document.querySelector("#favorites tbody");
    drinks.forEach(drink => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>
          <img src="${drink.img}" alt="${drink.name}" width="100">
        </td>
        <td>
          ${drink.name}
        </td>
        <td>
          <a href="#" data-toggle="modal" data-target="#recipe" data-id="${drink.id}" class="btn btn-success get-recipe">
            View
          </a>
        </td>
        <td>
          <a href="#" data-id="${drink.id}" class="btn btn-danger remove-recipe">
            Remove
          </a>
        </td>
      `;
      favoritesList.appendChild(tr);
    }); 
  }

  removeFavorite(element) {
    element.remove();
  }

  isFavorite() {
    const drinks = cocktailDB.getFromDB();
    drinks.forEach( drink => {
      let {id} = drink;
      let favoriteDrink = document.querySelector(`[data-id="${id}"]`);
      if(favoriteDrink) {
        favoriteDrink.classList.add("is-favorite");
        favoriteDrink.textContent = "-";
      }
    })
  }
}