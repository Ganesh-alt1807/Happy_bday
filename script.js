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
