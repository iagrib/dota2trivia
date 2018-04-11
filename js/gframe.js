const gframe = main.appendChild(el());
gframe.style.maxWidth = "500px";
gframe.style.margin = "auto";

{
	const container = gframe.appendChild(el());
	container.style.display = "flex";
	container.style.color = "#fff";

	gframe.stats = [["Score: ", "#6a6"], ["Misses: ", "#a66"], ["Timer: ", "#66a"]].map(d => {
		const newEl = container.appendChild(el(d[0]));
		Object.assign(newEl.style, {
			borderRadius: "2px",
			margin: "3px",
			flex: 1,
			background: d[1]
		});
		return newEl.appendChild(el("0", "b"));
	});
}

{
	const container = gframe.appendChild(el());
	Object.assign(container.style, {
		width: "100px",
		height: "100px",
		margin: "auto"
	});

	gframe.img = container.appendChild(el(null, "img"));
	gframe.img.src = "assets/dota2.png";
	gframe.img.style.maxWidth = "100px";
	gframe.img.style.maxHeight = "100px";
}

gframe.question = gframe.appendChild(el("Questions will appear here!", "b"));
gframe.question.style.fontSize = "18px";
gframe.question.style.display = "block";

gframe.answers = gframe.appendChild(el());
gframe.answers.style.display = "flex";

{
	const cols = Array(2).fill(null).map(() => {
		const newEl = gframe.answers.appendChild(el());
		Object.assign(newEl.style, {
			display: "flex",
			flexDirection: "column",
			flex: 1
		});
		return newEl;
	});

	gframe.buttons = ["A) ", "B) ", "C) ", "D) "].map((a, i) => {
		const newEl = cols[i % 2].appendChild(el(null, "button"));

		Object.assign(newEl.style, {
			fontFamily: "'IBM Plex Serif', serif",
			color: "#bef",
			margin: "7px",
			border: "2px solid #33a",
			borderRadius: "3px",
			minHeight: "40px",
			flex: 1,
			outline: "none"
		});

		newEl.onmouseenter = () => newEl.style.background = "#55a";
		(newEl.onmouseleave = () => newEl.style.background = "#33a")();

		newEl.appendChild(el(a, "b"));
		newEl.val = newEl.appendChild(el("<...>", "i"));

		return newEl;
	});
}