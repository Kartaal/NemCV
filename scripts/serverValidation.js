/*
    Script for validating form data via https://syst-api.azurewebsites.net/cv
*/

//Returns an elment based on ID
function getElement(identity){ 
    return document.getElementById(identity)
}

//Edits the inline value of the element (Using getElment("ElementID"))
function apply(identity, v){ 
    identity.innerHTML = v
}

//Adds a new Work molecule to the Actual CV
// Parameters: Title, Start date, end date, 
function newActualWorkMolecule(json, count){

    const actualContainer = document.createElement("div");
    actualContainer.classList.add("ac-workplace-"+count);


    const titleLabel = document.createElement("label");
    //titleLabel.setAttribute("for");
    titleLabel.textContent = "Job";

    const titleParagraph = document.createElement("p");
    titleParagraph.innerHTML = json.title;

    const firmParagraph = document.createElement("p");
    firmParagraph.innerHTML = json.name;
    
    const timeParagraph = document.createElement("p");
    timeParagraph.innerHTML = json.from + " - " + json.to;
    
    actualContainer.appendChild(titleLabel);
    actualContainer.appendChild(titleParagraph);
    actualContainer.appendChild(firmParagraph);
    actualContainer.appendChild(timeParagraph);
    
    getElement("m-work").appendChild(actualContainer);
}

function newActualEduMolecule(json, count){

    //THERE IS A BIG IN THIS PART OF THE PROGRAM
    //IF THERE IS NO ACUTAL JOB MOLECULES, IT FAILS TO EXECUTE.
    //UNSURE WHY THO.
    const actualContainer = document.createElement("div");
    actualContainer.classList.add("ac-education-"+count);


    const titleLabel = document.createElement("label");
    //titleLabel.setAttribute("for");
    titleLabel.textContent = "Education";

    const titleParagraph = document.createElement("p");
    titleParagraph.innerHTML = json.title;

    const eduParagraph = document.createElement("p");
    eduParagraph.innerHTML = json.name;
    
    const timeParagraph = document.createElement("p");
    timeParagraph.innerHTML = json.from + " - " + json.to;
    
    actualContainer.appendChild(titleLabel);
    actualContainer.appendChild(titleParagraph);
    actualContainer.appendChild(eduParagraph);
    actualContainer.appendChild(timeParagraph);
    
    getElement("m-edu").appendChild(actualContainer);
}

function newActualSector(json, count){
    const actualContainer = document.createElement("div");
    actualContainer.classList.add("ac-sector-"+count);

    const titleLabel = document.createElement("label");
    //titleLabel.setAttribute("for");
    titleLabel.textContent = "Sector: " + json;
    actualContainer.appendChild(titleLabel);
    
    getElement("m-sectors").appendChild(actualContainer);

}

//Validates an Image Input value for a valid URL that leads to an image. 
//Returns true if yes.
function checkurl(){
    const linkURL = document.getElementById("image-input").value;
    fetch(linkURL, {
    method: 'get',
    mode: 'cors'
    })
    .then(function(response){
        if(response.ok){
            console.log(response);
            return true
        } else {
            return false
        }
    })
    .catch(error =>     alert("WARNING: There was an issue regarding the URL provided. Please, try an other one.")
    )

}

async function apply_all(json){

    const idFields = ["name-output", "age-output",
        "email-output","city-output", "misc-text-output"]
    const jsonFields = [json.name, json.age,
        json.email, json.city, json.description]

    //Iterates over both arrays. Both arrays are set up so that index[x] in both 
    //arrays refer to the same element. (So they create pairs.)    
    for (let i = 0; i <= idFields.length-1; i++) { 
        apply(getElement(idFields[i]), jsonFields[i])
    }
    //image is in its own, since src and innerHTML is not the same.
    getElement("image-out").src = json.picture;
    
    //const emp = JSON.parse(json.employers);
    //json.employers
    for (let empIndex = 0; empIndex <= json.employers.length-1; empIndex++) {
        console.log(json.employers[empIndex])
        newActualWorkMolecule(json.employers[empIndex], empIndex);
    }
    //json.education
    for (let eduIndex= 0; eduIndex <= json.education.length-1; eduIndex++) {
        console.log(json.education[eduIndex]);
        newActualEduMolecule(json.employers[eduIndex], eduIndex);
    }
    //json.sectors
    for (let secIndex = 0; secIndex <= json.sectors.length-1; secIndex++) {
        console.log(json.sectors[secIndex]);
        newActualSector(json.sectors[secIndex],secIndex);
    }
    console.log("Done.");
}

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

    //Detract 1 because the output container has the same class
    const numOfEduContainers = eduContainers.length-1;

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
    const numOfWorkContainers = workContainers.length-1;


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
    //if(checkurl){
    const response = await fetch("https://syst-api.azurewebsites.net/cv", options);
    console.log(response.ok);
    
    const package = JSON.parse(options.body)
    console.log(package)

    apply_all(package);
//} else {
    //alert("ERROR: Something went wrong.");
//}
}

