//controls the delete button
function deleteButton() {
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
  
  //generates the sentences
  function sentenceGeneratorWarm() {
    //console.log("I'm a sentence")
    $('.sentence').empty();
    let randomNumber = Math.floor(Math.random() * (WARM.length)); 
    document.getElementById('sentence-display').innerHTML = WARM[randomNumber]; 
  }
  
  function sentenceGeneratorTalk() {
    //console.log("I'm a sentence")
    $('.sentence').empty(); 
    let randomNumber = Math.floor(Math.random() * (TALK.length)); 
    document.getElementById('sentence-display').innerHTML = TALK[randomNumber];
  }
  
  //counts how many clicks happen
  function getClicks() {
  
  }
  
  function fetchPet() {
    const petId = location.search.split('=')[1];
    console.log('pet id', petId);
  }

  function eggInteraction() {
    fetchPet();
    $('.buttons').on('click', '.warm', warmButton);
    $('.buttons').on('click', '.talk', talkButton)
    $('.buttons').on('click', '.delete', deleteButton);
  
  }
  
  $(eggInteraction); 
