/* ==========================
   DIRECT PAGE FLOW & MUSIC TRIGGER
   ========================== */

let musicActivated = false;

window.addEventListener("load", () => {
    // 2-second initial loader
    setTimeout(() => {
        const loader = document.getElementById("loader");
        const mainContent = document.getElementById("mainContent");
        
        if (loader) {
            loader.style.opacity = "0";
            setTimeout(() => {
                loader.style.display = "none";
                
                // Reveal main content directly
                if (mainContent) {
                    mainContent.style.display = "block";
                    // Trigger fade-in
                    setTimeout(() => {
                        mainContent.style.opacity = "1";
                    }, 50);
                }

                // Start systems
                startCounters();
                initializeBubbles();
                startInteractiveChat();
                triggerHeroEffects();
            }, 800);
        }
    }, 2000);
});

// Setup click/touch listener for browser audio autoplay
document.addEventListener("click", activateMusicOnInteraction);
document.addEventListener("touchstart", activateMusicOnInteraction);

function activateMusicOnInteraction() {
    if (musicActivated) return;
    
    const audio = document.getElementById("bgAudio");
    const player = document.getElementById("musicPlayer");
    const btn = document.getElementById("playPauseBtn");

    if (audio) {
        audio.play().then(() => {
            musicActivated = true;
            player.classList.add("playing");
            btn.innerText = "⏸️";
            startLyricsCycle();
            // Remove listeners
            document.removeEventListener("click", activateMusicOnInteraction);
            document.removeEventListener("touchstart", activateMusicOnInteraction);
        }).catch(err => {
            console.log("Audio play postponed or failed.", err);
        });
    }
}


/* ==========================
   TYPEWRITER EFFECT (HERO)
   ========================== */

const typewriterText = "Some people become important unexpectedly, and somehow stay important every day. You are one of those rare people who bring pure comfort and smiles. ✨";
let typewriterIndex = 0;

function runTypewriter() {
    const target = document.getElementById("typewriter");
    if (!target) return;

    if (typewriterIndex < typewriterText.length) {
        target.innerHTML += typewriterText.charAt(typewriterIndex);
        typewriterIndex++;
        setTimeout(runTypewriter, 45);
    }
}

function triggerHeroEffects() {
    setTimeout(runTypewriter, 600);
}


/* ==========================
   AMBIENT MUSIC PLAYER & LYRICS
   ========================== */

const lyrics = [
    "Tu jo mila toh saare gham beh gaye... 💜",
    "Kaise bataayein kyun tujhko chaahein... ✨",
    "Tumse hi din hota hai, tumse hi shaam... 🌹",
    "Zindagi mein tum mile toh har khushi mil gayi... 🌸",
    "Dil ibaadat kar raha hai, dhadkanein meri sun... 💓",
    "Tere bina jeena lagta hai ek sazaa... 💕",
    "Tumse milna meri zindagi ki sabse haseen baat hai... Urf Dev Sena ❤️",
    "Aap jaisa koi meri zindagi mein aaye toh baat ban jaaye... 🌟",
    "Main agar kahoon tumsa haseen, toh sach kahunga... 🥰"
];

let lyricIndex = 0;
let lyricInterval = null;

function togglePlay() {
    const audio = document.getElementById("bgAudio");
    const player = document.getElementById("musicPlayer");
    const btn = document.getElementById("playPauseBtn");

    // Mark music as activated if toggled manually
    musicActivated = true;

    if (audio.paused) {
        audio.play();
        player.classList.add("playing");
        btn.innerText = "⏸️";
        startLyricsCycle();
    } else {
        audio.pause();
        player.classList.remove("playing");
        btn.innerText = "▶️";
        stopLyricsCycle();
    }
}

function startLyricsCycle() {
    if (lyricInterval) clearInterval(lyricInterval);
    showNextLyric();
    lyricInterval = setInterval(showNextLyric, 6000);
}

function stopLyricsCycle() {
    if (lyricInterval) clearInterval(lyricInterval);
    const overlay = document.getElementById("lyricsOverlay");
    overlay.classList.remove("show");
}

function showNextLyric() {
    const overlay = document.getElementById("lyricsOverlay");
    const textEl = document.getElementById("lyricsText");
    if (!overlay || !textEl) return;
    
    overlay.classList.remove("show");
    
    setTimeout(() => {
        textEl.innerText = lyrics[lyricIndex];
        overlay.classList.add("show");
        lyricIndex = (lyricIndex + 1) % lyrics.length;
    }, 500);
}


/* ==========================
   SPARKLE CURSOR TRAIL
   ========================== */

document.addEventListener("mousemove", (e) => {
    spawnSpark(e.clientX, e.clientY);
});

document.addEventListener("touchmove", (e) => {
    if (e.touches.length > 0) {
        spawnSpark(e.touches[0].clientX, e.touches[0].clientY);
    }
});

function spawnSpark(x, y) {
    if (Math.random() > 0.15) return;

    const spark = document.createElement("div");
    spark.classList.add("spark");
    
    const elements = ["❤️", "💜", "✨", "🌸", "🌹"];
    spark.innerText = elements[Math.floor(Math.random() * elements.length)];
    
    spark.style.left = x + "px";
    spark.style.top = y + "px";
    
    const mx = (Math.random() - 0.5) * 100 + "px";
    const my = (Math.random() - 0.5) * 100 + "px";
    spark.style.setProperty("--mx", mx);
    spark.style.setProperty("--my", my);
    
    document.body.appendChild(spark);
    
    setTimeout(() => {
        spark.remove();
    }, 1000);
}


/* ==========================
   ROSE PETALS & FIREFLIES
   ========================== */

function createPetal() {
    const petalsContainer = document.getElementById("petals");
    if (!petalsContainer || window.getComputedStyle(document.getElementById("mainContent")).display !== "block") return;
    
    const petal = document.createElement("div");
    petal.classList.add("petal");
    
    const flowers = ["🌹", "🌸", "💜", "✨", "💖"];
    petal.innerHTML = flowers[Math.floor(Math.random() * flowers.length)];
    petal.style.left = Math.random() * 100 + "vw";
    petal.style.fontSize = (15 + Math.random() * 20) + "px";
    petal.style.animationDuration = (5 + Math.random() * 7) + "s";
    
    petal.animate([
        { transform: "translateX(0) rotate(0deg)" },
        { transform: `translateX(${(Math.random() - 0.5) * 50}px) rotate(${360 + Math.random() * 360}deg)` }
    ], {
        duration: 5000 + Math.random() * 5000,
        iterations: 1,
        easing: "linear"
    });

    petalsContainer.appendChild(petal);
    
    setTimeout(() => {
        petal.remove();
    }, 10000);
}

function createFirefly() {
    const firefliesContainer = document.getElementById("fireflies");
    if (!firefliesContainer || window.getComputedStyle(document.getElementById("mainContent")).display !== "block") return;
    
    const fly = document.createElement("div");
    fly.classList.add("firefly");
    fly.style.left = Math.random() * 100 + "vw";
    fly.style.bottom = "-10px";
    fly.style.animationDuration = (6 + Math.random() * 6) + "s";
    
    firefliesContainer.appendChild(fly);
    
    setTimeout(() => {
        fly.remove();
    }, 12000);
}

setInterval(createPetal, 450);
setInterval(createFirefly, 900);


/* ==========================
   BLOOMING ROSE
   ========================== */

function bloomRose() {
    const wrapper = document.getElementById("roseWrapper");
    const msg = document.getElementById("roseMessage");

    wrapper.classList.toggle("bloomed");
    
    if (wrapper.classList.contains("bloomed")) {
        msg.style.display = "block";
        createLocalExplosion(wrapper);
    } else {
        msg.style.display = "none";
    }
}

function createLocalExplosion(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const heart = document.createElement("div");
            heart.innerText = ["❤️", "💜", "✨"][Math.floor(Math.random() * 3)];
            heart.style.position = "fixed";
            heart.style.left = centerX + "px";
            heart.style.top = centerY + "px";
            heart.style.zIndex = "999";
            heart.style.pointerEvents = "none";
            
            document.body.appendChild(heart);

            const duration = 1500 + Math.random() * 1000;
            const destX = (Math.random() - 0.5) * 300;
            const destY = (Math.random() - 0.5) * 300 - 100;

            heart.animate([
                { transform: "translate(0, 0) scale(1)", opacity: 1 },
                { transform: `translate(${destX}px, ${destY}px) scale(0)`, opacity: 0 }
            ], {
                duration: duration,
                easing: "cubic-bezier(0.1, 0.8, 0.3, 1)"
            });

            setTimeout(() => heart.remove(), duration);
        }, i * 20);
    }
}


/* ==========================
   INTERACTIVE CHAT GAME (CHOICE BASED)
   ========================== */

const chatMessages = document.getElementById("chatMessages");
const chatStatus = document.getElementById("chatStatus");
const chatChoices = document.getElementById("chatChoices");

function startInteractiveChat() {
    if (!chatMessages) return;
    
    // Initial message from Me
    sendMeMessage("Hey, I was just thinking about you... Can I ask you something? 🙈", 1800, () => {
        showChoices([
            { text: "Sure, ask away! 💜", nextStage: stage1A },
            { text: "Only if it's sweet! 🌸", nextStage: stage1B }
        ]);
    });
}

function sendMeMessage(text, delay, callback) {
    chatStatus.innerText = "Typing...";
    
    setTimeout(() => {
        chatStatus.innerText = "Online";
        
        const bubble = document.createElement("div");
        bubble.classList.add("msg-bubble", "msg-sent");
        bubble.innerText = text;
        chatMessages.appendChild(bubble);
        
        // Auto scroll
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        if (callback) callback();
    }, delay);
}

function receiveJassiMessage(text, callback) {
    // Render immediately since she clicked the choice button
    const bubble = document.createElement("div");
    bubble.classList.add("msg-bubble", "msg-received");
    bubble.innerText = text;
    chatMessages.appendChild(bubble);
    
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    if (callback) callback();
}

function showChoices(options) {
    chatChoices.innerHTML = "";
    
    options.forEach(opt => {
        const btn = document.createElement("button");
        btn.classList.add("chat-choice-btn");
        btn.innerText = opt.text;
        btn.onclick = () => {
            // Disable choices and clear
            chatChoices.innerHTML = "";
            
            // Render selection as received message
            receiveJassiMessage(opt.text, () => {
                opt.nextStage();
            });
        };
        chatChoices.appendChild(btn);
    });
}

// Stage Functions
function stage1A() {
    sendMeMessage("Do you know that you make my ordinary days feel special? Just seeing a text notification from you brings a smile to my face... 😊", 2500, () => {
        showChoices([
            { text: "Aww, really? Stop making me blush! 🙈", nextStage: stage2A },
            { text: "I feel the same way talking to you... 💜", nextStage: stage2B }
        ]);
    });
}

function stage1B() {
    sendMeMessage("It is definitely sweet! Do you know that your vibe is like absolute peace? Just seeing a notification from you makes my tiring days feel light.", 2500, () => {
        showChoices([
            { text: "Really? You're so good with words! 🥰", nextStage: stage2A },
            { text: "That is incredibly lovely to hear... 😭💜", nextStage: stage2B }
        ]);
    });
}

function stage2A() {
    sendMeMessage("Sach mein. You are like my habit of happiness now. Tum hamesha muskuraati raha karo, Dev Sena urf Jassi ❤️", 2500, () => {
        showChoices([
            { text: "I promise to keep smiling! 🥰", nextStage: stageFinal },
            { text: "You just made this my best day! 💜", nextStage: stageFinal }
        ]);
    });
}

function stage2B() {
    sendMeMessage("Knowing that makes me so happy. You are a very rare and precious part of my life. Pls always stay as sweet as you are, Jassi! 🌹", 2500, () => {
        showChoices([
            { text: "I will! Thank you for this... 🥺❤️", nextStage: stageFinal },
            { text: "This surprise is so wonderful! 🌸", nextStage: stageFinal }
        ]);
    });
}

function stageFinal() {
    sendMeMessage("That's all I wanted. Here's a little shower of love for my Dev Sena... 💜✨", 1800, () => {
        chatStatus.innerText = "Online & Blushing 🥰";
        
        // Massive heart cascade
        createConfettiRain();
        // Trigger visual boom in chat container
        createLocalExplosion(chatMessages);
    });
}


/* ==========================
   BUBBLE POP COMPLIMENTS
   ========================== */

const bubbleCompliments = [
    "💜 Your smile has a literal therapeutic glow.",
    "✨ You make even ordinary text conversations feel like magic.",
    "🌸 Your kindness is an extremely rare gem in this world.",
    "🌹 Every single day I converse with you becomes a happy day.",
    "👑 You are Urf Dev Sena, my absolute favorite princess! ❤️",
    "💎 You have the purest and most beautiful soul.",
    "🌟 Talking to you instantly eases all my daily stress."
];

function initializeBubbles() {
    const container = document.getElementById("bubblesContainer");
    if (!container) return;
    container.innerHTML = "";

    const count = bubbleCompliments.length;

    for (let i = 0; i < count; i++) {
        const bubble = document.createElement("div");
        bubble.classList.add("compliment-bubble");
        bubble.innerText = "🎈";
        
        const left = 5 + Math.random() * 80;
        const top = 10 + Math.random() * 60;
        bubble.style.left = left + "%";
        bubble.style.top = top + "%";
        
        bubble.style.animationDuration = (4 + Math.random() * 5) + "s";
        bubble.style.animationDelay = (Math.random() * 3) + "s";
        
        bubble.addEventListener("click", () => {
            popBubble(bubble, i);
        });

        container.appendChild(bubble);
    }
}

function popBubble(bubble, index) {
    bubble.style.transform = "scale(1.8)";
    bubble.style.opacity = "0";
    bubble.style.pointerEvents = "none";
    
    createLocalExplosion(bubble);
    
    const textEl = document.getElementById("bubbleText");
    if (!textEl) return;
    textEl.style.opacity = "0";
    
    setTimeout(() => {
        textEl.innerText = bubbleCompliments[index];
        textEl.style.opacity = "1";
        textEl.animate([
            { transform: "scale(0.95)", opacity: 0 },
            { transform: "scale(1)", opacity: 1 }
        ], {
            duration: 500,
            easing: "ease-out"
        });
        bubble.remove();
    }, 200);
}


/* ==========================
   3D ENVELOPE & LETTER
   ========================== */

function openEnvelope() {
    const wrapper = document.getElementById("envelopeWrapper");
    if (!wrapper) return;
    wrapper.classList.add("open");
    
    setTimeout(() => {
        const overlay = document.getElementById("letterOverlay");
        if (overlay) {
            overlay.style.display = "flex";
            setTimeout(() => {
                overlay.classList.add("show");
            }, 50);
        }
    }, 1000);
}

function closeEnvelope() {
    const overlay = document.getElementById("letterOverlay");
    const wrapper = document.getElementById("envelopeWrapper");
    
    if (overlay) overlay.classList.remove("show");
    
    setTimeout(() => {
        if (overlay) overlay.style.display = "none";
        if (wrapper) wrapper.classList.remove("open");
    }, 500);
}


/* ==========================
   THEME SWITCHING
   ========================== */

function setTheme(theme) {
    if (theme === "purple") {
        document.body.style.background = "radial-gradient(circle at 50% 50%, #20002c, #07000d)";
    }
    if (theme === "dark") {
        document.body.style.background = "radial-gradient(circle at 50% 50%, #111, #000)";
    }
    if (theme === "pink") {
        document.body.style.background = "radial-gradient(circle at 50% 50%, #3a0017, #070002)";
    }
}


/* ==========================
   SCROLL REVEAL ANIMATIONS
   ========================== */

window.addEventListener("scroll", revealElements);

function revealElements() {
    const reveals = document.querySelectorAll(".reveal");
    const windowHeight = window.innerHeight;

    reveals.forEach(el => {
        const top = el.getBoundingClientRect().top;
        if (top < windowHeight - 80) {
            el.classList.add("active");
        }
    });
}


/* ==========================
   STATS COUNTERS
   ========================= */

function startCounters() {
    const counters = document.querySelectorAll(".counter");
    counters.forEach(counter => {
        const target = +counter.getAttribute("data-target");
        let count = 0;
        const increment = target / 120;

        const updateCount = () => {
            count += increment;
            if (count < target) {
                counter.innerText = Math.floor(count);
                requestAnimationFrame(updateCount);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    });
}


/* ==========================
   CONFETTI RAIN (FINAL SURPRISE)
   ========================== */

const surpriseBtn = document.getElementById("surpriseBtn");
if (surpriseBtn) {
    surpriseBtn.addEventListener("click", () => {
        createConfettiRain();
        const msg = document.getElementById("finalMessage");
        if (msg) {
            msg.style.display = "block";
            setTimeout(() => {
                msg.scrollIntoView({ behavior: "smooth" });
            }, 100);
        }
    });
}

function createConfettiRain() {
    for (let i = 0; i < 150; i++) {
        setTimeout(() => {
            const confetti = document.createElement("div");
            confetti.innerText = ["💜", "✨", "🌹", "🌸", "❤️"][Math.floor(Math.random() * 5)];
            confetti.style.position = "fixed";
            confetti.style.left = Math.random() * 100 + "vw";
            confetti.style.top = "-50px";
            confetti.style.fontSize = (15 + Math.random() * 25) + "px";
            confetti.style.zIndex = "99999";
            confetti.style.pointerEvents = "none";
            
            document.body.appendChild(confetti);

            const duration = 3000 + Math.random() * 3000;
            confetti.animate([
                { transform: "translateY(0) rotate(0deg)" },
                { transform: `translateY(${window.innerHeight + 100}px) rotate(${360 + Math.random() * 720}deg)` }
            ], {
                duration: duration,
                easing: "linear"
            });

            setTimeout(() => confetti.remove(), duration);
        }, i * 15);
    }
}

/* ==========================
   EMOTIONAL CARE PACKAGE (MOOD SELECTOR)
   ========================== */

const moodResponses = {
    happy: "Yesss! Aise hi khush raha karo. Tumhari smile hi toh meri favorite cheez hai is duniya mein. Chalo ab isi baat par aur muskurao! 💜✨",
    tired: "Oh, exhausting day? Ek virtual hand-massage, ek garam cup of tea ☕, aur bahut saara sukoon aapke liye. Sab theek ho jayega, ab thoda relax karo. 🌸",
    sad: "Hey, please don't be sad. Tumhare chehre par smile hi sabse acchi lagti hai. Main hamesha hoon tumse baat karne ke liye, jab bhi man kare. 🌹",
    missing: "Aww... main bhi! 😊 Dil se yaad karogi toh main haazir ho jaunga. Here's a big virtual hug 🫂 just for my Dev Sena."
};

function selectMood(mood) {
    const responseEl = document.getElementById("moodResponse");
    if (!responseEl) return;

    responseEl.style.display = "block";
    responseEl.innerText = moodResponses[mood];
    
    // Heart sparkles explosion on click
    const activeBtn = document.querySelector(`.mood-btn[onclick*="${mood}"]`);
    if (activeBtn) {
        createLocalExplosion(activeBtn);
    }
}