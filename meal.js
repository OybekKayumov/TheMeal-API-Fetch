fetch("https://www.themealdb.com/api/json/v1/1/random.php")
.then((res) => {
  if (res.ok) {
    return res.json()
  } else {
    throw new Error("Network Response Error!");
  }
})
.then(data => {
  console.log('loaded data: ', data);
  displayMeal(data)
})
.catch(err => console.error("Fetch Error: ", err))


displayMeal = (data) => {
  const Meal = data.meals[0];
  const mealDiv = document.querySelector('#meal');
  const IngredientsMeasures = document.querySelector('#ingredients-measures');
  
  // const mealName = Meal.strArea;
  const mealName = Meal.strMeal;
  console.log(mealName);
  const heading = document.createElement('h2');
  heading.innerHTML = mealName;
  console.log(heading);
  mealDiv.appendChild(heading);

  const mealImg = document.createElement('img');
  mealImg.src = Meal.strMealThumb;
  mealDiv.appendChild(mealImg);
  document.body.style.backgroundImage =
    "url('" + Meal.strMealThumb + "')";

  //! ingredients  
  const Ingredients = document.createElement('ul');
  Ingredients.className = 'ingredients';
  Ingredients.innerHTML = 'Ingredients';
  // IngredientsMeasures.appendChild(Ingredients);
  mealDiv.appendChild(Ingredients);
  
  const getIngredients = Object.keys(Meal)
    .filter(function (ingredient) {
      return ingredient.indexOf("strIngredient") == 0;
    })
    .reduce(function (ingredients, ingredient) {
      if (Meal[ingredient] != null) {
        ingredients[ingredient] = Meal[ingredient];
      }
      return ingredients;
    }, {});

  for (let key in getIngredients) {
    let value = getIngredients[key];
    listItem = document.createElement("li");
    listItem.innerHTML = value;
    Ingredients.appendChild(listItem);
  }

  //! measure  
  const Measures = document.createElement('ul');
  Measures.innerHTML = 'Measure';
  Measures.className = 'measure-title';
  // IngredientsMeasures.appendChild(Measures)
  // mealDiv.appendChild(IngredientsMeasures);
  mealDiv.appendChild(Measures);
  
  const getMeasures = Object.keys(Meal)
    .filter(function (measure) {
      return measure.indexOf("strMeasure") == 0;
    })
    .reduce(function (measures, measure) {
      if (Meal[measure] != null) {
        measures[measure] = Meal[measure];
      }
      return measures;
    }, {});

  for (let key in getMeasures) {
    let value = getMeasures[key];
    listItem = document.createElement("li");
    listItem.innerHTML = value;
    Measures.appendChild(listItem);
  }
  
  //!description
  // const decsriptonPara = document.createElement('p');
  // decsriptonPara.innerHTML = Meal.strInstructions;
  // mealDiv.appendChild(decsriptonPara)

  //! youtube link  
  const youtubeLink = document.createElement('a');
  youtubeLink.href = Meal.strYoutube
  youtubeLink.innerHTML = "See more on Youtube";
  mealDiv.appendChild(youtubeLink);
};
