const game = {};

function nextQuestion() {
	for(const btn of gframe.answers) btn.style.border = "2px solid #33a";

	const cat = settings.questions[Math.floor(Math.random() * settings.questions.length)];
	game.answered[cat] = game.answered[cat] && game.answered[cat].n++ < data[cat].length ? game.answered[cat] : {n: 1};

	let i;
	while((i = Math.floor(Math.random() * data[cat].length)) in game.answered[cat]);
	game.answered[cat][i] = true;

	const item = data[cat][i];
	const cq = [];
	switch(cat) {
		case "imana":
			cq[0] = `What is the mana cost of ${item[0]}?${item[2] ? ` (${item[2]})` : ""}`;
			cq[1] = item[1];
			cq[2] = settings.hardmode.val || getitems(cat, 1, item[1], 40, 100);
			cq[3] = `assets/items/${item[0]}.jpg`;
			break;

		case "icost":
			cq[0] = `How much does ${item[0]} cost?`;
			cq[1] = item[1];
			cq[2] = settings.hardmode.val || getitems(cat, 1, item[1], 100, 500);
			cq[3] = `assets/items/${item[0]}.jpg`;
			break;

		case "icd":
			cq[0] = `What is the cooldown of ${item[0]}?`;
			cq[1] = item[1];
			cq[2] = settings.hardmode.val || getitems(cat, 1, item[1], 10, 30);
			cq[3] = `assets/items/${item[0]}.jpg`;
			break;

		case "amana":
			cq[0] = `What is the mana cost of ${item[0]}?`;
			cq[1] = item[1];
			cq[2] = settings.hardmode.val || getitems(cat, 1, item[1], typeof item[1] === "number" && 50, 100);
			cq[3] = `assets/abilities/${item[0]}.jpg`;
			break;

		case "acd":
			cq[0] = `What is the cooldown of ${item[0]}?`;
			cq[1] = item[1];
			cq[2] = settings.hardmode.val || getitems(cat, 1, item[1], typeof item[1] === "number" && 15, 10);
			cq[3] = `assets/abilities/${item[0]}.jpg`;
			break;

		case "ahero":
			cq[0] = `What hero has this ability: ${item[0]}?`;
			cq[1] = item[1];
			cq[2] = settings.hardmode.val || getitems(cat, 1, item[1])
			cq[3] = `assets/abilities/${item[0]}.jpg`;
			break;

		case "invoke":
			const t = Math.random() < 0.5;
			cq[0] = t ? `What combination is used to invoke ${item[0]}?` : `What spell is invoked by this combination: ${item[1]}?`;
			const i = +t;
			cq[1] = item[i];
			cq[2] = settings.hardmode.val || getitems(cat, i, item[i]);
			cq[3] = `assets/abilities/${t ? item[0] : "Invoke"}.jpg`;;
			break;


		default:
			// 🤔
	}

	gframe.question.textContent = cq[0];
	gframe.img.src = cq[3];
	if(settings.hardmode.val) game.answer = cq[1].toString();
	else {
		const rand = Math.floor(Math.random() * 4);
		gframe.answers[rand].val.textContent = cq[1];
		game.answer = rand;
		for(let a = 0, q = 0; a < 4; a++) a === rand || (gframe.answers[a].val.textContent = cq[2][q++]);
		gframe.answers.forEach((v, i) => v.onclick = answer.bind(null, i));
	}

	if(settings.timer.val) {
		gframe.stats[2].textContent = game.timer = settings.timer.val;
		game.iid = setInterval(() => (gframe.stats[2].textContent = --game.timer) || answer(), 1000);
	}
}

function answer(answ) {
	clearInterval(game.iid);

	for(const btn of gframe.answers) btn.onclick = null;

	if(settings.hardmode.val) {
		// tbd
	} else {
		if(answ !== undefined) gframe.answers[answ].style.border = "2px solid #a00";
		gframe.answers[game.answer].style.border = "2px solid #0a0";
	}
	if(answ === game.answer) gframe.stats[0].textContent = game.score += 100 - (Math.floor((settings.timer.val - game.timer) * 50 / settings.timer.val) || 0);
	else gframe.stats[1].textContent = ++game.misses;

	if(settings.miss.val && game.misses === settings.miss.val) {
		gframe.question.textContent = "Game over!";
		main.playb.style.display = "inline-block";
		main.playb.textContent = "Play again";
		main.playb.onclick = () => {
			sframe.style.display = "block";
			gframe.style.display = "none";
			main.playb.textContent = "Let's play!";
			main.playb.onclick = startGame;
		};
		return;
	}

	setTimeout(nextQuestion, 3500);
}

function startGame() {
	settings.questions = Object.keys(questions).filter(v => questions[v]);
	if(!settings.questions.length) {
		main.err.style.display = "block";
		main.err.val.textContent = "At least one category of questions must be selected.";
		return;
	}

	gframe.stats[0].textContent = game.score = 0;
	gframe.stats[1].textContent = game.misses = 0;
	gframe.stats[2].textContent = "-";

	game.answered = {};

	main.playb.style.display = "none";
	sframe.style.display = "none";
	gframe.style.display = "block";

	nextQuestion();
}

Promise.all([load("sframe"), load("gframe"), load("data")]).then(() => {
	gframe.style.display = "none";

	main.err = main.appendChild(el());
	main.err.style.color = "#f66";
	main.err.style.marginTop = "15px";
	main.err.val = main.err.appendChild(el(null, "b"));
	main.err.appendChild(el(" (click to hide)", "i"));
	(main.err.onclick = () => main.err.style.display = "none")();

	main.playb = main.appendChild(el("Let's Play!", "button"));
	main.playb.style.fontSize = "20px";
	main.playb.style.fontFamily = "'IBM Plex Serif', serif";
	main.playb.style.color = "#bef";
	main.playb.style.background = "#323264";
	main.playb.style.border = "1px solid #bef";
	main.playb.style.borderRadius = "3px";
	main.playb.style.margin = "15px";
	main.playb.onclick = startGame;
});