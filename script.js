// Confetti animation
function createConfetti() {
    const confettiContainer = document.getElementById('confettiContainer');
    const colors = ['#ff6b9d', '#ffa8c5', '#ffeb3b', '#ff9800', '#667eea', '#764ba2', '#f093fb'];

    // Create confetti burst after cake is complete (4 layers + candle + pour times)
    setTimeout(() => {
        for (let i = 0; i < 100; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.style.left = Math.random() * 100 + '%';
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.animationDelay = Math.random() * 0.5 + 's';
                confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';

                // Random shapes
                if (Math.random() > 0.5) {
                    confetti.style.borderRadius = '50%';
                } else {
                    confetti.style.transform = 'rotate(' + (Math.random() * 360) + 'deg)';
                }

                confettiContainer.appendChild(confetti);

                // Remove confetti after animation
                setTimeout(() => {
                    confetti.remove();
                }, 3000);
            }, i * 30);
        }
    }, 10500); // Synced with new long pouring animation
}

// Continuous confetti throughout
function continuousConfetti() {
    const confettiContainer = document.getElementById('confettiContainer');
    const colors = ['#ff6b9d', '#ffa8c5', '#ffeb3b', '#ff9800', '#667eea', '#764ba2', '#f093fb'];

    // Start after main burst
    setTimeout(() => {
        setInterval(() => {
            for (let i = 0; i < 3; i++) {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.style.left = Math.random() * 100 + '%';
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.animationDuration = (Math.random() * 2 + 3) + 's';

                if (Math.random() > 0.5) {
                    confetti.style.borderRadius = '50%';
                }

                confettiContainer.appendChild(confetti);

                setTimeout(() => {
                    confetti.remove();
                }, 5000);
            }
        }, 300);
    }, 11500);
}

// Add sparkle effect to title
function addSparkles() {
    const title = document.getElementById('title');

    setInterval(() => {
        const sparkle = document.createElement('span');
        sparkle.innerHTML = '✨';
        sparkle.style.position = 'absolute';
        sparkle.style.fontSize = '1.5rem';
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.animation = 'sparkleFloat 2s ease-out forwards';
        sparkle.style.pointerEvents = 'none';

        title.style.position = 'relative';
        title.appendChild(sparkle);

        setTimeout(() => {
            sparkle.remove();
        }, 2000);
    }, 800);
}

// Add sparkle animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes sparkleFloat {
        0% {
            opacity: 0;
            transform: translateY(0) scale(0);
        }
        50% {
            opacity: 1;
            transform: translateY(-20px) scale(1);
        }
        100% {
            opacity: 0;
            transform: translateY(-40px) scale(0);
        }
    }
`;
document.head.appendChild(style);

// Initialize animations
window.addEventListener('load', () => {
    createConfetti();
    continuousConfetti();

    setTimeout(() => {
        addSparkles();
    }, 1000);
});

// Optional: Click to blow out candle
const candle = document.getElementById('candle');
const message = document.getElementById('message');

candle.addEventListener('click', () => {
    const flame = candle.querySelector('.flame');
    flame.style.animation = 'blowOut 0.5s ease-out forwards';

    setTimeout(() => {
        flame.style.opacity = '0';
        message.textContent = 'Wish granted! 🎉';

        // Extra confetti burst
        const confettiContainer = document.getElementById('confettiContainer');
        const colors = ['#ff6b9d', '#ffa8c5', '#ffeb3b', '#ff9800', '#667eea', '#764ba2', '#f093fb'];

        for (let i = 0; i < 150; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.style.left = Math.random() * 100 + '%';
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';

                if (Math.random() > 0.5) {
                    confetti.style.borderRadius = '50%';
                }

                confettiContainer.appendChild(confetti);

                setTimeout(() => {
                    confetti.remove();
                }, 3000);
            }, i * 10);
        }
    }, 500);
});

// Add blow out animation
const blowOutStyle = document.createElement('style');
blowOutStyle.textContent = `
    @keyframes blowOut {
        0% {
            transform: scale(1);
            opacity: 1;
        }
        50% {
            transform: scale(1.3) translateX(20px);
        }
        100% {
            transform: scale(0) translateX(40px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(blowOutStyle);

// --- Music Player ---
class BirthdayMusic {
    constructor() {
        this.audioCtx = null;
        this.isPlaying = false;
        this.notes = {
            "C4": 261.63, "C#4": 277.18, "D4": 293.66, "D#4": 311.13,
            "E4": 329.63, "F4": 349.23, "F#4": 369.99, "G4": 392.00,
            "G#4": 415.30, "A4": 440.00, "A#4": 466.16, "B4": 493.88,
            "C5": 523.25, "C#5": 554.37, "D5": 587.33, "D#5": 622.25,
            "E5": 659.25, "F5": 698.46, "F#5": 739.99, "G5": 783.99
        };

        // Melody: Note, Duration (beats)
        this.melody = [
            { n: "G4", d: 1 }, { n: "G4", d: 1 }, { n: "A4", d: 2 }, { n: "G4", d: 2 }, { n: "C5", d: 2 }, { n: "B4", d: 4 },
            { n: "G4", d: 1 }, { n: "G4", d: 1 }, { n: "A4", d: 2 }, { n: "G4", d: 2 }, { n: "D5", d: 2 }, { n: "C5", d: 4 },
            { n: "G4", d: 1 }, { n: "G4", d: 1 }, { n: "G5", d: 2 }, { n: "E5", d: 2 }, { n: "C5", d: 2 }, { n: "B4", d: 2 }, { n: "A4", d: 2 },
            { n: "F5", d: 1 }, { n: "F5", d: 1 }, { n: "E5", d: 2 }, { n: "C5", d: 2 }, { n: "D5", d: 2 }, { n: "C5", d: 4 }
        ];

        this.tempo = 250; // ms per beat unit
        this.timeoutIds = [];
    }

    init() {
        if (!this.audioCtx) {
            this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
    }

    playNote(freq, duration, startTime) {
        if (!this.audioCtx) return;

        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();

        osc.type = 'triangle'; // Triangle wave sounds a bit like a chiptune/flute
        osc.frequency.value = freq;

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);

        // Envelope
        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(0.2, startTime + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration - 0.05);

        osc.start(startTime);
        osc.stop(startTime + duration);
    }

    play() {
        this.init();
        if (this.audioCtx.state === 'suspended') {
            this.audioCtx.resume();
        }

        if (this.isPlaying) return;
        this.isPlaying = true;

        let currentTime = this.audioCtx.currentTime;

        // Calculate total duration to loop
        let totalDuration = 0;
        this.melody.forEach(note => {
            const duration = (note.d * this.tempo) / 1000;
            if (note.n) {
                this.playNote(this.notes[note.n], duration, currentTime);
            }
            currentTime += duration;
            totalDuration += duration;
        });

        // Loop
        this.timeoutIds.push(setTimeout(() => {
            if (this.isPlaying) this.play();
        }, totalDuration * 1000));
    }

    stop() {
        this.isPlaying = false;

        this.timeoutIds.forEach(id => clearTimeout(id));
        this.timeoutIds = [];

        if (this.audioCtx) {
            this.audioCtx.suspend();
        }
    }
}

const musicPlayer = new BirthdayMusic();

// Function to handle first user interaction
function enableAudio() {
    // Remove listeners immediately to prevent double-trigger
    document.removeEventListener('click', enableAudio);
    document.removeEventListener('touchstart', enableAudio);
    document.removeEventListener('keydown', enableAudio);

    // Initialize/Resume AudioContext
    if (!musicPlayer.audioCtx) {
        musicPlayer.init();
    }

    if (musicPlayer.audioCtx.state === 'suspended') {
        musicPlayer.audioCtx.resume().then(() => {
            if (!musicPlayer.isPlaying) musicPlayer.play();
        });
    } else {
        if (!musicPlayer.isPlaying) musicPlayer.play();
    }
}

// Add listeners for various user interactions
document.addEventListener('click', enableAudio);
document.addEventListener('touchstart', enableAudio);
document.addEventListener('keydown', enableAudio);

// Attempt to autoplay for browsers that allow it (rare, but possible)
// We wrap this in a short timeout to ensure DOM is ready and doesn't block main thread
setTimeout(() => {
    try {
        if (!musicPlayer.audioCtx) musicPlayer.init();
        if (musicPlayer.audioCtx.state === 'running') {
            musicPlayer.play();
            // If successful, remove listeners
            document.removeEventListener('click', enableAudio);
            document.removeEventListener('touchstart', enableAudio);
            document.removeEventListener('keydown', enableAudio);
        }
    } catch (e) {
        // Autoplay failed, waiting for interaction
    }
}, 1000);
