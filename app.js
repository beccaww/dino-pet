var MOCK_PET = {
    "pet": [
        {
            "id": "1111111",
            "name": "t-rex",
            "state": "egg",
        }
    ]
};

function getPet (callbackFn) {
	setTimeout(function(){ callbackFn(MOCK_PET)}, 1);
}

function displayPet() {
    //displays the correct state of pet, whether egg or fully grown
    if (MOCK_PET.pet.state === "egg") {
        //display egg page
    } else if (MOCK_PET.pet.state === "pet") {
        //display pet page 
    }
}

