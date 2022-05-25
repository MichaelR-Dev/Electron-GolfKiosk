const video = document.createElement("video");
const canvasElement = document.getElementById("qr-canvas");
const canvas = canvasElement.getContext("2d");

const qrResult = document.getElementById("qr-result");
const outputData = document.getElementById("outputData");

let scanning = false;
let newTab = window;

if(navigator.mediaDevices.getUserMedia){
  navigator.mediaDevices
  .getUserMedia({ video: {                 
    width: { ideal: 800, max: 800 },
    height: { ideal: 450, max: 450 },
    facingMode: "environment" } })
  .then(function(stream) {
    scanning = true;
    video.setAttribute("playsinline", true); // required to tell iOS safari we don't want fullscreen
    video.srcObject = stream;
    video.play();
    tick();
    scan();
  });
}

qrcode.callback = (res) => {
  if (res) {
    outputData.innerText = res;
    console.log(res);
    scanning = true;

    /*if(newTab.location != ""){
      newTab.open(res, "_self");
    }*/

    newScan();
  }
};

function newScan(){
  navigator.mediaDevices
  .getUserMedia({ video: {                 
    width: { ideal: 800, max: 800 },
    height: { ideal: 450, max: 450 },
    facingMode: "environment" } })
  .then(function(stream) {
    scanning = true;
    video.setAttribute("playsinline", true); // required to tell iOS safari we don't want fullscreen
    //video.srcObject = stream;
    video.play();
    tick();
    scan();
  });
}

function tick() {
    canvasElement.height = video.videoHeight;
    canvasElement.width = video.videoWidth;
    canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);
  
    scanning && requestAnimationFrame(tick);
}

function scan() {
    try {
      qrcode.decode();
    } catch (e) {
      setTimeout(scan, 300);
    }
}