const game = {};

function nextQuestion() {
	for(const btn of gframe.buttons) btn.style.border = "2px solid #33a";

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
			cq[2] = getitems(cat, 1, item[1], 40, 100);
			cq[3] = `assets/items/${item[0]}.jpg`;
			break;

		case "icost":
			cq[0] = `How much does ${item[0]} cost?`;
			cq[1] = item[1];
			cq[2] = getitems(cat, 1, item[1], 100, 500);
			cq[3] = `assets/items/${item[0]}.jpg`;
			break;

		case "icd":
			cq[0] = `What is the cooldown of ${item[0]}?`;
			cq[1] = item[1];
			cq[2] = getitems(cat, 1, item[1], 10, 30);
			cq[3] = `assets/items/${item[0]}.jpg`;
			break;

		case "amana":
			cq[0] = `What is the mana cost of ${item[0]}?`;
			cq[1] = item[1];
			cq[2] = getitems(cat, 1, item[1], typeof item[1] === "number" && 50, 100);
			cq[3] = `assets/abilities/${item[0]}.jpg`;
			break;

		case "acd":
			cq[0] = `What is the cooldown of ${item[0]}?`;
			cq[1] = item[1];
			cq[2] = getitems(cat, 1, item[1], typeof item[1] === "number" && 15, 10);
			cq[3] = `assets/abilities/${item[0]}.jpg`;
			break;

		case "ahero":
			cq[0] = `What hero has this ability: ${item[0]}?`;
			cq[1] = item[1];
			cq[2] = getitems(cat, 1, item[1])
			cq[3] = `assets/abilities/${item[0]}.jpg`;
			break;

		case "invoke":
			const t = Math.random() < 0.5;
			const i = +t;
			if(t) {
				cq[0] = `What combination is used to invoke ${item[0]}?`;
				cq[3] = `assets/abilities/${item[0]}.jpg`;
			} else {
				cq[0] = `What spell is invoked by this combination: ${item[1]}?`;
				cq[3] = "assets/abilities/Invoke.jpg";
			}
			cq[1] = item[i];
			cq[2] = getitems(cat, i, item[i]);
			break;


		default:
			// 🤔
	}

	gframe.question.textContent = cq[0];
	gframe.img.src = cq[3];

	const rand = Math.floor(Math.random() * 4);
	gframe.buttons[rand].val.textContent = cq[1];
	game.answer = rand;
	for(let a = 0, q = 0; a < 4; a++) a === rand || (gframe.buttons[a].val.textContent = cq[2][q++]);
	gframe.buttons.forEach((v, i) => v.onclick = answer.bind(null, i));
	

	if(settings.timer.val) {
		gframe.stats[2].textContent = game.timer = settings.timer.val;
		game.iid = setInterval(() => (gframe.stats[2].textContent = --game.timer) || answer(), 1000);
	}
}

function answer(answ) {
	clearInterval(game.iid);
	for(const btn of gframe.buttons) btn.onclick = null;

	const correct = answ === game.answer;

	if(answ !== undefined) gframe.buttons[answ].style.border = "2px solid #a00";
	gframe.buttons[game.answer].style.border = "2px solid #0a0";
	
	if(correct) gframe.stats[0].textContent = game.score += 100 - (Math.floor((settings.timer.val - game.timer) * 50 / settings.timer.val) || 0);
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
	Object.assign(main.playb.style, {
		fontSize: "20px",
		fontFamily: "'IBM Plex Serif', serif",
		color: "#bef",
		background: "#323264",
		border: "1px solid #bef",
		borderRadius: "3px",
		marginTop: "5px",
		marginBottom: "15px"
	});
	main.playb.onclick = startGame;
});