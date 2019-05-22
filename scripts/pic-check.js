function checkurl(){
    const linkURL = document.getElementById("image-input").value;
    fetch(linkURL, {
    method: 'get',
    mode: 'cors'
    })
    .then(function(response){
        if(response.ok){
            console.log(response);
            document.getElementById("image-out").src = linkURL;
        }
    })
    .catch(error =>     alert("WARNING: There was an issue regarding the URL provided. Please, try an other one."))

}

// Test source: "https://image.shutterstock.com/image-photo/waste-plastic-bottles-other-types-450w-426187984.jpg"