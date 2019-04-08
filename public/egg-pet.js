const DATA = {
  pet: null,
};

function backButton() {
  window.location.replace("/pets.html");
}


function deleteButton() {
  const petId = location.search.split("=")[1];
  fetch(`/pets/${petId}`, {
      method: "DELETE"
    })
    .then(() => {
      window.location.replace("/pets.html");
    })
    .catch(err => console.error(err));
  console.log("Deleting pet");
}

function warmButton() {
  console.log("Warming pet");
  sentenceGenerator(WARM);
  getClicks();
}

function talkButton() {
  sentenceGenerator(TALK);
}

function sleepButton() {
  sentenceGenerator(SENTENCES[DATA.pet.name].sleep);
}

function playButton() {
  sentenceGenerator(SENTENCES[DATA.pet.name].play);
}

function feedButton() {
  sentenceGenerator(SENTENCES[DATA.pet.name].feed);
}

function hatchButton() {
  const petId = location.search.split("=")[1];
  fetch(`/pets/${petId}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        name: $("input.name:checked").val(),
        state: "pet"
      })
    })
    .then(fetchPet)
    .catch(err => console.error(err));
  console.log("Hatching pet");
}


function sentenceGenerator(sentences) {
  $(".sentence").empty();
  let randomNumber = Math.floor(Math.random() * sentences.length);
  document.getElementById("sentence-display").innerHTML = sentences[randomNumber];
}

//controls when the hatch button becomes visible
function getClicks() {
  var warm = document.getElementById("warm");

  warm.onclick = function () {
    $("#hatch").removeClass("hidden");
  };
}

function displayPet(pet) {
  let src = "/dinoegg.png";
  if (pet.state === "pet") {
    src = `/dino-${pet.name.toLowerCase()}.png`;
  }
  return `
    <img src="${src}" />
  `;
}

function displayName(pet) {
  let name = "Egg";
  if (pet.state === "pet") {
    name = `${pet.name}`;
  }
  return `${name}`;
}

function displayButtons(pet) {
  let html;
  if (pet.state === "egg") {
    html = `<button id="warm" class="warm button" type="button">Warm up</button>
    <button class="talk button" type="button">Talk to</button>
    <button id="hatch" class="hidden hatch button" type="button">Hatch</button>
    <button class="delete button" type="button">Delete</button>`;
  } else {
    html = `<button class="sleep button" type="button">Sleep</button>
    <button class="play button" type="button">Play</button>
    <button class="feed button" type="button">Feed</button>
    <button class="delete button" type="button">Delete</button>`;
  }
  return html;
}

function fetchPet() {
  const petId = location.search.split("=")[1];
  fetch(`/pets/${petId}`)
    .then(res => res.json())
    .then(pet => {
      $(".Name").html(displayName(pet));
      $(".pet.image").html(displayPet(pet));
      $(".buttons").html(displayButtons(pet));
      DATA.pet = pet;
    })
    .catch(e => console.error(e));
}

function listen() {
  $(".buttons").on("click", ".warm", warmButton);
  $(".buttons").on("click", ".talk", talkButton);
  $(".buttons").on("click", ".sleep", sleepButton);
  $(".buttons").on("click", ".feed", feedButton);
  $(".buttons").on("click", ".play", playButton);
  $(".buttons").on("click", ".hatch", hatchButton);
  $(".buttons").on("click", ".delete", deleteButton);
  $(".back-button").on("click", ".back", backButton);
}

function eggInteraction() {
  fetchPet();
  listen();
}

$(eggInteraction);