var holes = document.querySelectorAll('.hole');
var scoreBoard = document.querySelector('.score');
var moles = document.querySelectorAll('.mole');
let lastHole;
let score = 0;
var timeUp = false;
var timmer = 15000;
var counter;

function randomTime(min, max) {
	return Math.round(Math.random() * (max - min) + max);
}

function randomHole() {
	var idx = Math.floor(Math.random() * holes.length);
	var hole = holes[idx];

	if (hole === lastHole) {
		return randomHole();
	}

	lastHole = hole;
	return hole;
}

function moleUp() {
	const time = randomTime(500, 1000);
	const hole = randomHole();
	hole.classList.add('up');

	setTimeout(function() {
		hole.classList.remove('up');
		if (!timeUp) moleUp();
	}, time);
}

function reset() {
	scoreBoard.textContent = 0;
	timeUp = false;
	score = 0;
}

function startGame(e) {
	console.log(e);
	e.target.classList.add('hide');
	reset();
	moleUp();
	startTime(0);

	setTimeout(function() {
		timeUp = true;
		clearTimeout(counter);
		e.target.classList.remove('hide');
	}, timmer);
}

function hammer(e) {
	if (!e.isTrusted) return;

	score++;
	e.target.parentNode.classList.remove('up');
	scoreBoard.textContent = score;
}

moles.forEach(x => x.addEventListener('click', hammer));

function startTime(data) {
	counter = setTimeout(function() {
		data++;
		document.querySelector('.time').innerHTML = ((timmer/1000) - data) - 1;
		startTime(data);
	}, 1000)
}