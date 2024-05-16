document.addEventListener("DOMContentLoaded", () => {
  fetchCars();

  const addCarForm = document.getElementById("suggest-car-brand-form");
  addCarForm.addEventListener("submit", () => {
    addCar(addCarForm);
  });

  const editCarForm = document.getElementById("edit-suggestion-form");
  const updateBtn = editCarForm.querySelector("#update-btn");
  updateBtn.addEventListener("click", (event) => {
    updateCar(editCarForm);
  });
  const cancelBtn = editCarForm.querySelector("#cancel-btn");
  cancelBtn.addEventListener("click", (event) => {
    cancelUpdateCar();
  });
});

async function fetchCars() {
  try {
    const response = await fetch("http://localhost:3000/");
    if (!response.ok) {
      throw Error("Fatching error");
    }
    const cars = await response.json();
    const listElement = document.getElementById("list");
    const editForm = document.getElementById("edit");
    editForm.style.display = "none";
    listElement.style.display = cars.length ? "block" : "none";
    display(cars);
  } catch (err) {
    console.error({ message: err.message });
  }
}

function display(cars) {
  const carList = document.querySelector("#car-brand-list");
  cars.forEach((car) => {
    const listItem = document.createElement("li");
    listItem.classList.add("item");

    const info = document.createElement("ul");
    info.classList.add("info");

    if (car.logo) {
      const carImg = document.createElement("img");
      carImg.src = car.logo;
      carImg.width = 75;
      info.appendChild(carImg);
    }

    const carName = document.createElement("li");
    carName.classList.add("name");
    carName.textContent = car.name;

    const buttons = document.createElement("div");
    buttons.classList.add("buttons");

    if (car.description || car.links_on_sources) {
      const detailsBtn = document.createElement("button");
      detailsBtn.classList.add("details-btn");
      detailsBtn.textContent = "Details";
      detailsBtn.addEventListener("click", () => displayDetails(car));
      buttons.appendChild(detailsBtn);
    }

    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-btn");
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", () => displayEdit(car));

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => deleteCar(car._id));

    info.appendChild(carName);

    buttons.appendChild(editBtn);
    buttons.appendChild(deleteBtn);

    listItem.appendChild(info);
    listItem.appendChild(buttons);

    carList.appendChild(listItem);
  });
}

async function addCar(form) {
  const name = form.querySelector("#name").value;
  const logo = form.querySelector("#logo").value;
  const description = form.querySelector("#description").value;
  const links_on_sources = form.querySelector("#links_on_sources").value;
  const quantity = form.querySelector("#quantity").value;

  try {
    const response = await fetch("http://localhost:3000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        logo,
        description,
        links_on_sources,
        quantity,
      }),
    });
    if (!response.ok) {
      throw new Error("Add error");
    }
  } catch (err) {
    console.error({ message: err.message });
  }
}

function displayDetails(car) {
  var description = "";
  var links_on_sources = "";
  var quantity = "";
  if (car.description) {
    description = `Description: ${car.description}`;
  }
  if (car.links_on_sources) {
    links_on_sources = `Links on sources: ${car.links_on_sources}`;
  }
  if (car.quantity) {
    quantity = `Quantity: ${car.quantity}`;
  }
  const message = description + "\n" + links_on_sources + "\n" + quantity;
  alert(message);
}

function displayEdit(car) {
  const editForm = document.getElementById("edit");
  editForm.style.display = "block";
  const form = document.getElementById("edit-suggestion-form");
  form.querySelector("#edit-id").value = car._id;
  form.querySelector("#edit-name").value = car.name;
  form.querySelector("#edit-logo").value = car.logo;
  form.querySelector("#edit-description").value = car.description;
  form.querySelector("#edit-links_on_sources").value = car.links_on_sources;
}

async function updateCar(form) {
  const id = form.querySelector("#edit-id").value;
  const name = form.querySelector("#edit-name").value;
  const logo = form.querySelector("#edit-logo").value;
  const description = form.querySelector("#edit-description").value;
  const links_on_sources = form.querySelector("#edit-links_on_sources").value;

  try {
    const response = await fetch(`http://localhost:3000/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, logo, description, links_on_sources }),
    });
    if (!response.ok) {
      throw new Error("Update error");
    }
    location.reload();
  } catch (error) {
    console.error("Error:", error);
  }
}

function cancelUpdateCar() {
  const editForm = document.getElementById("edit");
  editForm.style.display = "block";
}

async function deleteCar(id) {
  try {
    const response = await fetch(`http://localhost:3000/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Delete error");
    }
    location.reload();
  } catch (error) {
    console.error("Error:", error);
  }
}
