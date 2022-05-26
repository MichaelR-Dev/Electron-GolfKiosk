window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
    

    let activeTab = document.getElementById("activeTab");
    let menuOptions = document.getElementsByClassName("menuOption");
    let loginType;
    
    for(element of menuOptions){
        element.addEventListener('click', (evt)=>{
            if(evt.target.getAttribute('name') != 'quit' && evt.target.getAttribute('name') != 'help'){
                activeTab.id = "";
                document.getElementById(activeTab.getAttribute('name').toString()).style.display = 'none';

                activeTab = evt.target;
                document.getElementById(evt.target.getAttribute('name').toString()).style.display = 'flex';
                evt.target.id = "activeTab";
                console.log("Event: Changed Active Tab for Element ->" + {"Element": evt.target});
            }else if(evt.target.getAttribute('name') == 'help'){
                
            }else if(evt.target.getAttribute('name') == 'quit'){
                PromptAdmin();
            }
        })
    }

    document.getElementById("quitButton").addEventListener('click', evt=>{
        loginType = evt.target.getAttribute('loginType');
    })

    document.getElementById("AdminClose").addEventListener('click', (evt)=>{
        CloseAdmin();
    })

    document.getElementById("AdminConfirm").addEventListener('click', (evt)=>{
        let authPass = document.getElementById("passwordField").value + "SaltShaker559";
        AdminAuthenticate(loginType, authPass);
    })

    let iframe = document.querySelector('iframe').contentDocument;

    /*iframe.contentWindow.window.addEventListener('DOMContentLoaded', evt=>{
        iframe.document.getElementsByClassName('jss6')[0].remove();
    })*/

    /*var video = document.querySelector("#videoElement");

    if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({
            video: {
                width: { ideal: 720, max: 720 },
                height: { ideal: 405, max: 405 },
                facingMode: "user"
              }
        })
    .then(function (stream) {
      video.srcObject = stream;

      let videoEl = document.querySelector("video");

      videoEl.style.width = stream.getTracks()[0].getCapabilities().width.toString() + "px";
      videoEl.style.height = stream.getTracks()[0].getCapabilities().height.toString() + "px";
      
      videoEl.style.cssText += "border: 2px #000000 solid;" 
    })
    .catch(function (err0r) {
      console.log("Something went wrong!");
    });*/

    UpdateWeather();
    setInterval(UpdateWeather, 5000);


});

function UpdateWeather(){

    fetch("https://api.openweathermap.org/data/2.5/weather?lat=49.147548&lon=-122.801827&appid=412ccb1ca083f5d02ed2a39dfa4699b4&units=metric")  
    .then(response => response.json())
    .then(data => {
        let els = document.getElementsByClassName("weatherOutput");
        
        for(var i=0; i<els.length; i++){
            els[i].getElementsByTagName('p')[0].textContent = `${GetDay()}, ${GetMonth()} ${String(new Date().getDate()).padStart(2, '0')} | ${GetTime()} | ${data.weather[0].description} | Temperature - ${parseInt(data.main.temp)}C | Wind - ${data.wind.speed} KM ${GetWindDir(data.wind.deg)}`.toUpperCase();
        }
    })
    .catch(err => console.log(err));
}

function GetDay(){
    switch(new Date().getDay()){
        case 0:
            return "Sun";
        case 1:
            return "Mon";
        case 2:
            return "Tue";
        case 3:
            return "Wed";
        case 4:
            return "Thur";
        case 5:
            return "Fri";
        case 6:
            return "Sat";
        default:
            return null;
    }
}

function GetMonth(){
    switch(new Date().getMonth()){
        case 0:
            return "Jan";
        case 1:
            return "Feb";
        case 2:
            return "Mar";
        case 3:
            return "Apr";
        case 4:
            return "May";
        case 5:
            return "Jun";
        case 6:
            return "Jul";
        case 7:
            return "Aug";  
        case 8:
            return "Sep";
        case 9:
            return "Oct";
        case 10:
            return "Nov";
        case 11:
            return "Dec"; 
        default:
            return null;
    } 
}

function GetTime(){
    let hour;
    let ampm;
    if(new Date().getHours() < 12){
        hour = new Date().getHours();
        ampm = "AM"
    }else{
        hour = new Date().getHours() - 12;
        ampm = "PM"
    }

    return `${String(hour).padStart(2, '0')}:${String(new Date().getMinutes()).padStart(2, '0')} ${ampm}`
}

function GetWindDir(direction){

    switch(true){
        case (direction == 0):
            return `N ${direction}°`;
        case (direction < 45):
            return `NNE ${direction}°`;
        case (direction == 45):
            return `NE ${direction}°`;
        case (direction < 90):
            return `ENE ${direction}°`;
        case (direction == 90):
            return `E ${direction}°`;
        case (direction < 135):
            return `ESE ${direction}°`;
        case (direction == 135):
            return `SE ${direction}°`;
        case (direction < 180):
            return `SSE ${direction}°`;
        case (direction == 180):
            return `S ${direction}°`;
        case (direction < 225):
            return `SSW ${direction}°`;
        case (direction == 225):
            return `SW ${direction}°`;
        case (direction < 270):
            return `WSW ${direction}°`;
        case (direction == 270):
            return `W ${direction}°`;
        case (direction < 315):
            return `WNW ${direction}°`;
        case (direction == 315):
            return `NW ${direction}°`;
        case (direction < 360):
            return `NNW ${direction}°`;
        case (direction == 360):
            return `N ${direction}°`;
        default:
            return `N/A`;
    }
}

function PromptAdmin(){
    document.getElementById("AdminPrompt").style.display = "flex";
}

function CloseAdmin(){
    document.getElementById("passwordField").value = "";
    document.getElementById("AdminPrompt").style.display = "none";
}

function AdminAuthenticate(LoginType, authPass){
    if(LoginType == "Quit" && authPass == "PassSaltShaker559"){
        window.close();
    }else{
        CloseAdmin();
    }
}