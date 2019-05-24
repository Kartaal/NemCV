/*
    Script for validating form data via https://syst-api.azurewebsites.net/cv
      and after validation adding the data to out-page where appropriate.
*/

//Returns an element based on ID
function getElement(identity){
    return document.getElementById(identity);
}

//Edits the inline value of the element (Using getElement("ElementID"))
function apply(identity, v) {
    identity.innerHTML = v;
}

//Adds a new Work molecule to the Actual CV
function newActualWorkMolecule(json){

    const actualContainer = document.createElement("div");
    actualContainer.classList.add("m-tab-edu-single");

    const header = document.createElement("h3");
    header.classList.add("a-titles");
    header.innerHTML = "Erhvervserfaring";

    const titleLabel = document.createElement("label");
    titleLabel.textContent = "Titel";

    const titleParagraph = document.createElement("span");
    titleParagraph.innerHTML = json.title;

    const firmLabel = document.createElement("label");
    firmLabel.textContent = "Firma";

    const firmParagraph = document.createElement("span");
    firmParagraph.innerHTML = json.name;

    const timeLabel = document.createElement("label");
    timeLabel.textContent = "Periode";

    if(json.to === "") {
        json.to = "nu";
    }

    const timeParagraph = document.createElement("span");
    timeParagraph.innerHTML = json.from + " - " + json.to;

    //Finally, append the molecule(s)
    actualContainer.appendChild(header);
    actualContainer.appendChild(titleLabel);
    actualContainer.appendChild(titleParagraph);
    actualContainer.appendChild(firmLabel);
    actualContainer.appendChild(firmParagraph);
    actualContainer.appendChild(timeLabel);
    actualContainer.appendChild(timeParagraph);

    getElement("m-work").appendChild(actualContainer);
}

//Adds a new Education molecule to the Actual CV
function newActualEduMolecule(json){

    const actualContainer = document.createElement("div");
    actualContainer.classList.add("m-tab-edu-single");

    const header = document.createElement("h3");
    header.classList.add("a-titles");
    header.innerHTML = "Uddannelse";

    const lineLabel = document.createElement("label");
    lineLabel.textContent = "Studieretning";

    const lineParagraph = document.createElement("span");
    lineParagraph.innerHTML = json.title;

    const eduLabel = document.createElement("label");
    eduLabel.textContent = "Skole";

    const eduParagraph = document.createElement("span");
    eduParagraph.innerHTML = json.name;

    const timeLabel = document.createElement("label");
    timeLabel.textContent = "Periode";

    if(json.to === "") {
        json.to = "nu";
    }

    const timeParagraph = document.createElement("span");
    timeParagraph.innerHTML = json.from + " - " + json.to;

    //Finally append the molecule(s)
    actualContainer.appendChild(header);
    actualContainer.appendChild(lineLabel);
    actualContainer.appendChild(lineParagraph);
    actualContainer.appendChild(eduLabel);
    actualContainer.appendChild(eduParagraph);
    actualContainer.appendChild(timeLabel);
    actualContainer.appendChild(timeParagraph);

    getElement("m-edu").appendChild(actualContainer);
}

function newActualSector(json){
    const actualContainer = document.createElement("span");
    actualContainer.classList.add("a-sector-");
    actualContainer.textContent = json;

    getElement("m-sectors").appendChild(actualContainer);
}

//Sets up the label for sectors, if any were chosen
function setupSectors() {
    const titleLabel = document.createElement("label");
    titleLabel.classList.add("m-sector-title");
    titleLabel.innerHTML = "Brancher";

    const sectorsContainer = getElement("m-sectors");
    sectorsContainer.parentElement.insertBefore(titleLabel, sectorsContainer);
}

//Sets up the <h3> for educations, if any were chosen (currently not used as each education sets up its own h3)
function setupEducations() {
    const titleLabel = document.createElement("h3");
    titleLabel.classList.add("a-titles");
    titleLabel.innerHTML = "Uddannelse";

    const sectorsContainer = getElement("m-edu");
    sectorsContainer.parentElement.insertBefore(titleLabel, sectorsContainer);
}

//Sets up the <h3> for jobs (work), if any were chosen (currently not used as each education sets up its own h3)
function setupJobs() {
    const titleLabel = document.createElement("h3");
    titleLabel.classList.add("a-titles");
    titleLabel.innerHTML = "Erhvervserfaring";

    const sectorsContainer = getElement("m-work");
    sectorsContainer.parentElement.insertBefore(titleLabel, sectorsContainer);
}

// Sets up social links. If any.
function setupSocial(json) {
    for(key of Object.keys(json)) {
        if(json[key] !== "") {
            //const label = document.createElement("label");

            const span = document.createElement("a");
            span.href = json[key];
            span.innerHTML = key;

            //getElement(key+"-out").appendChild(label);
            getElement(key+"-out").appendChild(span);
        }
    }
}

//Swaps so the out page is displayed
function toggleOutPage(){
    const inPage = getElement("in-page");
    const outPage = getElement("out-page");

    inPage.classList.toggle("display-block");
    inPage.classList.toggle("display-none");
    outPage.classList.toggle("display-block");
    outPage.classList.toggle("display-none");

    //Scroll to the top to "mimic" a page load
    window.scrollTo(0, 0);
}

//Validates an Image input value for a valid URL that leads to an image.
//Returns true if it is a valid URL.
function checkurl(){
    const linkURL = getElement("image-input").value;
    fetch(linkURL, {
    method: 'get',
    mode: 'cors'
    })
    .then(function(response){
        if(response.ok){
            return true
        } else {
            return false
        }
    })
    .catch(error =>     alert("WARNING: There was an issue regarding the URL provided. Please, try an other one.")
    )

}

// Sets up 2 arrays, creating pairs of id Strings, and Json object values.
async function apply_all(json){
    const idFields = ["name-out", "age-out",
        "email-out","city-out", "misc-text-out"]
    const jsonFields = [json.name, json.age,
        json.email, json.city, json.description]

    //Iterates over both arrays. and calls apply using the id, and the Json object value for the given pair. (Index i)
    for (let i = 0; i < idFields.length; i++) {
        if(jsonFields[i].value !== "") {
            if(idFields[i] !== "email-out") {
                const span = document.createElement("span");
                span.innerHTML = jsonFields[i];
                getElement(idFields[i]).appendChild(span);
            } else {
                const a = document.createElement("a");
                a.href = jsonFields[i];
                a.innerHTML = jsonFields[i];
                getElement(idFields[i]).appendChild(a);
            }
        }
    }
    //image is in its own, since src and innerHTML is not the same.
    getElement("image-out").src = json.picture;

    /*
        The following three for() statements iterate over the following Json object values:
        employers, education and sectors. Theese three objects refer to array structurs of potential varying sizes.
        Employers and education being the 2 most unpredictable. Sectors is fixed between 0-3.
        Therefore, this method iterates over every single array to bring forth a molecule containing everything the user
        types in on the input side of things, to the output side of things. So that we can input any number of educations or jobs.

        Meanwhile, Sectors do follow the same pattern, it is also an aray structure, but needs special attention, since
        its molecule only contains a single value. Namely the sector.
    */

    //json.employers
    for (let empIndex = 0; empIndex < json.employers.length; empIndex++) {
        newActualWorkMolecule(json.employers[empIndex]);
    }
    //json.education
    for (let eduIndex= 0; eduIndex < json.education.length; eduIndex++) {
        newActualEduMolecule(json.education[eduIndex]);
    }
    //json.sectors
    if(json.sectors.length !== 0){
        setupSectors();
        for (let secIndex = 0; secIndex < json.sectors.length; secIndex++) {
            newActualSector(json.sectors[secIndex]);
        }
    }
}

async function remoteValidate(event) {
    event.preventDefault();

    //Vars for all the many, many data fields
    const name = getElement("name-input");
    const age = getElement("age-input");
    const email = getElement("email-input");
    const city = getElement("city-input");
    const pictureURL = getElement("image-input");
    const miscText = getElement("misc-text-input");

    //JSON for social urls
    const socialURLs = {
        'Facebook': getElement("facebook-input").value,
        'Twitter': getElement("twitter-input").value,
        'LinkedIn': getElement("linkedin-input").value
    }

    //Arrays for the fields that should be sent as array objects
    let employers = new Array(0);
    let education = new Array(0);
    let sectors = new Array(0);

    //Getting all the single education containers to filter and insert into variable as arrays
    //Also, the reason why getElment() isn't used, is because it only works with ID strings.
    const eduContainers = document.getElementsByClassName("m-tab-edu-single");

    //Detract 1 because the output container has the same class
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
        // Create the request body for the new resource
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
        //Set the headers for the fetch request
        headers: {
            //Let the server know that the body is in JSON format
            'content-type': 'application/json'
        }
    };
    let optionsFilled = (name.value !== "" && age.value !== "" &&
                        email.value !== "" && city.value !== "" &&
                        miscText.value !== "") ? true : false;

    // Checks the image url and whether all other required fields  are filled
    //  Displays an error if the check returns false
    if(checkurl && optionsFilled){
        const response = await fetch("https://syst-api.azurewebsites.net/cv", options);

        const package = JSON.parse(options.body)

        apply_all(package);
        setupSocial(socialURLs);

        toggleOutPage();
    } else {
        alert("ERROR: You didn't fill out some basic personal information or the link to your profile image couldn't be verified.");
    }
}
