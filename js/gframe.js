const gframe = main.appendChild(el());
gframe.style.maxWidth = "500px";
gframe.style.margin = "auto";

const statframe = gframe.appendChild(el());
statframe.style.display = "flex";
statframe.style.color = "#fff";

const stats = [["Score: ", "#6a6"], ["Misses: ", "#a66"], ["Timer: ", "#66a"]].map(d => {
	const newEl = statframe.appendChild(el(d[0]));
	newEl.style.borderRadius = "2px";
	newEl.style.margin = "3px";
	newEl.style.flexGrow = 1;
	newEl.style.background = d[1];
	return newEl.appendChild(el("0", "b"));
});



const ic = gframe.appendChild(el());
ic.style.width = "100px";
ic.style.height = "100px";
ic.style.margin = "auto";
const img = ic.appendChild(el(null, "img"));
img.src = "assets/dota2.png";
img.style.maxWidth = "100px";
img.style.maxHeight = "100px";

const question = gframe.appendChild(el("Questions will appear here!", "b"));
question.style.fontSize = "18px";
question.style.display = "block";

const aframe = gframe.appendChild(el());
aframe.style.display = "flex";
const cols = Array(2).fill(null).map(() => {
	const newEl = aframe.appendChild(el());
	newEl.style.display = "flex";
	newEl.style.flexDirection = "column";
	newEl.style.flex = 1;
	return newEl;
});

const answers = ["A) ", "B) ", "C) ", "D) "].map((a, i) => {
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