const sid = document.getElementById("sid");
const message = document.getElementById("message");
const buttons = document.querySelector(".buttons");
const noBtn = document.getElementById("noBtn");

const sadMusic = document.getElementById("sadMusic");
const happyMusic = document.getElementById("happyMusic");

let noClickedOnce = false;
let canMoveNo = true;

// ---------- NO ----------
function sayNo() {
  noClickedOnce = true;
  canMoveNo = false;

  happyMusic.pause();
  happyMusic.currentTime = 0;
  sadMusic.play();

  sid.src = "sad-sid.png";
  sid.classList.remove("hidden");

  message.innerText = "Bad poogu! You don’t love me!? 💔";

  buttons.style.display = "none";

  // show buttons again after 15 seconds
  setTimeout(() => {
    buttons.style.display = "block";
  }, 15000);
}

// ---------- YES ----------
function sayYes() {
  sadMusic.pause();
  sadMusic.currentTime = 0;
  happyMusic.play();

  sid.src = "happy-sid.png";
  sid.classList.remove("hidden");

  message.innerText = "YAY!! I knew it 💘";
  buttons.style.display = "none";

  startConfetti();
}

// ---------- RUNAWAY BUTTON (ONLY FIRST TIME, SLOW) ----------
function runAway() {
  if (!canMoveNo || noClickedOnce) return;

  const x = Math.random() * 120 - 60;
  const y = Math.random() * 120 - 60;

  noBtn.style.transition = "transform 0.6s ease";
  noBtn.style.transform = `translate(${x}px, ${y}px)`;
}

// ---------- CONFETTI ----------
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let confetti = [];

function startConfetti() {
  for (let i = 0; i < 150; i++) {
    confetti.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 6 + 2,
      d: Math.random() * 5 + 1
    });
  }
  animateConfetti();
}

function animateConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  confetti.forEach((c) => {
    ctx.beginPath();
    ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
    ctx.fillStyle = `hsl(${Math.random() * 360}, 100%, 70%)`;
    ctx.fill();
    c.y += c.d;
    if (c.y > canvas.height) c.y = 0;
  });
  requestAnimationFrame(animateConfetti);
}
