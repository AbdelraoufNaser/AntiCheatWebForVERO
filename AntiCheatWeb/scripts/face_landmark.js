import vision from "./mediapipe_vision_bundle.js";
const { FaceLandmarker, FilesetResolver, DrawingUtils } = vision;
// const demosSection = document.getElementById("demos");
// const imageBlendShapes = document.getElementById("image-blend-shapes");
// const videoBlendShapes = document.getElementById("video-blend-shapes");

let FaceStatus = document.getElementById("face_landmarkStatus");

let faceLandmarker;
let runningMode = "VIDEO";
// let enableWebcamButton;
// let webcamRunning = false;
// const videoWidth = 480;

// Before we can use HandLandmarker class we must wait for it to finish
// loading. Machine Learning models can be large and take a moment to
// get everything needed to run.
async function runDemo() {
  // Read more `CopyWebpackPlugin`, copy wasm set from "https://cdn.skypack.dev/node_modules" to `/wasm`
  const filesetResolver = await FilesetResolver.forVisionTasks(
    "/scripts"
  );
  faceLandmarker = await FaceLandmarker.createFromOptions(filesetResolver, {
    baseOptions: {
      modelAssetPath: `../models/face_landmarker.task`,
      delegate: "GPU"
    },
    outputFaceBlendshapes: true,
    runningMode,
    numFaces: 1
  });
  // demosSection.classList.remove("invisible");
}
runDemo();

/********************************************************************
// Demo 1: Grab a bunch of images from the page and detection them
// upon click.
********************************************************************/

// In this demo, we have put all our clickable images in divs with the
// CSS class 'detectionOnClick'. Lets get all the elements that have
// this class.
// const imageContainers = document.getElementsByClassName("detectOnClick");

// Now let's go through all of these and add a click event listener.
// for (let i = 0; i < imageContainers.length; i++) {
//   // Add event listener to the child element whichis the img element.
//   imageContainers[i].children[0].addEventListener("click", handleClick);
// }

// When an image is clicked, let's detect it and display results!
// async function handleClick(event) {
  // if (!faceLandmarker) {
  //   console.log("Wait for faceLandmarker to load before clicking!");
  //   return;
  // }

  // if (runningMode === "VIDEO") {
  //   runningMode = "IMAGE";
  //   await faceLandmarker.setOptions({ runningMode });
  // }
  // Remove all landmarks drawed before
  // const allCanvas = event.target.parentNode.getElementsByClassName("canvas");
  // for (var i = allCanvas.length - 1; i >= 0; i--) {
  //   const n = allCanvas[i];
  //   n.parentNode.removeChild(n);
  // }

  // We can call faceLandmarker.detect as many times as we like with
  // different image data each time. This returns a promise
  // which we wait to complete and then call a function to
  // print out the results of the prediction.
//   const faceLandmarkerResult = faceLandmarker.detect(event.target);
//   const canvas = document.createElement("canvas");
//   canvas.setAttribute("class", "canvas");
//   canvas.setAttribute("width", event.target.naturalWidth + "px");
//   canvas.setAttribute("height", event.target.naturalHeight + "px");
//   canvas.style.left = "0px";
//   canvas.style.top = "0px";
//   canvas.style.width = `${event.target.width}px`;
//   canvas.style.height = `${event.target.height}px`;

//   event.target.parentNode.appendChild(canvas);
//   const ctx = canvas.getContext("2d");
//   const drawingUtils = new DrawingUtils(ctx);
//   for (const landmarks of faceLandmarkerResult.faceLandmarks) {
//     drawingUtils.drawConnectors(
//       landmarks,
//       FaceLandmarker.FACE_LANDMARKS_TESSELATION,
//       { color: "#C0C0C070", lineWidth: 1 }
//     );
//     drawingUtils.drawConnectors(
//       landmarks,
//       FaceLandmarker.FACE_LANDMARKS_RIGHT_EYE,
//       { color: "#FF3030" }
//     );
//     drawingUtils.drawConnectors(
//       landmarks,
//       FaceLandmarker.FACE_LANDMARKS_RIGHT_EYEBROW,
//       { color: "#FF3030" }
//     );
//     drawingUtils.drawConnectors(
//       landmarks,
//       FaceLandmarker.FACE_LANDMARKS_LEFT_EYE,
//       { color: "#30FF30" }
//     );
//     drawingUtils.drawConnectors(
//       landmarks,
//       FaceLandmarker.FACE_LANDMARKS_LEFT_EYEBROW,
//       { color: "#30FF30" }
//     );
//     drawingUtils.drawConnectors(
//       landmarks,
//       FaceLandmarker.FACE_LANDMARKS_FACE_OVAL,
//       { color: "#E0E0E0" }
//     );
//     drawingUtils.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_LIPS, {
//       color: "#E0E0E0"
//     });
//     drawingUtils.drawConnectors(
//       landmarks,
//       FaceLandmarker.FACE_LANDMARKS_RIGHT_IRIS,
//       { color: "#FF3030" }
//     );
//     drawingUtils.drawConnectors(
//       landmarks,
//       FaceLandmarker.FACE_LANDMARKS_LEFT_IRIS,
//       { color: "#30FF30" }
//     );
//   }
//   drawBlendShapes(imageBlendShapes, faceLandmarkerResult.faceBlendshapes);
// }

/********************************************************************
// Demo 2: Continuously grab image from webcam stream and detect it.
********************************************************************/
// const canvasElement = document.getElementById(
//   "output_canvas"
// );

// const canvasCtx = canvasElement.getContext("2d");

// Check if webcam access is supported.
// function hasGetUserMedia() {
//   return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
// }

// If webcam supported, add event listener to button for when user
// wants to activate it.
// if (hasGetUserMedia()) {
  // enableWebcamButton = document.getElementById(
  //   "video"
  // );
  // enableWebcamButton.addEventListener("click", enableCam);
// } else {
//   console.warn("getUserMedia() is not supported by your browser");
// }

// Enable the live webcam view and start detection.
// function enableCam(event) {
//   if (!faceLandmarker) {
//     console.log("Wait! faceLandmarker not loaded yet.");
//     return;
//   }

//   if (webcamRunning === true) {
//     webcamRunning = false;
//     enableWebcamButton.innerText = "ENABLE PREDICTIONS";
//   } else {
//     webcamRunning = true;
//     enableWebcamButton.innerText = "DISABLE PREDICTIONS";
//   }

//   // getUsermedia parameters.
//   const constraints = {
//     video: true
//   };

//   // Activate the webcam stream.
//   navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
//     video.srcObject = stream;
//     video.addEventListener("loadeddata", predictWebcam);
//   });
// }

// let lastVideoTime = -1;
// let results = undefined;
// const drawingUtils = new DrawingUtils(canvasCtx);

const video = document.getElementById("video");
video.addEventListener("play", () => {
  setInterval(async() => {
    const detections = await faceLandmarker.detectForVideo(video, Date.now());
    // console.log(detections);

          let objectsTexts = "";
          for (let i = 10; i < 18; i++){
            // console.log(Math.round(parseFloat(detections.faceBlendshapes[0].categories[11].score) * 100));
            console.log(Math.round(parseFloat(detections.faceBlendshapes[0].categories[11].score) * 100));
            console.log(Math.round(parseFloat(detections.faceBlendshapes[0].categories[15].score) * 100));
            console.log(Math.round(parseFloat(detections.faceBlendshapes[0].categories[16].score) * 100));
            console.log(Math.round(parseFloat(detections.faceBlendshapes[0].categories[17].score) * 100));
            if(Math.round(parseFloat(detections.faceBlendshapes[0].categories[11].score) * 100)<50){
              FaceStatus.textContent="eyes are looking down";
              
            }
            if(Math.round(parseFloat(detections.faceBlendshapes[0].categories[15].score) * 100)<50){
              FaceStatus.textContent="eyes are looking left";
              
            }

            if(Math.round(parseFloat(detections.faceBlendshapes[0].categories[16].score) * 100)<50){
              FaceStatus.textContent="eyes are looking right";
              
            }

            if(Math.round(parseFloat(detections.faceBlendshapes[0].categories[17].score) * 100)<50){
              FaceStatus.textContent="eyes are looking up";
              
            }

            
            
            


            }
          //   // objectsTexts += detections.faceBlendshapes[0].categories[i].categoryName +
          //   // " - with " +
          //   // Math.round(parseFloat(detections.faceBlendshapes[0].categories[i].score) * 100) +
          //   // "% confidence, ";
          //   }
          //   FaceStatus.textContent = objectsTexts;
          }, 500);
});

// async function predictWebcam() {
//   const radio = video.videoHeight / video.videoWidth;
//   video.style.width = videoWidth + "px";
//   video.style.height = videoWidth * radio + "px";
//   canvasElement.style.width = videoWidth + "px";
//   canvasElement.style.height = videoWidth * radio + "px";
//   canvasElement.width = video.videoWidth;
//   canvasElement.height = video.videoHeight;
//   // Now let's start detecting the stream.
//   if (runningMode === "IMAGE") {
//     runningMode = "VIDEO";
//     await faceLandmarker.setOptions({ runningMode: runningMode });
//   }
//   let nowInMs = Date.now();
//   if (lastVideoTime !== video.currentTime) {
//     lastVideoTime = video.currentTime;
//     results = faceLandmarker.detectForVideo(video, nowInMs);
//   }
//   if (results.faceLandmarks) {
//     for (const landmarks of results.faceLandmarks) {
//       drawingUtils.drawConnectors(
//         landmarks,
//         FaceLandmarker.FACE_LANDMARKS_TESSELATION,
//         { color: "#C0C0C070", lineWidth: 1 }
//       );
//       drawingUtils.drawConnectors(
//         landmarks,
//         FaceLandmarker.FACE_LANDMARKS_RIGHT_EYE,
//         { color: "#FF3030" }
//       );
//       // drawingUtils.drawConnectors(
//       //   landmarks,
//       //   FaceLandmarker.FACE_LANDMARKS_RIGHT_EYEBROW,
//       //   { color: "#FF3030" }
//       // );
//       drawingUtils.drawConnectors(
//         landmarks,
//         FaceLandmarker.FACE_LANDMARKS_LEFT_EYE,
//         { color: "#30FF30" }
//       );
//       // drawingUtils.drawConnectors(
//       //   landmarks,
//       //   FaceLandmarker.FACE_LANDMARKS_LEFT_EYEBROW,
//       //   { color: "#30FF30" }
//       // );
//       // drawingUtils.drawConnectors(
//       //   landmarks,
//       //   FaceLandmarker.FACE_LANDMARKS_FACE_OVAL,
//       //   { color: "#E0E0E0" }
//       // );
//       drawingUtils.drawConnectors(
//         landmarks,
//         FaceLandmarker.FACE_LANDMARKS_LIPS,
//         { color: "#E0E0E0" }
//       );
//       // drawingUtils.drawConnectors(
//       //   landmarks,
//       //   FaceLandmarker.FACE_LANDMARKS_RIGHT_IRIS,
//       //   { color: "#FF3030" }
//       // );
//     //   drawingUtils.drawConnectors(
//     //     landmarks,
//     //     FaceLandmarker.FACE_LANDMARKS_LEFT_IRIS,
//     //     { color: "#30FF30" }
//     //   );
//     // }
//   }
//   drawBlendShapes(videoBlendShapes, results.faceBlendshapes);

//   // Call this function again to keep predicting when the browser is ready.
//   if (webcamRunning === true) {
//     window.requestAnimationFrame(predictWebcam);
//   }
// }

// function drawBlendShapes(el, blendShapes) {
//   if (!blendShapes.length) {
//     return;
//   }

//   let htmlMaker = "";
//   blendShapes[0].categories.map((shape) => {
//     htmlMaker += `
//       <li class="blend-shapes-item">
//         <span class="blend-shapes-label">${
//           shape.displayName || shape.categoryName
//         }</span>
//         <span class="blend-shapes-value" style="width: calc(${
//           +shape.score * 100
//         }% - 120px)">${(+shape.score).toFixed(4)}</span>
//       </li>
//     `;
//   });

//   el.innerHTML = htmlMaker;
// }}