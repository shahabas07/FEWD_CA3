//calling fetch functions
fetchRandomMeal();

//Fetch ApI for Random Meal
function fetchRandomMeal() {
  fetch("https://www.themealdb.com/api/json/v1/1/random.php")
    .then((response) => response.json())
    .then((data) => displayMeal(data.meals[0]));
}
//Displaying Random Dish to User
function displayMeal(meal) {
  const random = document.getElementById("random");
  random.innerHTML = `
    <div>
    <img src="${meal.strMealThumb}" onclick="displayIngredients('(${meal.idMeal})')">
    <h3 onclick="displayIngredients('(${meal.idMeal})')" >${meal.strMeal}</h3>
    </div>
    `;
    

}
//Fetching Ingredients of dish
function displayIngredients(mealId) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    .then((response) => response.json())
    .then((data) => {
      const ingredients = getIngredientsList(data.meals[0]);
      showModal(ingredients);
    });
}
//Getting Ingredients
function getIngredientsList(meal) {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && measure) {
      ingredients.push(`${measure} ${ingredient}`);
    } else {
      break;
    }
  }
  return ingredients;
}
//show modal
function showModal(ingredients) {
  const modal = document.getElementById("modal");
  const ingredientList = document.getElementById("modal");
  ingredientList.innerHTML = ingredients
    .map(
      (ingredient) => `
      <li>${ingredient}</li>`
    )
    .join("");
  modal.style.display = "block";
}
function changingvisibility(){
  button=document.getElementById('on');
  button.style.display='block';
  button2=document.getElementById("closebutton");
  button2.style.display="block";
}
//close Modal
function closeModal(){
  const modal = document.getElementById("modal");
  const h2ingredient=document.getElementById("on");
  var closebutton=document.getElementById("closebutton");
  closebutton.style.display='none';
  modal.style.display= 'none';
  h2ingredient.style.display='none';

}

// ----------------------------------------



//Taking value from the text-box to search
function getValue() {
  var category = document.getElementById("search").value || "beef";
  fetchCategory();
  //Fetching Searched Category
  function fetchCategory() {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
      .then((response) => response.json())
      .then((data) => displayCategory(data.meals));
  }
  //Displaying Fetched Category
  function displayCategory(meals) {
    const categories = document.getElementById("categoriesdisplay");
    const mealList = meals
      .map(
        (meal) => `<div>
    <img onclick="displayIngredients('(${meal.idMeal})')" src="${meal.strMealThumb}"><p>${meal.strMeal}</p>
    </div>`
      )
      .join("");
    categories.innerHTML = `<h2>${category}</h2>
    <div>${mealList}</div>
    `;
  }
}

