async function getRandomMeal() {
  const res = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
  const data = await res.json();
  const mealData = data.meals[0];
  addMealToMealList(mealData,true);
}

async function getMealById(id) {
  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  const data = await res.json();
  return data.meals[0];
}

async function getMealsBySearch(query) {
  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
  );
  const data = await res.json();
  return data.meals
}

function addMealToMealList(mealData, random = false) {
  const meal = document.createElement("div");
  meal.classList.add("recipe");

  meal.innerHTML = `
        <div class="recipe-header">
            <img src=${mealData.strMealThumb} alt="recipe-image">
            ${random ? '<span class="random">Random Recipe</span>': ''}
        </div>
        <div class="recipe-body">
            <h4>${mealData.strMeal}</h4>
            <button class="fav-btn"><i class="fa-solid fa-heart"></i></button>
        </div>
    `;

    const btn = meal.querySelector('.recipe-body .fav-btn');

    btn.addEventListener('click',()=>{
        if(btn.classList.contains('active')){
            removeMealLS(mealData.idMeal);
            btn.classList.remove('active')
        }else{
            addMealLS(mealData);
            btn.classList.add('active')
        }
    })

    mealsEl.appendChild(meal);
}

function addMealToFavList(mealData){
    const favMeal = document.createElement('li');
    favMeal.innerHTML = `
    <img src=${mealData.strMealThumb} alt="meal-image">
                    <span>${mealData.strMeal}</span>
                    <button class="clear"><i class="fas fa-window-close"></i></button>
    `;

    const btn = favMeal.querySelector('.clear')

    btn.addEventListener('click',(e)=>{
        e.stopPropagation();
        removeMealLS(mealData.idMeal);
        getFavMeals();
    })

    favMeal.addEventListener("click", () => {
        showMealInfo(mealData);
    });

    favMealsEl.appendChild(favMeal);
}

function addMealLS(meal){
    const mealIds = getMealLS();
    localStorage.setItem('mealIds',JSON.stringify([...mealIds,meal.idMeal]));
}

function removeMealLS(id){
    const mealIds = getMealLS();
    const filteredMealIds = mealIds.filter((mealId)=> mealId != id);
    localStorage.setItem('mealIds',JSON.stringify(filteredMealIds));
}

function getMealLS(){
    const mealIds = JSON.parse(localStorage.getItem('mealIds'));
    return mealIds===null ? [] : mealIds;
}

async function getFavMeals(){
    // clear the screen.
    favMealsEl.innerHTML = '';

    const mealIds = getMealLS();
    const mealsData = await Promise.all(mealIds.map(async (mealId)=> {
        const meal = await getMealById(mealId)
        return meal;
    }));
    
    mealsData.forEach((mealData)=>{
        addMealToFavList(mealData);
    })
}

function showMealInfo(mealData) {
    //clean it up
    mealInfoEl.innerHTML = '';

    const mealEl = document.createElement('div');
    const ingredients = [];

    // get ingredients and measures
    for (let i = 1; i <= 20; i++) {
        if (mealData["strIngredient" + i]) {
            ingredients.push(
                `${mealData["strIngredient" + i]} - ${
                    mealData["strMeasure" + i]
                }`
            );
        } else {
            break;
        }
    }

    mealEl.innerHTML = `
        <h1>${mealData.strMeal}</h1>
        <img
            src="${mealData.strMealThumb}"
            alt="${mealData.strMeal}"
        />
        <p>
        ${mealData.strInstructions}
        </p>
        <h3>Ingredients:</h3>
        <ul>
            ${ingredients
                .map(
                    (ing) => `
            <li>${ing}</li>
            `
                )
                .join("")}
        </ul>
    `;

    mealInfoEl.appendChild(mealEl);

    // show the popup
    mealPopup.classList.remove("hidden");
}

const mealsEl = document.getElementById('recipes')
const favMealsEl = document.getElementById('fav-recipes');

const mealPopup = document.getElementById("recipe-popup");
const mealInfoEl = document.getElementById("recipe-info");
const popupCloseBtn = document.getElementById("close-popup");

const searchQuery = document.getElementById("search-query");
const searchBtn = document.getElementById("search");

getRandomMeal();
getFavMeals();

searchBtn.addEventListener('click',async () => {
    mealsEl.innerHTML = '';
    const search = searchQuery.value;
    const meals = await getMealsBySearch(search);
    console.log(meals)
    if(meals){
        meals.forEach((meal)=>{
            addMealToMealList(meal);
        })
    }
})

popupCloseBtn.addEventListener("click", () => {
    mealPopup.classList.add("hidden");
});