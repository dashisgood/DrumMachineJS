var hhAudio = new Audio('sounds/hh.mp3');
var snAudio = new Audio('sounds/sn.mp3');
var bdAudio = new Audio('sounds/bd.mp3');


function playHH(){
	hhAudio.pause();
	hhAudio.currentTime = 0;
	hhAudio.play();
}


function playSN(){
	snAudio.pause();
	snAudio.currentTime = 0;
	snAudio.play();
}

function playBD(){
	bdAudio.pause();
	bdAudio.currentTime = 0;
	bdAudio.play();
}

function blankStepArray(){
	var stepArray = new Array(10);
	for (var i=0;i<64;i++){
    stepArray[i] = 0;
    }
    return stepArray
}

function playLoop(){

	clearInterval(stop);
	stop = setInterval(playBeat, 175);
}

function stopLoop(){

	clearInterval(stop);
	beat = 0;
}

function pauseLoop(){

	clearInterval(stop);
}

function playBeat(){

	console.log(beat);
	for(drum of [hh, sn, bd]){ 
		if (drum.steps[beat]===1){
			drum.sound()
		}
	}
	if (beat===15){
		beat=0;
	}
	else{
		beat++;
	}
	

}

function newBar(){
	for(var drum of drums){
		for(var step in drum.steps){
			if (drum.steps[step] == 0){
				console.log('off')
				//drum.stepElements[step-bar*16].style.backgroundColor = 'black';
			}
			if (drum.steps[step] == 1){
				console.log('on')
				//drum.stepElements[step-bar*16].style.backgroundColor = 'red';
			}
		}
	}
}

function toggleStep(drum, step) {

	if (drums[drum].steps[step] === 0){
		drums[drum].steps[step] = 1;
		drums[drum].stepElements[step].style.backgroundColor = 'red';
		return
	}
	if (drums[drum].steps[step] === 1){
		drums[drum].steps[step] = 0;
		drums[drum].stepElements[step].style.backgroundColor = 'black';
	}
};


var hh = {
		"steps":[0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0,], 
		"sound": playHH,
		"stepElements": document.getElementsByClassName('step-button-hh')
	}
var sn = {
		"steps":[0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0,], 
		"sound": playSN,
		"stepElements": document.getElementsByClassName('step-button-sn')
	}
var bd = {
		"steps":[0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0,], 
		"sound": playBD,
		"stepElements": document.getElementsByClassName('step-button-bd')
	}

var drums = [hh, sn, bd]
var bar = 0;
var beat = 0;