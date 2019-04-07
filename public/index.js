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

  window.location.replace("/pets.html");
  return false;
}

function choosePet() {
  $('body').on('submit', 'form', fetchEgg);

}

$(choosePet);