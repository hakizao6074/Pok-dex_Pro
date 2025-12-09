const btn = document.getElementById("play");
const music = document.getElementById("bgm");

btn.addEventListener("click", () => {
  music.play();
  btn.style.display = "none";
});
