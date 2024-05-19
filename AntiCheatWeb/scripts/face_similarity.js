var picCounter = 0;
const threshold = 0.6
var img1Descriptor,img2Descriptor;




// var leaveCounter = 1;
// var showAlert = true;
// while (simi==false){
const video = document.getElementById("video");
function startVideo() {
    console.log("Models loaded");
    navigator.getUserMedia({ video: {} },
        (stream) => (video.srcObject = stream),
        (err) => console.error(err)
    );
}


Promise.all([
    faceapi.nets.faceLandmark68Net.loadFromUri("../models"),
    faceapi.loadSsdMobilenetv1Model('../models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('../models'),
    
]).then(startVideo);

async function picCounterIncerement(i) {

    if (i == 1) {
        var path = (window.URL || window.webkitURL).createObjectURL($('#image1').prop('files')[0]);
        $('#image1src').get(0).src = path;
    
        img1Descriptor = await faceapi.detectSingleFace(document.getElementById('image1src'))
            .withFaceLandmarks().withFaceDescriptor();
        console.log(img1Descriptor);
        if (img1Descriptor == null) {
            alert('Please upload another photo');
            return;
        }


        img2Descriptor = await faceapi.detectSingleFace(video)
            .withFaceLandmarks().withFaceDescriptor();
        console.log(img2Descriptor);
        if (img2Descriptor == null) {
            alert('Please upload another photo 2');
            return;
        }

        updateResult()

}
}



function updateResult() {

    var distance =
        faceapi.euclideanDistance(img1Descriptor.descriptor, img2Descriptor.descriptor)
    console.log("distance")
    console.log(distance)
    if(distance!=0) {


    };
    let text = distance
    let bgColor = '#ffffff'
    if (distance > threshold) {
        text += ' (no match)'
        bgColor = '#ce7575'
        alert('NO match Please upload another photo');
    }
    else{
            const btn = document.getElementById('image1');

            btn.style.display = 'none';

            const btn2 =document.getElementById("similarityStatus");
            btn2.style.display = 'none';

            const btn3 =document.getElementById("similarityStatusLabel");
            btn3.style.display= 'none';

            const btn4 =document.getElementById("image1src");
            btn4.style.display='none';
            alert('Photo matched please start your exam');
            simi = true;
    }
    $('#similarityStatus').text(text)
    $('#similarityStatus').css('background-color', bgColor)
}
// }
// $(window).blur(function() {
//     if(showAlert)
//         alert('You are not allowed to leave page :), you left: ' + leaveCounter.toString() + ' time/s!');
//     if(leaveCounter > 2){
//         showAlert = false;
//         window.location.href = "failed.html";
//     }
//     leaveCounter++;
// });
