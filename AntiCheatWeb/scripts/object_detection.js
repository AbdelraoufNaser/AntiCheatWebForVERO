import {
      ObjectDetector,
      FilesetResolver,
    } from "./mediapipe_vision_bundle.js";

  
  let objectDetector;
  let runningMode = "VIDEO";

  let objectStatus = document.getElementById("objectDetectionStatus");

  
  const initializeObjectDetector = async () => {
    const vision = await FilesetResolver.forVisionTasks(
      "/scripts"
    );
    objectDetector = await ObjectDetector.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath: `../models/efficientdet_lite0.tflite`,
        delegate: "GPU"
      },
      scoreThreshold: 0.5,
      runningMode: runningMode
    });
  };
  initializeObjectDetector();


 
  
  let video = document.getElementById("video");

  video.addEventListener("play", () => {
    setInterval(async() => {
      const detections = await objectDetector.detectForVideo(video, Date.now());
      // console.log(detections);
            let objectsText = "";
            for (let i = 0; i < detections.detections.length; i++){
              objectsText += detections.detections[i].categories[0].categoryName +
              " - with " +
              Math.round(parseFloat(detections.detections[i].categories[0].score) * 100) +
              "% confidence, ";
              }
              objectStatus.textContent = objectsText;
            }, 500);
  });

      
  
  // let lastVideoTime = -1;
  // async function predictWebcam() {
  //     await objectDetector.setOptions({ runningMode: "VIDEO" });
  //   let nowInMs = Date.now();

  //   if (video.currentTime !== lastVideoTime) {
  //     lastVideoTime = video.currentTime;
  //     const detections = await objectDetector.detectForVideo(video, nowInMs);
  //   }

  // }
