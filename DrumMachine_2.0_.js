window.AudioContext = window.AudioContext || window.webkitAudioContext;
var context = new AudioContext();

function loadSound(url, sound) {
	
  var request = new XMLHttpRequest();
  request.open('GET', url, true);
  request.responseType = 'arraybuffer';

  // Decode asynchronously
  request.onload = function() {
    context.decodeAudioData(request.response, function(buffer) {
      allBuffers[sound] = buffer;
      console.log(allBuffers);
    });
  }
  request.send();
}

var allBuffers = {
	'bd':null,
	'sn':null,
	'hh':null,
}

loadSound('sounds/bd.wav', 'bd');
loadSound('sounds/sn.wav', 'sn');
loadSound('sounds/hh.wav', 'hh');



function playSound(buffer) {
  var source = context.createBufferSource(); // creates a sound source
  source.buffer = buffer;                    // tell the source which sound to play
  source.connect(context.destination);       // connect the source to the context's destination (the speakers)
  source.start(0);                           // play the source now
                                             // note: on older systems, may have to use deprecated noteOn(time);
}

function playLoop(){

	clearInterval(stop);
	stop = setInterval(playBeat, 175);
}

function stopLoop(){

	clearInterval(stop);
	beat = 0;
	bar=0;
	drawNewBar();
}

function pauseLoop(){

	clearInterval(stop);
}

function playBeat(){

	drawNewBar();
	if(beat===16||beat===0){stepCounters[15].style.backgroundColor = 'grey'}
	else{stepCounters[beat-(bar*16)-1].style.backgroundColor = 'grey'}
	stepCounters[beat-(bar*16)].style.backgroundColor = '#ffff00'
	for(drum of [hh, sn, bd]){ 
		if (drum.steps[beat]===1){
			drum.sound()
		} 
	}
	if (beat===15){
		beat++;
		bar++;
		

		return
	}
	if (beat===31){
		beat = 0;
		bar = 0;
		
		return

	}
	beat++;;

	

}

function toggleStep(drum, step) {

	if (drums[drum].steps[step + (bar*16)] === 0){
		drums[drum].steps[step + (bar*16)] = 1;
		drums[drum].stepElements[step].style.backgroundColor = 'c12e2a';
		return
	}
	if (drums[drum].steps[step + (bar*16)] === 1){
		drums[drum].steps[step + (bar*16)] = 0;
		drums[drum].stepElements[step].style.backgroundColor = 'black';
	}
};

function drawNewBar(){

	for (var d=0; d<drums.length;d++){
		for(var i=0; i<16;i++){
			if (drums[d].steps[i + (bar*16)] === 1){
				drums[d].stepElements[i].style.backgroundColor = 'c12e2a';
			}
			else{
				drums[d].stepElements[i].style.backgroundColor = 'black';
			}
			stepCounters[i].style.backgroundColor = 'grey'
		}
	}
	barCounter.innerHTML = "Bar " + (bar + 1) + "." + (beat-bar*16+1);
}

var hh = {
		"steps":[0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0,], 
		"sound": function(){playSound(allBuffers.hh);},
		"stepElements": document.getElementsByClassName('step-button-hh')
	}
var sn = {
		"steps":[0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0,], 
		"sound": function(){playSound(allBuffers.sn);},
		"stepElements": document.getElementsByClassName('step-button-sn')
	}
var bd = {
		"steps":[0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0,], 
		"sound": function(){playSound(allBuffers.bd);},
		"stepElements": document.getElementsByClassName('step-button-bd')
	}

var drums = [hh, sn, bd]
var bar = 0;
var beat = 0;

var stepCounters = document.getElementsByClassName('step-counter');
var barCounter = document.getElementById('bar-counter');
drawNewBar();

