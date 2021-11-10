//https://teachablemachine.withgoogle.com/models/0SPnPy--v/
prediction1="";
prediction2="";

Webcam.set({
    height:350,
    width:300,
    image_format:'png'
});
camera=document.getElementById("camera");
Webcam.attach('#camera');
function take_snapshot(){
    Webcam.snap(function(data_uri){
 document.getElementById("result").innerHTML='<img id="capture_image" src="'+data_uri+'">';
    });
}
console.log('ml5 version',ml5.version);
classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/0SPnPy--v/model.json',modelLoaded);

function modelLoaded(){
    console.log('model loaded!')
}
function speak(){
    var synth=window.speechSynthesis;
    hand_gesture_1="The first predicition is"+prediction1;
    hand_gesture_2="The first prediction is"+prediction2;
   var utterThis=new SpeechSynthesisUtterance(hand_gesture_1+hand_gesture_2);
   synth.speak(utterThis);
}
function check(){
    img=document.getElementById("capture_image");
    classifier.classify(img, gotResult);
}
    function gotResult(error,results){
        if(error){
            console.error(error);
        }else{
            console.log(results);
            document.getElementById("result_emotion_name").innerHTML=results[0].label;
            document.getElementById("result_emotion_name2").innerHTML=results[1].label;
            prediction1=results[0].label;
            prediction2=results[0].label;
            speak();
            if(results[0].label=='amazing'){
                document.getElementById("emoji_update").innerHTML="&#128076;";
            }
            if(results[0].label=='best'){
                document.getElementById("emoji_update").innerHTML="&#128077;";
            }
            if(results[0].label=='victory'){
                document.getElementById("emoji_update").innerHTML="&#9996;";
            }
            if(results[1].label=='amazing'){
                document.getElementById("emoji_update2").innerHTML="&#128076;";
            }
            if(results[1].label=='best'){
                document.getElementById("emoji_update2").innerHTML="&#128077;";
            }
            if(results[1].label=='victory'){
                document.getElementById("emoji_update2").innerHTML="&#9996;";
            } 
        }
    }
