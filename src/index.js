import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/index.css";
document.getElementById('btn-recipt').addEventListener('click', load, true);
document.getElementById('btn-clear').addEventListener('click', clear, true);

function load() {
    var xhr = new XMLHttpRequest();
    var api = "https://www.themealdb.com/api/json/v1/1/random.php";

    xhr.onloadstart = function () {
        document.getElementById("button").innerHTML = "Loading.....";
    }

    xhr.onerror = function () {
        alert("Failed load api");
    };

    xhr.onloadend = function () {
        if (this.responseText !== "") {

            let mealsList = []
            fetch(api)
                .then(e => e.json())
                .then(e => e.meals)
                .then(meals => {
                    meals.forEach(meal => {
                        mealsList.push(meal)
                       
                        let title = document.createElement("h4")
                        title.innerHTML += `
                            <div class="card-body">
                                <div class="column">
                                        <left>
                                            <h1>Name Food: ${meal.strMeal}</h1>
                                            <p>Category Food: ${meal.strCategory}</p>
                                            <p>From: ${meal.strArea}</p>
                                            <p>Instruction: ${meal.strInstructions}</p>
                                            <p>Ingredient: ${meal.strIngredient1},${meal.strIngredient2},${meal.strIngredient3},${meal.strIngredient4},${meal.strIngredient5},${meal.strIngredient6}</p>
                                        </left>
                                    </div>
                                </div>
                            </div>
                        `;
                        let tumb = document.createElement("img")
                        tumb.setAttribute("src", meal.strMealThumb)
                        tumb.setAttribute("width", "1030")
                        tumb.setAttribute("hight", "1030")
                        document.getElementById("result").append(title, tumb);
                        document.getElementById("button").innerHTML = "Done";

                        setTimeout(function () {
                            document.getElementById("button").innerHTML = "Load Lagi";
                        }, 3000);
                    })
                })                    
        }
    };

    xhr.open("GET", api, true);
    xhr.send();
}

function clear() {
    document.getElementById("result").innerHTML = "";
}