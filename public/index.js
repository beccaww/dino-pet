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

function fetchEgg() {
    fetch('/egg-pet.html')
}

function choosePet() {
    $('main').on('submit', 'form', fetchEgg);
}

$(choosePet);