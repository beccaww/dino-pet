//appends correct name to h1
function petNameGenerator() {

}

//appends correct image to class pet image
function petImageGenerator() {

}


//controls the delete button
function deleteButton() {
  console.log("Deleting pet");
}

//controls the sleep button
function sleepButton() {
  console.log("Sleeping pet");
  sentenceGenerator(); 
}

//controls the play button
function playButton() {
  console.log("Playing pet");
  sentenceGenerator();
}

//controls the feed button
function feedButton() {
  console.log("Feeding pet");
  sentenceGenerator(); 
}

//generates the sentences
function sentenceGenerator() {
  
}

function petInteraction() {
  $('.buttons').on('click', '.sleep', sleepButton);
  $('.buttons').on('click', '.play', playButton)
  $('.buttons').on('click', '.feed', feedButton);
  $('.buttons').on('click', '.delete', deleteButton);

}

$(petInteraction); 