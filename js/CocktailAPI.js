class CocktailAPI {
  async getCocktailsByName(name) {
    const url = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);

    const response = await url.json();
    
    return {response}
  }
  
  async getDrinksByIngredient(ingredient) {
    const url = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);

    const response = await url.json();
    
    return {response}
  }

  async showSingleRecipe(id) {
    const url = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
  
    const response = await url.json();

    return {response}
  }
  
  async getCategoriesList() {
    const url = await fetch("https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list");
  
    const response = await url.json();

    return {response}
  }
  
  async getDrinksByCategory(category) {
    const url = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
  
    const response = await url.json();

    return {response}
  }
  
  async getDrinksByType(type) {
    const url = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=${type}`);
  
    const response = await url.json();

    return {response}
  }

}