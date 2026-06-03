/* ==========================
   PASSWORD
========================== */

const PASSWORD = "jassi1710";

function checkPassword() {

    const pass = document.getElementById("password").value;

    if (pass === PASSWORD) {

        document.getElementById("passwordScreen").style.display = "none";

        document.getElementById("mainContent").style.display = "block";

        startCounters();

    } else {

        document.getElementById("error").innerText =
            "Wrong Password 💜";

    }
}

/* ==========================
   LOADER
========================== */

window.addEventListener("load", () => {

    setTimeout(() => {

        document.getElementById("loader").style.display = "none";

    }, 2500);

});

/* ==========================
   TYPEWRITER
========================== */

const text =

"Some people become important unexpectedly, and somehow stay important every day. ✨";

let index = 0;

function typeWriter() {

    const target = document.getElementById("typewriter");

    if (!target) return;

    if (index < text.length) {

        target.innerHTML += text.charAt(index);

        index++;

        setTimeout(typeWriter, 50);
    }
}

setTimeout(typeWriter, 1200);

/* ==========================
   COUNTERS
========================== */

function startCounters() {

    const counters =
        document.querySelectorAll(".counter");

    counters.forEach(counter => {

        const target =
            +counter.getAttribute("data-target");

        let count = 0;

        const speed = target / 100;

        const updateCounter = () => {

            count += speed;

            if (count < target) {

                counter.innerText =
                    Math.floor(count);

                requestAnimationFrame(updateCounter);

            } else {

                counter.innerText = target;
            }
        };

        updateCounter();

    });

}

/* ==========================
   ROSE PETALS
========================== */

function createPetal() {

    const petal =
        document.createElement("div");

    petal.classList.add("petal");

    const flowers = [
        "🌹",
        "🌸",
        "💜",
        "✨"
    ];

    petal.innerHTML =
        flowers[
        Math.floor(
            Math.random() * flowers.length
        )
        ];

    petal.style.left =
        Math.random() * 100 + "vw";

    petal.style.fontSize =
        (20 + Math.random() * 20) + "px";

    petal.style.animationDuration =
        (6 + Math.random() * 8) + "s";

    document.body.appendChild(petal);

    setTimeout(() => {

        petal.remove();

    }, 15000);
}

setInterval(createPetal, 350);

/* ==========================
   FIREFLIES
========================== */

function createFirefly() {

    const fly =
        document.createElement("div");

    fly.classList.add("firefly");

    fly.style.left =
        Math.random() * window.innerWidth + "px";

    fly.style.top =
        Math.random() * window.innerHeight + "px";

    document.body.appendChild(fly);

    setTimeout(() => {

        fly.remove();

    }, 10000);

}

setInterval(createFirefly, 700);

/* ==========================
   HIDDEN COMPLIMENTS
========================== */

const compliments = [

    "💜 You have a beautiful heart.",

    "✨ Your smile can brighten someone's day.",

    "🌸 You're genuinely special.",

    "🌹 Talking to you feels comforting.",

    "👑 There is only one Jassi."

];

const buttons =
    document.querySelectorAll(".compliment-btn");

const complimentBox =
    document.getElementById("complimentText");

buttons.forEach((btn, i) => {

    btn.addEventListener("click", () => {

        complimentBox.innerHTML =
            compliments[i];

        btn.disabled = true;

        btn.style.opacity = ".6";

    });

});

/* ==========================
   LETTER
========================== */

function openLetter() {

    const letter =
        document.getElementById("letter");

    if (
        letter.style.display === "block"
    ) {

        letter.style.display = "none";

    } else {

        letter.style.display = "block";

        letter.scrollIntoView({
            behavior: "smooth"
        });

    }
}

/* ==========================
   THEME SWITCHER
========================== */

function setTheme(theme) {

    if (theme === "purple") {

        document.body.style.background =
            "linear-gradient(135deg,#2b003d,#4b0082,#6a0dad,#8a2be2)";

    }

    if (theme === "dark") {

        document.body.style.background =
            "linear-gradient(135deg,#000,#111,#222,#333)";

    }

    if (theme === "pink") {

        document.body.style.background =
            "linear-gradient(135deg,#ff9a9e,#fad0c4,#fbc2eb,#f6d365)";
    }
}

/* ==========================
   SCROLL REVEAL
========================== */

const reveals =
    document.querySelectorAll(
        "section,.reason-card,.poem-card,.timeline-item"
    );

function revealElements() {

    reveals.forEach(el => {

        const top =
            el.getBoundingClientRect().top;

        const windowHeight =
            window.innerHeight;

        if (top < windowHeight - 100) {

            el.classList.add("active");
            el.classList.add("reveal");

        }
    });
}

window.addEventListener(
    "scroll",
    revealElements
);

revealElements();

/* ==========================
   CONFETTI
========================== */

function createConfetti() {

    for (let i = 0; i < 120; i++) {

        const confetti =
            document.createElement("div");

        confetti.innerHTML =
            ["💜", "✨", "🌹", "🌸"][
            Math.floor(Math.random() * 4)
            ];

        confetti.style.position = "fixed";
        confetti.style.left =
            Math.random() * 100 + "vw";
        confetti.style.top = "-50px";
        confetti.style.fontSize =
            (15 + Math.random() * 20) + "px";
        confetti.style.zIndex = "9999";
        confetti.style.pointerEvents = "none";

        document.body.appendChild(confetti);

        const duration =
            4000 + Math.random() * 3000;

        confetti.animate(
            [
                {
                    transform:
                        "translateY(0px) rotate(0deg)"
                },
                {
                    transform:
                        `translateY(${window.innerHeight + 200}px) rotate(720deg)`
                }
            ],
            {
                duration: duration,
                easing: "linear"
            }
        );

        setTimeout(() => {

            confetti.remove();

        }, duration);

    }
}

/* ==========================
   FINAL SURPRISE
========================== */

const surpriseBtn =
    document.getElementById(
        "surpriseBtn"
    );

if (surpriseBtn) {

    surpriseBtn.addEventListener(
        "click",
        () => {

            createConfetti();

            const msg =
                document.getElementById(
                    "finalMessage"
                );

            msg.style.display = "block";

            msg.scrollIntoView({
                behavior: "smooth"
            });

        }
    );
}

/* ==========================
   SECRET MESSAGE
========================== */

let openedCards = 0;

buttons.forEach(btn => {

    btn.addEventListener("click", () => {

        openedCards++;

        if (openedCards === 5) {

            setTimeout(() => {

                alert(
                    "💜 Secret Unlocked 💜\n\nYou are one of the nicest things that ever happened in my life."
                );

            }, 500);

        }

    });

});

/* ==========================
   CURSOR GLOW
========================== */

const glow =
    document.createElement("div");

glow.style.position = "fixed";
glow.style.width = "20px";
glow.style.height = "20px";
glow.style.borderRadius = "50%";
glow.style.background =
    "rgba(255,255,255,.4)";
glow.style.pointerEvents = "none";
glow.style.zIndex = "99999";
glow.style.backdropFilter = "blur(3px)";

document.body.appendChild(glow);

document.addEventListener(
    "mousemove",
    (e) => {

        glow.style.left =
            e.clientX - 10 + "px";

        glow.style.top =
            e.clientY - 10 + "px";

    }
);