const video = document.getElementById("video");
let lipsStatus = document.getElementById("lipsStatus");

var lipsSeparation = 0;
var deltalipsSeparation = 0;
var lipsSeparationCount = 0;
var faceWidth = 0;
// var flagFace = false;
// const resetTimer = 5;
// var time = resetTimer;

Promise.all([
    faceapi.nets.faceLandmark68Net.loadFromUri("../models"),
    faceapi.nets.ssdMobilenetv1.loadFromUri("../models"),
]).then(startVideo);

function startVideo() {
    console.log("Models loaded");
    navigator.getUserMedia({ video: {} },
        (stream) => (video.srcObject = stream),
        (err) => console.error(err)
    );
}

// function myTimer() {
//     if (flagFace) {
//         time--;
//     }
// }

video.addEventListener("play", () => {
    setInterval(async() => {
        const detections = await faceapi
            .detectSingleFace(video)
            .withFaceLandmarks()

        if (detections) {
            // flagFace = true; 
            faceWidth = Math.abs(
                detections.landmarks._positions[2].x -
                detections.landmarks._positions[12].x
            );
            deltalipsSeparation = lipsSeparation;
            lipsSeparation = Math.abs(
                detections.landmarks._positions[63].y -
                detections.landmarks._positions[67].y
            );
            deltalipsSeparation = Math.abs(deltalipsSeparation - lipsSeparation);
            // console.log((deltalipsSeparation / faceWidth) * 300);
            if ((deltalipsSeparation / faceWidth) * 300>2){
                lipsSeparationCount++;
            }
            // 3shan nsha88al el feature
            lipsStatus.textContent = lipsSeparationCount;
        }
        else{
            // flagFace = false;
            lipsStatus.textContent = "Please position your face correctly!";
        }
        // if(lipsSeparationCount>5){
        //     // alert('Lips is moving many times!');
        //     window.location.href = "failed.html";
        // }
    }, 500);
});