const btn = document.getElementById("play"); //chama os id
const music = document.getElementById("bgm");

btn.addEventListener("click", () => {
  music.play();
  btn.style.display = "none";
});
