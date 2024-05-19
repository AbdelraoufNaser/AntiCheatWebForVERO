// const video = document.getElementById("video");
let multiFaceStatus = document.getElementById("multiFaceStatus");

var manyFacesCount = 0;
// var flagFace = false;
// const resetTimer = 5;
// var time = resetTimer;

Promise.all([
    faceapi.nets.ssdMobilenetv1.loadFromUri("/models"),
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
            .detectAllFaces(video)

        if (detections[0]) {
            // flagFace = true;
            multiFaceStatus.textContent = detections.length;
            if(detections.length>1){
                manyFacesCount++;
            }
        }
        else{
            // flagFace = false;
            multiFaceStatus.textContent = "Please position your face correctly!";
        }
        // if(manyFacesCount>5){
        //     alert('More than one face appeared many times!');
        //     window.location.href = "failed.html";
        // }
    }, 500);
});