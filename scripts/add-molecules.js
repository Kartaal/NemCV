/*
    JavaScript for adding more molecules to education and work
      when corresponding button is pressed.
*/

//Variables for keeping track of how many education and work molecules exist
var eduMoleculeCount = 1;
var workMoleculeCount = 1;

function addNewEduMolecule() {
    //Up the count of molecules
    eduMoleculeCount++;
    //Keeping track of the add education button
    const addButton = document.getElementById("a-tab-add-edu");

    console.log("Edit button " + addButton);

    //Make a new container molecule, with attributes
    const eduSingleContainer = document.createElement("div");
    eduSingleContainer.classList.add("m-tab-edu-single");

    //Make a new label atom for education (line), with attributes and content
    const lineLabel = document.createElement("label");
    lineLabel.setAttribute("for", "edu-line-"+eduMoleculeCount);
    lineLabel.textContent = "Studieretning";

    //Make a new input atom for education (line), with attributes
    const lineInput = document.createElement("input");
    lineInput.setAttribute("type", "text");
    lineInput.classList.add("a-tab-edu-single-line");
    lineInput.setAttribute("name", "edu-line-"+eduMoleculeCount);
    lineInput.setAttribute("placeholder", "Din studieretning");

    //Text node for reuse to ensure that created atoms look exactly like the static HTML variant
    let textNode = document.createTextNode(" ");

    //Append the line atoms to the container molecule
    eduSingleContainer.appendChild(lineLabel);
    eduSingleContainer.appendChild(textNode);

    textNode = document.createTextNode(" ");

    eduSingleContainer.appendChild(lineInput);
    eduSingleContainer.appendChild(textNode);

    //Make a new label atom for school, with attributes and content
    const schoolLabel = document.createElement("label");
    schoolLabel.setAttribute("for", "edu-school-"+eduMoleculeCount);
    schoolLabel.textContent = "Skole";

    //Make a new input atom for school, with attributes
    const schoolInput = document.createElement("input");
    schoolInput.setAttribute("type", "text");
    schoolInput.classList.add("a-tab-edu-single-school");
    schoolInput.setAttribute("name", "edu-school-"+eduMoleculeCount);
    schoolInput.setAttribute("placeholder", "Institutionen du tog uddannelsen på");

    textNode = document.createTextNode(" ");
    //Append the school atoms to the container molecule
    eduSingleContainer.appendChild(schoolLabel);
    eduSingleContainer.appendChild(textNode);

    textNode = document.createTextNode(" ");

    eduSingleContainer.appendChild(schoolInput);
    eduSingleContainer.appendChild(textNode);

    //Make a new label atom for start date, with attributes and content
    const startLabel = document.createElement("label");
    startLabel.setAttribute("for", "edu-start-"+eduMoleculeCount);
    startLabel.textContent = "Start dato";

    //Make a new input atom for start date, with attributes
    const startInput = document.createElement("input");
    startInput.setAttribute("type", "date");
    startInput.classList.add("a-tab-edu-single-start-date");
    startInput.setAttribute("name", "edu-start-"+eduMoleculeCount);
    startInput.setAttribute("placeholder", "Hvornår du startede denne uddannelse");

    textNode = document.createTextNode(" ");
    //Append the start date atoms to the container molecule
    eduSingleContainer.appendChild(startLabel);
    eduSingleContainer.appendChild(textNode);

    textNode = document.createTextNode(" ");

    eduSingleContainer.appendChild(startInput);
    eduSingleContainer.appendChild(textNode);

    //Make a new label atom for end date, with attributes and content
    const endLabel = document.createElement("label");
    endLabel.setAttribute("for", "edu-end-"+eduMoleculeCount);
    endLabel.textContent = "Slut dato";

    //Make a new input atom for end date, with attributes
    const endInput = document.createElement("input");
    endInput.setAttribute("type", "date");
    endInput.classList.add("a-tab-edu-single-end-date");
    endInput.setAttribute("name", "edu-end-"+eduMoleculeCount);
    endInput.setAttribute("placeholder", "Hvornår du stoppede denne uddannelse");

    textNode = document.createTextNode(" ");
    //Append the end date atoms to the container molecule
    eduSingleContainer.appendChild(endLabel);
    eduSingleContainer.appendChild(textNode);

    textNode = document.createTextNode(" ");
    eduSingleContainer.appendChild(endInput);
    eduSingleContainer.appendChild(textNode);

    addButton.parentElement.insertBefore(eduSingleContainer, addButton);
}


function addNewWorkMolecule() {
    //Up the count of molecules
    workMoleculeCount++;
    //Keeping track of the add work button
    const addButton = document.getElementById("a-tab-add-work");

    console.log("Work button: " + addButton);

    //Make a new container molecule, with attributes
    const workSingleContainer = document.createElement("div");
    workSingleContainer.classList.add("m-tab-work-single");

    //Make a new label atom for title, with attributes and content
    const titleLabel = document.createElement("label");
    titleLabel.setAttribute("for", "work-title-"+workMoleculeCount);
    titleLabel.textContent = "Titel";

    //Make a new input atom for title, with attributes
    const titleInput = document.createElement("input");
    titleInput.setAttribute("type", "text");
    titleInput.classList.add("a-tab-work-single-title");
    titleInput.setAttribute("name", "work-title-"+workMoleculeCount);
    titleInput.setAttribute("placeholder", "Din jobtitel fra dette arbejde");

    //Text node for reuse to ensure that created atoms look exactly like the static HTML variant
    let textNode = document.createTextNode(" ");

    //Append the title atoms to the container molecule
    workSingleContainer.appendChild(titleLabel);
    workSingleContainer.appendChild(textNode);

    textNode = document.createTextNode(" ");

    workSingleContainer.appendChild(titleInput);
    workSingleContainer.appendChild(textNode);

    //Make a new label atom for company, with attributes and content
    const companyLabel = document.createElement("label");
    companyLabel.setAttribute("for", "work-company-"+workMoleculeCount);
    companyLabel.textContent = "Firma";

    //Make a new input atom for company, with attributes
    const companyInput = document.createElement("input");
    companyInput.setAttribute("type", "text");
    companyInput.classList.add("a-tab-work-single-company");
    companyInput.setAttribute("name", "work-company-"+workMoleculeCount);
    companyInput.setAttribute("placeholder", "Din arbejdsgiver fra dette arbejde");

    textNode = document.createTextNode(" ");
    //Append the company atoms to the container molecule
    workSingleContainer.appendChild(companyLabel);
    workSingleContainer.appendChild(textNode);

    textNode = document.createTextNode(" ");

    workSingleContainer.appendChild(companyInput);
    workSingleContainer.appendChild(textNode);

    //Make a new label atom for start date, with attributes and content
    const startLabel = document.createElement("label");
    startLabel.setAttribute("for", "work-start-"+workMoleculeCount);
    startLabel.textContent = "Start dato";

    //Make a new input atom for start date, with attributes
    const startInput = document.createElement("input");
    startInput.setAttribute("type", "date");
    startInput.classList.add("a-tab-work-single-start-date");
    startInput.setAttribute("name", "work-start-"+workMoleculeCount);
    startInput.setAttribute("placeholder", "Hvornår du startede dette arbejde");

    textNode = document.createTextNode(" ");
    //Append the start date atoms to the container molecule
    workSingleContainer.appendChild(startLabel);
    workSingleContainer.appendChild(textNode);

    textNode = document.createTextNode(" ");

    workSingleContainer.appendChild(startInput);
    workSingleContainer.appendChild(textNode);

    //Make a new label atom for end date, with attributes and content
    const endLabel = document.createElement("label");
    endLabel.setAttribute("for", "work-end-"+workMoleculeCount);
    endLabel.textContent = "Slut dato";

    //Make a new input atom for end date, with attributes
    const endInput = document.createElement("input");
    endInput.setAttribute("type", "date");
    endInput.classList.add("a-tab-work-single-end-date");
    endInput.setAttribute("name", "work-end-"+workMoleculeCount);
    endInput.setAttribute("placeholder", "Hvornår du stoppede dette arbejde");

    textNode = document.createTextNode(" ");
    //Append the end date atoms to the container molecule
    workSingleContainer.appendChild(endLabel);
    workSingleContainer.appendChild(textNode);

    textNode = document.createTextNode(" ");
    workSingleContainer.appendChild(endInput);
    workSingleContainer.appendChild(textNode);

    addButton.parentElement.insertBefore(workSingleContainer, addButton);
}
