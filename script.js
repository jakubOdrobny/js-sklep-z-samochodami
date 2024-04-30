// Lista aut
const carsData = [
  {
    brand: "BMW",
    model: "X6",
    year: 2017,
    price: 150000,
    image: "image/bmwx6.jpg",
    power: "230 KM",
    mileage: "320 000 km",
  },

  {
    brand: "VW",
    model: "Passat",
    year: 2018,
    price: 80000,
    image: "image/vwpassat.jpg",
    power: "180 KM",
    mileage: "105000 km",
  },

  {
    brand: "Citroen",
    model: "C3",
    year: 2014,
    price: 28000,
    image: "image/citroenc3.jpg",
    power: "80 KM",
    mileage: "126 000 km",
  },

  {
    brand: "Peugeot",
    model: "308",
    year: 2020,
    price: 72000,
    image: "image/peugeot308.jpg",
    power: "130 KM",
    mileage: "88 000 km",
  },

  {
    brand: "Opel",
    model: "Mokka",
    year: 2015,
    price: 55000,
    image: "image/opelmokka.jpg",
    power: "160 KM",
    mileage: "79 000 km",
  },

  {
    brand: "Opel",
    model: "Astra",
    year: 2008,
    price: 8000,
    image: "image/opelastra.jpg",
    power: "110 KM",
    mileage: "285 000 km",
  },

  {
    brand: "Peugeot",
    model: "308SW",
    year: 2005,
    price: 7500,
    image: "image/peugeot308sw.jpg",
    power: "105 KM",
    mileage: "265 000 km",
  },

  {
    brand: "Audi",
    model: "A6",
    year: 2019,
    price: 145000,
    image: "image/audia6.jpg",
    power: "250 KM",
    mileage: "145 000 km",
  },

  {
    brand: "Renault",
    model: "Kadjar",
    year: 2015,
    price: 54000,
    image: "image/renaultkadjar.jpg",
    power: "130 KM",
    mileage: "142 000 km",
  },

  {
    brand: "Ford",
    model: "Focus",
    year: 2009,
    price: 9000,
    image: "image/fordfocus.jpg",
    power: "115 KM",
    mileage: "315 000 km",
  },

  {
    brand: "Bmw",
    model: "seria 1",
    year: 2012,
    price: 32000,
    image: "image/bmwseria1.jpg",
    power: "120 KM",
    mileage: "238 000 km",
  },
];

// Akcesoria
const accessoriesData = [
  { id: 1, name: "Podgrzewane fotele", price: 800 },
  { id: 2, name: "Nawigacja GPS", price: 2700 },
  { id: 3, name: "Aluminiowe felgi", price: 1500 },
  { id: 4, name: "Android Car", price: 1800 },
  { id: 5, name: "Podgrzewanie przedniej szyby", price: 1500 },
  { id: 6, name: "Bagażnik rowerowy", price: 1200 },
  { id: 7, name: "Instalacja gazowa", price: 4500 },
];

// Funkcja generująca listę samochodów
function generateCarList() {
  const carListDiv = document.getElementById("car-list");

  carListDiv.innerHTML = "";

  carsData.forEach((car, index) => {
    const carDiv = document.createElement("div");
    carDiv.innerHTML = `
      <img src="${car.image}" alt="${car.brand} ${car.model}">
      <p>Marka: ${car.brand}</p>
      <p>Model: ${car.model}</p>
      <p>Rok produkcji: ${car.year}</p>
      <p>Moc silnika: ${car.power}</p>
      <p>Przebieg: ${car.mileage}</p>
      <p>Cena: ${car.price} PLN</p>
      <button onclick="showOrderForm(${index})">Kup teraz</button>
    `;
    carListDiv.appendChild(carDiv);
  });
}
generateCarList();

// Funkcja wyświetlająca formularz zamówienia
function showOrderForm(index) {
  const selectedCar = carsData[index];
  const orderFormContainerDiv = document.getElementById("order-form-container");
  const carListDiv = document.getElementById("car-list");

  orderFormContainerDiv.innerHTML = `
    <div id="order-form" data-car-index="${index}">
      <h2>Formularz zamówienia</h2>
      <p>Wybrany samochód:</p>
      <img src="${selectedCar.image}" alt="${selectedCar.brand} ${
    selectedCar.model
  }">
      <p>Marka: ${selectedCar.brand}</p>
      <p>Model: ${selectedCar.model}</p>
      <p>Rok produkcji: ${selectedCar.year}</p>
      <p>Cena: ${selectedCar.price} PLN</p>
      
      <form onsubmit="submitOrderForm(event, ${index})">
        <label for="finance">Rodzaj finansowania:</label><br>
        <input type="radio" id="finance" name="finance" value="leasing" required> Leasing
        <input type="radio" id="finance" name="finance" value="gotówka"> Gotówka<br>
        <label for="name">Imię i nazwisko:</label><br>
        <input type="text" id="name" name="name" required><br>
        <label for="delivery-date">Data dostawy:</label><br>
        <select id="delivery-date" name="delivery-date"></select><br>
        <label for="accessories">Wybór akcesoriów:</label><br>
        ${generateAccessoriesCheckboxes()}        
        <button type="submit">Zakup</button>
        <button type="button" onclick="hideOrderForm()">Powrót</button>
        
      </form>
    </div>
  `;
  populateDeliveryDate();

  orderFormContainerDiv.style.display = "block";
  carListDiv.style.display = "none";
}

// Funkcja ukrywająca formularz zamówienia i wyświetlająca listę samochodów
function hideOrderForm() {
  const carListDiv = document.getElementById("car-list");
  carListDiv.style.display = "flex";
  generateCarList();
  document.getElementById("order-form-container").style.display = "none";
}
// Funkcja ukrywająca podsumowanie i wyświetlająca formularz zamówien
function purchaseOrderForm() {
  document.getElementById("purchase-summary").style.display = "none";
  document.getElementById("order-form").style.display = "block";
}

// Funkcja obsługująca zmianę wyboru akcesoriów
function handleAccessoryChange() {
  const form = document.getElementById("order-form");
  const formData = new FormData(form);
  const carIndex = parseInt(form.getAttribute("data-car-index"));
  const selectedCar = carsData[carIndex];
  const selectedAccessories = getSelectedAccessories(
    formData.getAll("accessories")
  );
  const accessoriesPrice = calculateAccessoriesPrice(selectedAccessories);
  const totalPrice = selectedCar.price + accessoriesPrice;

  const totalPriceElement = document.getElementById("total-price");
  totalPriceElement.textContent = `Łączna cena: ${totalPrice} PLN`;

  const accessoriesPriceElement = document.getElementById("accessories-price");
  accessoriesPriceElement.textContent = `Cena akcesoriów: ${accessoriesPrice} PLN`;
}

// Funkcja obsługująca przesłanie formularza zamówienia
function submitOrderForm(event, carIndex) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const selectedCar = carsData[carIndex];
  const selectedAccessories = getSelectedAccessories(
    formData.getAll("accessories")
  );
  const accessoriesPrice = calculateAccessoriesPrice(selectedAccessories);
  const totalPrice = selectedCar.price + accessoriesPrice;

  const name = formData.get("name");
  if (!isValidName(name)) {
    alert(
      "Imię i nazwisko powinno składać się z dwóch wyrazów oddzielonych jedną spacją."
    );
    return;
  }

  const purchaseSummaryDiv = document.getElementById("purchase-summary");
  purchaseSummaryDiv.innerHTML = `
    <h2>Podsumowanie zakupu</h2>
    <p>Dziękujemy za zakup samochodu!</p>
    <p>Wybrany samochód:</p>
    <img src="${selectedCar.image}" alt="${selectedCar.brand} ${
    selectedCar.model
  }">
    <p>Marka: ${selectedCar.brand}</p>
    <p>Model: ${selectedCar.model}</p>
    <p>Rok produkcji: ${selectedCar.year}</p>
    <p>Cena samochodu: ${selectedCar.price} PLN</p>
    <p>Wybrane akcesoria:</p>
    <ul>
      ${selectedAccessories
        .map(
          (accessory) => `<li>${accessory.name} - ${accessory.price} PLN</li>`
        )
        .join("")}
    </ul>
    <p>Data dostawy: ${formData.get("delivery-date")}</p>
    <p id="allprise">Łączna cena: ${totalPrice} PLN</p>
    <button type="button" onclick="purchaseOrderForm()">Powrót</button>
  `;
  purchaseSummaryDiv.style.display = "block";
  document.getElementById("order-form").style.display = "none";
}

// Funkcja sprawdzająca poprawność imienia i nazwiska
function isValidName(name) {
  const nameParts = name.trim().split(" ");
  return nameParts.length === 2;
}

// Funkcja generująca checkboxy dla akcesoriów
function generateAccessoriesCheckboxes() {
  let accessoriesCheckboxes = "";
  accessoriesData.forEach((accessory) => {
    accessoriesCheckboxes += `
      <input type="checkbox" id="accessory-${accessory.id}" name="accessories" value="${accessory.id}" onchange="handleAccessoryChange()">
      <label for="accessory-${accessory.id}">${accessory.name} - ${accessory.price} PLN</label><br>
    `;
  });
  return accessoriesCheckboxes;
}

// Funkcja generująca rozwijaną listę dat dostawy
function populateDeliveryDate() {
  const deliveryDateSelect = document.getElementById("delivery-date");
  const today = new Date();
  for (let i = 1; i <= 14; i++) {
    const date = new Date(today.getTime() + (i + 14) * 24 * 60 * 60 * 1000);
    const dateString = date.toISOString().split("T")[0];
    deliveryDateSelect.innerHTML += `<option value="${dateString}">${dateString}</option>`;
  }
}

// Funkcja filtrująca wybrane akcesoria na podstawie ich ID
function getSelectedAccessories(selectedIds) {
  return accessoriesData.filter((accessory) =>
    selectedIds.includes(accessory.id.toString())
  );
}

// Funkcja obliczająca łączną cenę akcesoriów
function calculateAccessoriesPrice(accessories) {
  return accessories.reduce((total, accessory) => total + accessory.price, 0);
}
