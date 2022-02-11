//Grabbing all inputs
var iceCreamName = document.getElementById("iceCreamName");
var iceCreamPrice = document.getElementById("iceCreamPrice");
var description = document.getElementById("description");
var submit = document.getElementById("submit");
var iceCreamDiv = document.getElementById("iceCreamDiv");

//Grabbing input values
submit.addEventListener("click", function (e) {
  e.preventDefault();
  if (iceCreamName.value && iceCreamPrice.value && description.value) {
    var creamToPost = {
      name: iceCreamName.value,
      price: iceCreamPrice.value,
      description: description.value,
    };

    iceCreamName.value = "";
    iceCreamPrice.value = "";
    description.value = "";

    postIceCreamsToDB(creamToPost);
  } else {
    alert("Please enter fill out all boxes");
  }
});

//run the function each time this page is accessed
getIceCreamsFromDB();

function getIceCreamsFromDB() {
  console.log(`STEP 1: GET: /api/iceCreams `);
  fetch("/api/iceCreams")
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      console.log(
        `STEP 4: Getting Data from the STEP 3 response to the Client promise`
      );
      if (data.length > 0) {
        console.log(`Retrieving ${data.length} IceCreams from DB`);
        console.log(data);
      } else {
        console.log(`There are no IceCreams in the DB`);
      }

      appendIceCreamsToDom(data);
    });
}

//Add "POST" iceCreams To Database
function postIceCreamsToDB(iceCream) {
  console.log(`STEP 1: POST: /api/iceCreams `);
  console.log(iceCream);
  fetch("/api/iceCreams", {
    method: "POST",
    body: JSON.stringify({
      name: iceCream.name,
      price: iceCream.price,
      description: iceCream.description,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      console.log(
        `STEP 4: Getting Data from the STEP 3 response to the Client promise`
      );
      appendIceCreamsToDom(data);
      window.location.href = "/";
    });
}

//Edit iceCreams To Database
function editIceCreamsToDB(index) {
  console.log(`STEP 1: PUT: /api/iceCreams/:id `);

  fetch("/api/iceCreams/" + index, {
    method: "PUT",
    body: JSON.stringify({
      price: ".99",
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      console.log(
        `STEP 4: Getting Data from the STEP 3 response to the Client promise`
      );
      appendIceCreamsToDom(data);
      window.location.href = "/";
    });
}

//Delete" iceCreams in Database
function deleteIceCreamsFromDB(index) {
  console.log(`STEP 1: DELETE: /api/iceCreams/:id `);
  fetch("/api/delete/" + index, {
    method: "DELETE",

    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      console.log(
        `STEP 4: Getting Data from the STEP 3 response to the Client promise`
      );
      window.location.href = "/";
    });
}

//Add iceCreams to Dom
function appendIceCreamsToDom(data) {
  if (data.length > 0) {
    iceCreamDiv.innerHTML = "";

    for (let i = 0; i < data.length; i++) {
      var mainDiv = document.createElement("div");
      mainDiv.setAttribute("class", "columns ");
      var div = document.createElement("div");
      div.setAttribute("class", "column has-text-centered ");
      var h51 = document.createElement("h5");
      h51.textContent = "Name: " + data[i].name;
      var h52 = document.createElement("h5");
      h52.textContent = "Price: $" + data[i].price;
      var h53 = document.createElement("h5");
      h53.textContent = "Description: " + data[i].description;
      var deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.setAttribute("class", "button is-danger mr-3");
      deleteBtn.setAttribute("data-value", data[i].id);
      var EditBtn = document.createElement("button");
      EditBtn.textContent = "Make Flavor of Day";
      EditBtn.setAttribute("class", "button is-success");
      EditBtn.setAttribute("data-value", data[i].id);
      var hr = document.createElement("hr");
      mainDiv.appendChild(div);
      div.appendChild(h51);
      div.appendChild(h52);
      div.appendChild(h53);
      div.appendChild(deleteBtn);
      div.appendChild(EditBtn);
      div.appendChild(hr);

      iceCreamDiv.appendChild(div);
    }
  }
}

//delete a iceCream Click
document.body.addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.matches("button") && e.target.matches(".is-danger")) {
    var index = e.target.getAttribute("data-value");
    console.log(index);
    deleteIceCreamsFromDB(index);
  }
});

//edit a iceCream Click
document.body.addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.matches("button") && e.target.matches(".is-success")) {
    var index = e.target.getAttribute("data-value");
    console.log(index);
    editIceCreamsToDB(index);
  }
});
