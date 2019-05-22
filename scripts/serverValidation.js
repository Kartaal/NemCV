/*
    Script for validating form data via https://syst-api.azurewebsites.net/cv
*/

async function remoteValidate(event) {
    event.preventDefault();

    //Vars for all the many, many data fields
    const name = document.getElementById("name-input");
    const age = document.getElementById("age-input");
    const email = document.getElementById("email-input");
    const city = document.getElementById("city-input");
    const pictureURL = document.getElementById("image-input");
    const miscText = document.getElementById("misc-text-input");

    //Arrays for the fields that should be sent as array objects
    let employers = new Array(0);
    let education = new Array(0);
    let sectors = new Array(0);

    //Getting all the single education containers to filter and insert into variable as arrays
    const eduContainers = document.getElementsByClassName("m-tab-edu-single");
    const numOfEduContainers = eduContainers.length;

    //Making the JSON and adding them to education
    for(let i = 0 ; i < numOfEduContainers ; i++) {
        let inputs = eduContainers[i].getElementsByTagName("input");

        //if first input has value, add all the associated fields to JSON object
        if(inputs[0].value) {
            //Weird ordering because server requires it in a weird order, I think
            let eduName = inputs[1];
            let title = inputs[0];
            let from = inputs[2];
            let to = inputs[3];

            let edu = {
                'name': eduName.value,
                'title': title.value,
                'from': from.value,
                'to': to.value
            };
            education.push(edu);
        }
    };

    //Getting all the single work containers to filter and insert into variable as arrays
    const workContainers = document.getElementsByClassName("m-tab-work-single");
    const numOfWorkContainers = workContainers.length;

    //Making the JSON and adding them to employers
    for(let i = 0 ; i < numOfWorkContainers ; i++) {
        let inputs = workContainers[i].getElementsByTagName("input");

        //if first input has value, add all the associated fields to JSON object
        if(inputs[0].value) {
            let workName = inputs[1];
            let title = inputs[0];
            let from = inputs[2];
            let to = inputs[3];

            let work = {
                'name': workName.value,
                'title': title.value,
                'from': from.value,
                'to': to.value
            };
            employers.push(work);
        }
    };

    //Putting all the values of checked sectors into variable
    const checkboxes = document.getElementsByClassName("sector");
    for(checkbox of checkboxes) {
        if(checkbox.checked) {
            sectors.push(checkbox.value);
        }
    };

    //Do fetch things below here
    let options = {
        //Use POST method to create a new resource on the server
        method: 'POST',
        //Create the request body for the new resource
        // JSON.stringify to parse JS code to a JSON object
        body: JSON.stringify({
                    'name': name.value,
                    'age': age.value,
                    'email': email.value,
                    'city': city.value,
                    'picture': pictureURL.value,
                    'description': miscText.value,
                    'employers': employers,
                    'education': education,
                    'sectors': sectors
                }),
        //Set the headers for" the fetch request
        headers: {
            //Let the server know that the body is in JSON format
            'content-type': 'application/json'
        }
    };

    const response = await fetch("https://syst-api.azurewebsites.net/cv", options);

    console.log(response.ok);
}
