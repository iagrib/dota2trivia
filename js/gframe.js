const gframe = main.appendChild(el());
gframe.style.maxWidth = "500px";
gframe.style.margin = "auto";

{
	const container = gframe.appendChild(el());
	container.style.display = "flex";
	container.style.color = "#fff";

	gframe.stats = [["Score: ", "#6a6"], ["Misses: ", "#a66"], ["Timer: ", "#66a"]].map(d => {
		const newEl = container.appendChild(el(d[0]));
		newEl.style.borderRadius = "2px";
		newEl.style.margin = "3px";
		newEl.style.flex = 1;
		newEl.style.background = d[1];
		return newEl.appendChild(el("0", "b"));
	});
}

{
	const container = gframe.appendChild(el());
	container.style.width = "100px";
	container.style.height = "100px";
	container.style.margin = "auto";

	gframe.img = container.appendChild(el(null, "img"));
	gframe.img.src = "assets/dota2.png";
	gframe.img.style.maxWidth = "100px";
	gframe.img.style.maxHeight = "100px";
}

gframe.question = gframe.appendChild(el("Questions will appear here!", "b"));
gframe.question.style.fontSize = "18px";
gframe.question.style.display = "block";

{
	const container = gframe.appendChild(el());
	container.style.display = "flex";

	const cols = Array(2).fill(null).map(() => {
		const newEl = container.appendChild(el());
		newEl.style.display = "flex";
		newEl.style.flexDirection = "column";
		newEl.style.flex = 1;
		return newEl;
	});

	gframe.answers = ["A) ", "B) ", "C) ", "D) "].map((a, i) => {
		const newEl = cols[i % 2].appendChild(el(null, "button"));
		newEl.style.fontFamily = "'IBM Plex Serif', serif";
		newEl.style.color = "#bef";
		newEl.style.margin = "7px";
		newEl.style.borderRadius = "3px";
		newEl.style.border = "2px solid #33a";
		newEl.style.minHeight = "40px";
		newEl.style.flex = 1;
		newEl.style.outline = "none";
		newEl.onmouseenter = () => newEl.style.background = "#55a";
		(newEl.onmouseleave = () => newEl.style.background = "#33a")();
		newEl.appendChild(el(a, "b"));
		newEl.val = newEl.appendChild(el("<...>", "i"));
		return newEl;
	});
}