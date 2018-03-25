function load(name) {
	const script = document.body.appendChild(document.createElement("script"));
	script.src = `js/${name}.js`;
	return new Promise(r => script.onload = () => {
		script.remove();
		r();
	});
}

function el(content = "", type = "div") {
	const newEl = document.createElement(type);
	newEl.textContent = content;
	return newEl;
}



document.title = "Dota 2 Trivia";
document.getElementsByTagName("html")[0].style.minHeight = "100vh";
document.body.style.background = `center/cover url("assets/bg/${Math.floor(Math.random() * 39)}.jpg")`;
document.body.style.fontFamily = "'IBM Plex Serif', serif";
document.body.style.textAlign = "center";
document.body.style.color = "#bef";
const font = document.body.appendChild(el(null, "link"));
font.href = "https://fonts.googleapis.com/css?family=IBM+Plex+Serif";
font.rel = "stylesheet";
const icon = document.body.appendChild(el(null, "link"));
icon.href = "favicon.ico";
icon.rel = "icon";
icon.type = "image/x-icon";

const main = document.body.appendChild(el());
main.style.background = "rgba(50, 50, 100, 0.8)";
main.style.borderRadius = "5px";
main.style.maxWidth = "800px";
main.style.margin = "auto";

const title = main.appendChild(el("Dota 2 Trivia"));
title.style.fontSize = "36px";
title.style.margin = "10px";

const footer = document.body.appendChild(el("GitHub", "a"));
footer.href = "https://github.com/iagrib/dota2trivia";
footer.style.fontSize = "10px";
footer.style.color = "#bef";



load("game");

console.log("%cJust a reminder: cheating is not fun! 😉", "color: #090");