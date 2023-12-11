import {
  readLocalStorage,
  writeLocalStorage,
  clearLocalStorage,
} from "../../src/storage.js";

const root = document.getElementById("root");

async function fetchPizzas() {
  const response = await fetch("/api/pizza");
  const pizzas = await response.json();
  // waits until the request completes...
  const pizzasJS = JSON.parse(pizzas);

  return pizzasJS;
}

const pizzasJS = await fetchPizzas();

function insertElementTo(element, elementToInsert) {
  element.appendChild(elementToInsert);
}

function createHeader() {
  const header = document.createElement("div");
  header.setAttribute("id", "header");
  header.style.display = "flex";

  const h1 = document.createElement("h1");
  h1.innerText = "Mario's πzza";
  header.appendChild(h1);

  const buttonFlex = document.createElement("div");

  buttonFlex.setAttribute("id", "button-flex");
  header.appendChild(buttonFlex);
  buttonFlex.style.display = "flex";

  const button = document.createElement("a");
  button.innerText = "Your Order!";
  button.setAttribute("href", "/order");
  button.setAttribute("id", "order-button");
  button.style.display = "none";

  const clear = document.createElement("a");
  clear.innerText = "Clear!";
  clear.setAttribute("id", "clear-button");
  header.appendChild(clear);
  clear.style.display = "none";

  buttonFlex.appendChild(clear);
  buttonFlex.appendChild(button);
  header.appendChild(buttonFlex);

  clear.addEventListener("click", (event) => {
    clearLocalStorage();
    document.getElementById("order-button").style.display = "none";
    document.getElementById("clear-button").style.display = "none";
  });

  return header;
}

function createContainer() {
  const container = document.createElement("div");
  container.setAttribute("class", "container");

  const row = document.createElement("div");
  row.setAttribute("class", "row");
  container.appendChild(row);

  return container;
}

function createBackgroundImage() {
  const backgroundImage = document.createElement("img");
  backgroundImage.setAttribute("src", "/static/images/background.jpeg");
  backgroundImage.setAttribute("id", "background-image");

  return backgroundImage;
}

function insertHtmlTree() {
  insertElementTo(root, createHeader());
  insertElementTo(root, createContainer());
  insertElementTo(root, createBackgroundImage());
}

insertHtmlTree();

const row = document.querySelector(".row");
const ordersButton = document.querySelector("#order-button");

function createAllergens(container) {
  const allergens = document.createElement("h6");
  allergens.setAttribute("id", "allergens");
  container.appendChild(allergens);
}

function createIngredients(allIngredients) {
  const ingredients = document.createElement("h6");
  ingredients.setAttribute("id", "ingredients");
  ingredients.innerText = allIngredients;

  return ingredients;
}

function createCard(pizza, nameOfPizza, pizzaPrice, index) {
  if (index === 3) {
    root.insertAdjacentHTML("beforeend", "<br>"); /// ?????
  }

  const pizzaElem = document.createElement("div");
  pizzaElem.setAttribute("class", "pizza");
  pizzaElem.classList.add("col-sd-12");
  pizzaElem.classList.add("col-md-4");
  row.appendChild(pizzaElem);

  const pizzaName = document.createElement("h4");
  pizzaName.setAttribute("id", "pizza-name");
  pizzaName.innerText = nameOfPizza;
  pizzaElem.appendChild(pizzaName);

  const ingredientsString = pizza.ingredients.reduce(
    (string, ingredient, index) => {
      return string + ingredient + "<br>";
    },
    ""
  );

  pizzaElem.insertAdjacentHTML("beforeend", `<h6>${ingredientsString}</h6>`);

  const allergens = pizza.allergens.reduce((string, allergen, index) => {
    if (index === 0) {
      return string + " " + allergen;
    } else {
      return string + "," + " " + allergen;
    }
  }, "");

  pizzaElem.insertAdjacentHTML("beforeend", allergens);

  const price = document.createElement("h4");
  price.setAttribute("id", "price");
  price.innerText = pizzaPrice + "$";
  pizzaElem.appendChild(price);

  const input = document.createElement("input");
  input.setAttribute("id", `input${index + 1}`);
  input.setAttribute("class", "input");
  input.setAttribute("placeholder", "Amount of Pizzas");
  pizzaElem.appendChild(input);

  const button = document.createElement("button");
  button.innerText = "Add to order";
  button.setAttribute("id", index + 1);
  button.setAttribute("class", "add-to-order-button");
  pizzaElem.appendChild(button);

  button.addEventListener("click", (event) => {
    const input = document.querySelector(`#input${pizza.id}`);
    const amount = parseInt(input.value);
    const curr_orders = readLocalStorage();

    if (amount > 0) {
      curr_orders.push({
        pizza_id: pizza.id,
        amount: amount,
      });
      document.getElementById("order-button").style.display = "block";
      document.getElementById("clear-button").style.display = "block";
    }

    writeLocalStorage(curr_orders);
  });

  return pizzaElem;
}

// Generate HTML
fetch("http://127.0.0.1:9001/api/pizza")
  .then((response) => response.json())
  .then((data) => {
    const pizza = JSON.parse(data);
    pizza.pizzas.map((pizza, index) => {
      insertElementTo(row, createCard(pizza, pizza.name, pizza.price, index));
    });
  });
