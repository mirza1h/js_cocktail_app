class CocktailDB {
  getFromDB() {
    let drinks = [];
    if(localStorage.getItem("drinks") === null) {
      drinks = [];
    }
    else {
      drinks = JSON.parse(localStorage.getItem("drinks"));
    }
    return drinks;
  }

  saveToDB(drink) {
    let drinks = this.getFromDB();
    drinks.push(drink);
    localStorage.setItem("drinks", JSON.stringify(drinks));
  }

  removeFromDB(id) {
    let drinks = this.getFromDB();
    drinks.forEach( (drink,index) => {
      if(drink.id == id) {
        drinks.splice(index, 1);
      }
    })
    localStorage.setItem("drinks", JSON.stringify(drinks));
  }
}