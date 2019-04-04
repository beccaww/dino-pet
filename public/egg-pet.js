//controls the delete button
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

//controls the sleep button
function warmButton() {
  console.log("Warming pet");
  sentenceGeneratorWarm();
}

//controls the play button
function talkButton() {
  console.log("Talking to pet");
  sentenceGeneratorTalk();
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

//generates the sentences
function sentenceGeneratorWarm() {
  //console.log("I'm a sentence")
  $(".sentence").empty();
  let randomNumber = Math.floor(Math.random() * WARM.length);
  document.getElementById("sentence-display").innerHTML = WARM[randomNumber];
}

function sentenceGeneratorTalk() {
  //console.log("I'm a sentence")
  $(".sentence").empty();
  let randomNumber = Math.floor(Math.random() * TALK.length);
  document.getElementById("sentence-display").innerHTML = TALK[randomNumber];
}

//counts how many clicks happen
function getClicks() {
  var warm = document.getElementById("warm");
  // var hatch = document.getElementById("hatch");

  warm.onclick = function() {
    $("#hatch").removeClass("hidden");
  };
}

function displayPet(pet) {
  let src = '/dinoegg.png';
  if (pet.state === 'pet') {
    src = `/dino-${pet.name.toLowerCase()}.png`;
  }
  return `
    <img src="${src}" />
  `;
}

function fetchPet() {
  const petId = location.search.split("=")[1];
  fetch(`/pets/${petId}`)
    .then(res => res.json())
    .then(pet => {
      $('.pet.image').html('');
      $('.pet.image').append(displayPet(pet));
    })
    .catch(e => console.error(e));
}

function eggInteraction() {
  fetchPet();
  $(".buttons").on("click", ".warm", warmButton);
  $(".buttons").on("click", ".talk", talkButton);
  $(".buttons").on("click", ".hatch", hatchButton);
  $(".buttons").on("click", ".delete", deleteButton);
  getClicks();
}

$(eggInteraction);
