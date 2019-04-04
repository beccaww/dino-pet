function backButton() {
  window.location.replace("/pets.html");
}

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
  getClicks();
}

//controls the play button
function talkButton() {
  console.log("Talking to pet");
  sentenceGeneratorTalk();
}

function sleepButton(){
  console.log("Sleeping pet"); 
  sentenceGeneratorSleep(); 
}

function playButton(){
  console.log("Playing pet");
  sentenceGeneratorPlay();
}

function feedButton(){
  console.log("Feeding pet");
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

function sentenceGeneratorSleep(){ 
$(".sentence").empty();
let randomNumber = Math.floor(Math.random() * STEGO[0].sleep.length);
  document.getElementById("sentence-display").innerHTML = TALK[randomNumber];
}

function sentenceGeneratorPlay(){ 
  $(".sentence").empty();
let randomNumber = Math.floor(Math.random() * TREX[0].play.length);
  document.getElementById("sentence-display").innerHTML = TALK[randomNumber];
}

function sentenceGeneratorFeed(){ 
  
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

function displayName(pet){
  let name = 'Egg'; 
  if (pet.state === 'pet') {
    name = `${pet.name}`; 
  };
  return `${name}`
}

function displayButtons(pet) {
  let html; 
  if (pet.state === 'egg') {
    html = `<button id="warm" class="warm button" type="button">Warm up</button>
    <button class="talk button" type="button">Talk to</button>
    <button id="hatch" class="hidden hatch button" type="button">Hatch</button>
    <button class="delete button" type="button">Delete</button>`
  } else {
    html = `<button class="sleep button" type="button">Sleep</button>
    <button class="play button" type="button">Play</button>
    <button class="feed button" type="button">Feed</button>
    <button class="delete button" type="button">Delete</button>`
  };
  return html; 
}

function fetchPet() {
  const petId = location.search.split("=")[1];
  fetch(`/pets/${petId}`)
    .then(res => res.json())
    .then(pet => {
      $('.Name').html(''); 
      $('.Name').append(displayName(pet));
      $('.pet.image').html('');
      $('.pet.image').append(displayPet(pet));
      $('.buttons').html('');
      $('.buttons').append(displayButtons(pet)); 
    })
    .catch(e => console.error(e));
}

function eggInteraction() {
  fetchPet();
  $(".back-button").on("click", ".back", backButton); 
  $(".buttons").on("click", ".warm", warmButton);
  $(".buttons").on("click", ".talk", talkButton);
  $(".buttons").on("click", ".hatch", hatchButton);
  $(".buttons").on("click", ".delete", deleteButton);
  $(".buttons").on("click", ".sleep",  sleepButton);
  $(".buttons").on("click", ".play",  playButton);
  $(".buttons").on("click", ".feed",  feedButton);
}

$(eggInteraction);
