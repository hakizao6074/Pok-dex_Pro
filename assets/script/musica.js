const audio = document.getElementById("player");
const playBtn = document.getElementById("play-pause");
const seek = document.getElementById("seek");
const time = document.getElementById("time");
const volume = document.getElementById("volume");

audio.volume = 0.2; // iniciar a musica em 20% de volume
volume.value = 0.2;

playBtn.onclick = () => {
	if (audio.paused) {
		audio.play();
		playBtn.textContent = "⏸";
	} else {
		audio.pause();
		playBtn.textContent = "▶";
	}
}; //mudar icones

seek.oninput = () => {
	audio.currentTime = seek.value;
}; //define por quanto tem a musico deve tocar

volume.oninput = () => {
	audio.volume = volume.value;
}; //auterar o valor do volume

function updateTime() {
	const jat = format(audio.currentTime);
	const max = format(audio.duration);
	time.textContent = `${jat} / ${max}`;
}; //atualiza o tempo exibido

function format(sec) {
	if (isNaN(sec)) return "0:00";
	const m = Math.floor(sec / 60);
	const s = Math.floor(sec % 60).toString().padStart(2, "0");
	return `${m}:${s}`;
}; //converte tem tempo em segundos em formato de tempo "0:00"

audio.onloadedmetadata = () => {
	seek.setAttribute("max", audio.duration);
	updateTime();
}; //atualizar o tempo de duraçao

audio.ontimeupdate = () => {
	seek.value = audio.currentTime;
	updateTime();
}; //atualizar o tempo percorrido

if (player !== null) {
	console.log("ready")
}

