let err;
let button;

let gScore;
let gMisses;
let gTimer;
let gAnswer;

let interval;
let answered;

function nextQuestion() {
	for(const btn of answers) btn.style.border = "2px solid #33a";

	const cat = gSettings.questions[Math.floor(Math.random() * gSettings.questions.length)];
	answered[cat] = answered[cat] && answered[cat].n++ < data[cat].length ? answered[cat] : {n: 1};

	let i;
	while((i = Math.floor(Math.random() * data[cat].length)) in answered[cat]);
	answered[cat][i] = true;

	const item = data[cat][i];
	const cq = [];
	switch(cat) {
		case "imana":
			cq[0] = `What is the mana cost of ${item[0]}?${item[2] ? ` (${item[2]})` : ""}`;
			cq[1] = item[1];
			cq[2] = gSettings.hardmode.val || getitems(cat, 1, item[1], 40, 100);
			cq[3] = `assets/items/${item[0]}.jpg`;
			break;

		case "icost":
			cq[0] = `How much does ${item[0]} cost?`;
			cq[1] = item[1];
			cq[2] = gSettings.hardmode.val || getitems(cat, 1, item[1], 100, 500);
			cq[3] = `assets/items/${item[0]}.jpg`;
			break;

		case "icd":
			cq[0] = `What is the cooldown of ${item[0]}?`;
			cq[1] = item[1];
			cq[2] = gSettings.hardmode.val || getitems(cat, 1, item[1], 10, 30);
			cq[3] = `assets/items/${item[0]}.jpg`;
			break;

		case "amana":
			cq[0] = `What is the mana cost of ${item[0]}?`;
			cq[1] = item[1];
			cq[2] = gSettings.hardmode.val || getitems(cat, 1, item[1], typeof item[1] === "number" && 50, 100);
			cq[3] = `assets/abilities/${item[0]}.jpg`;
			break;

		case "acd":
			cq[0] = `What is the cooldown of ${item[0]}?`;
			cq[1] = item[1];
			cq[2] = gSettings.hardmode.val || getitems(cat, 1, item[1], typeof item[1] === "number" && 15, 10);
			cq[3] = `assets/abilities/${item[0]}.jpg`;
			break;

		case "ahero":
			cq[0] = `What hero has this ability: ${item[0]}?`;
			cq[1] = item[1];
			cq[2] = gSettings.hardmode.val || getitems(cat, 1, item[1])
			cq[3] = `assets/abilities/${item[0]}.jpg`;
			break;

		case "invoke":
			const t = Math.random() < 0.5;
			cq[0] = t ? `What combination is used to invoke ${item[0]}?` : `What spell is invoked by this combination: ${item[1]}?`;
			cq[1] = item[+t];
			cq[2] = gSettings.hardmode.val || getitems(cat, +t, item[1]);
			cq[3] = `assets/abilities/${t ? item[0] : "invoke"}.jpg`;;
			break;


		default:
			// 🤔
	}

	question.textContent = cq[0];
	img.src = cq[3];
	if(gSettings.hardmode.val) gAnswer = cq[1].toString();
	else {
		const rand = Math.floor(Math.random() * 4);
		answers[rand].val.textContent = cq[1];
		gAnswer = rand;
		for(let a = 0, q = 0; a < 4; a++) a === rand || (answers[a].val.textContent = cq[2][q++]);
		answers.forEach((v, i) => v.onclick = answer.bind(null, i));
	}

	if(gSettings.timer.val) {
		stats[2].textContent = gTimer = gSettings.timer.val;
		interval = setInterval(() => (stats[2].textContent = --gTimer) || answer(), 1000);
	}
}

function answer(answ) {
	clearInterval(interval);

	for(const btn of answers) btn.onclick = null;

	if(gSettings.hardmode.val) {
		// tbd
	} else {
		if(answ !== undefined) answers[answ].style.border = "2px solid #a00";
		answers[gAnswer].style.border = "2px solid #0a0";
	}
	if(answ === gAnswer) stats[0].textContent = gScore += 100 - (Math.floor((gSettings.timer.val - gTimer) * 50 / gSettings.timer.val) || 0);
	else stats[1].textContent = ++gMisses;

	if(gSettings.miss.val && gMisses === gSettings.miss.val) {
		question.textContent = "Game over!";
		button.style.display = "inline-block";
		button.textContent = "Play again";
		button.onclick = () => {
			sframe.style.display = "block";
			gframe.style.display = "none";
			button.textContent = "Let's play!";
			button.onclick = startGame;
		};
		return;
	}

	setTimeout(nextQuestion, 3500);
}

function startGame() {
	gSettings.questions = Object.keys(gQuestions).filter(v => gQuestions[v]);
	if(!gSettings.questions.length) {
		err.style.display = "block";
		err.val.textContent = "At least one category of questions must be selected.";
		return;
	}

	stats[0].textContent = gScore = 0;
	stats[1].textContent = gMisses = 0;
	stats[2].textContent = "-";

	answered = {};

	button.style.display = "none";
	sframe.style.display = "none";
	gframe.style.display = "block";

	nextQuestion();
}

Promise.all([load("sframe"), load("gframe"), load("data")]).then(() => {
	gframe.style.display = "none";

	err = main.appendChild(el());
	err.style.color = "#f66";
	err.style.marginTop = "15px";
	err.val = err.appendChild(el(null, "b"));
	err.appendChild(el(" (click to hide)", "i"));
	(err.onclick = () => err.style.display = "none")();

	button = main.appendChild(el("Let's Play!", "button"));
	button.style.fontSize = "20px";
	button.style.fontFamily = "'IBM Plex Serif', serif";
	button.style.color = "#bef";
	button.style.background = "#323264";
	button.style.border = "1px solid #bef";
	button.style.borderRadius = "3px";
	button.style.margin = "15px";
	button.onclick = startGame;
});