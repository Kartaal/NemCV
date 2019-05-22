/*
    JavaScript for getting sectors from server, making checkboxes
        and limiting checkbox selection to max 3.
*/

//source: https://www.geeksforgeeks.org/html-dom-input-checkbox-property/
async function loadBranches() {
  const response = await fetch('https://syst-api.azurewebsites.net/sectors');
  const json = await response.json();

  var select = document.getElementById("m-branches");
  for(var i = 0; i < json.length; i++){

    var opt = json[i];
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.name = opt;
    checkbox.value = opt;
    checkbox.onclick = onlyThreeChecked;

    var label = document.createElement("label");
    label.htmlFor = "id";
    label.appendChild(document.createTextNode(opt));

    select.appendChild(checkbox);
    select.appendChild(label);
  }
  return json;
}


function onlyThreeChecked(){
    var checkboxgroup = document.getElementById("m-branches").getElementsByTagName("input");
    console.log(checkboxgroup);
    var total = 0;
    var currentCheckbox = event.srcElement;
    var currentIndex = 0;
    console.log(currentCheckbox);

    for(var i = 0; i < checkboxgroup.length; i++){
      if(checkboxgroup[i].checked){
        total = total +1;
      }
      if(checkboxgroup[i].name === currentCheckbox.name){
        currentIndex = i;
      }
      if(total > 3){
        alert("Det er kun muligt at vælge tre brancher.")
        checkboxgroup[currentIndex].checked = false;
        return false;
      }
    }

}
