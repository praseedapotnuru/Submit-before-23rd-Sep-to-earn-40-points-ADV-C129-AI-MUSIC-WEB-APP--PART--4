song1 = "";
song2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreRightWrist = 0;
scoreLeftWrist = 0;

function setup() {
    canvas = createCanvas(600, 400);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    posenet = ml5.poseNet(video, modalLoaded);
    posenet.on("pose", gotPoses);
}

function modalLoaded() {
    console.log("Posenet is initialized");
}

function preload() {
    song1 = loadSound("catch-it-117676.mp3")
    song2 = loadSound("life-of-a-wandering-wizard-15549.mp3")
}

function gotPoses(results) {
    if(results.length > 0) {
        console.log(results);

        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;

        console.log("leftWristX = ", leftWristX, "leftWristY = ", leftWristY, "rightWristX = ", rightWristX, "rightWristY = ", rightWristY);
    }

}

function draw() {
    fill("red");
    stroke("red");

    if(scoreLeftWrist > 0.2) {
        circle(leftWristX, leftWristY, 20);
        if(song1.isPlaying()) {
            song2.stop();
        }

        else {
            song1.play();
            song2.stop();
        }
    }

    if(scoreRightWrist > 0.2) {
        circle(rightWristX, rihgtWristY, 20);
        
        if(song2.isPlaying()) {
            song1.stop();
        }

        else {
            song2.play();
            song1.stop();
        }
    }
}