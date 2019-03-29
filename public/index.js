function chooseDino(){ 
    if ($('input[type=radio]:checked').val() === 't-rex') {
        displayTrex(); 
      }
      else if  ($('input[type=radio]:checked').val() === 'stego') {
        displayStego(); 
      }
      else if  ($('input[type=radio]:checked').val() === 'pteryl') {
        displayPteryl(); 
      }
      else if ($('input[type=radio]:checked').val() === 'bront'){
        displayBront(); 
      }
}

function displayTrex(){
    console.log("T-rex"); 
}

function displayStego(){
    console.log("Stego"); 
}

function displayPteryl(){
    console.log("Pteryl"); 
}

function displayBront(){
    console.log("Bront"); 
}

function fetchEgg(e) {
  e.preventDefault();
  fetch('/pets', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      name: $('input.name:checked').val(),
      state: 'egg'
    })
  })
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error(err));
}

function choosePet() {
  $('body').on('submit', 'form', fetchEgg);
}

$(choosePet);
