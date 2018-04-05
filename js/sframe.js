const gQuestions = {
	imana: "Items - Mana Cost",
	icost: "Items - Gold Cost",
	icd: "Items - Cooldown",
	amana: "Abilities - Mana Cost",
	acd: "Abilities - Cooldown",
	//asound: "Ability by Sound",
	ahero: "Hero by Ability",
	//thero: "Hero by Talent Tree",
	//tmissing: "Missing Talents in Talent Trees",
	invoke: "Invoker Spells"
};
const gSettings = {
	hardmode: {
		type: "bool",
		title: "Hard Mode",
		desc: "Instead of choosing from 4 answers, you'll have to type out the answer yourself. No hints!",
		val: false,
		disabled: "Will be available soon!"
	},
	timer: {
		type: "int",
		title: "Time Limit",
		desc: "Time limit per question, in seconds. Leave empty to disable.",
		val: 20
	},
	miss: {
		type: "int",
		title: "Miss Limit",
		desc: "Maximum amount of incorrect answers you can give before the game ends. Leave empty for no limit.",
		val: 3
	}
};



const sframe = main.appendChild(el());
sframe.appendChild(el("Game Settings")).style.fontSize = "24px";

sframe.appendChild(el("Question types", "b")).style.fontSize = "20px";
for(const [k, v] of Object.entries(gQuestions)) {
	const newEl = sframe.appendChild(el(v));
	const cb = newEl.appendChild(el(null, "input"));
	cb.type = "checkbox";
	cb.checked = true;
	cb.onchange = () => gQuestions[k] = cb.checked;
}

sframe.appendChild(el("General", "b")).style.fontSize = "20px";

for(const val of Object.values(gSettings)) {
	const opt = sframe.appendChild(el(`${val.title} `));
	opt.appendChild(el("(?)", "abbr")).title = val.desc;

	const input = opt.appendChild(el(null, "input"));
	switch(val.type) { // switch over if-else for general cleanness and possible additional setting types in future
		case "bool":
			input.type = "checkbox";
			input.checked = val.val;
			input.onchange = () => val.val = input.checked;
			break;

		case "int":
			input.style.width = "20px";
			input.style.marginLeft = "3px";
			input.style.fontFamily = "'IBM Plex Serif', serif";
			input.style.color = "#bef";
			input.style.background = "#323264";
			input.style.border = "1px solid #bef";
			input.style.borderRadius = "3px";
			input.value = val.val;
			input.onchange = () => {
				const nval = +input.value;
				if(Number.isInteger(nval) && nval >= 0 && nval < 100) {
					val.val = nval;

					const col = nval ? "#bef" : "#666";
					input.style.color = col;
					input.style.border = `1px solid ${col}`;
					return;
				}
				input.style.color = "#f66";
				input.style.border = "1px solid #f66";
			};
			break;

		default:
			// 🤔
	}

	if(val.disabled) {
		input.disabled = true;
		input.title = val.disabled;
	}
}