var leaveCounter = 1;
var showAlert = true;

$(window).blur(function() {
    // if(showAlert)
    //     alert('You are not allowed to leave page :), you left: ' + leaveCounter.toString() + ' time/s!');
    if(leaveCounter > 2){
        showAlert = false;
        // window.location.href = "failed.html";
    }
    leaveCounter++;
});
