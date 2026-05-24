// app.js
function initCyberCountdown() {
    // Specific Timeline Parameter: Aaj se exact 7 din agay ka asset deploy karein
    const targetDate = new Date().getTime() + (7 * 24 * 60 * 60 * 1000);

    const daysEl = document.getElementById("days");
    const hoursEl = document.getElementById("hours");
    const minsEl = document.getElementById("minutes");
    const secsEl = document.getElementById("seconds");

    const interval = setInterval(() => {
        const now = new Date().getTime();
        const diff = targetDate - now;

        if (diff <= 0) {
            clearInterval(interval);
            document.querySelector(".neon-timer-grid").innerHTML = "<div style='color:var(--neon-pink); width:100%; grid-column:1/-1;'>ACCESS_GRANTED: SYSTEM_IS_LIVE</div>";
            return;
        }

        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);

        if (daysEl) daysEl.textContent = String(d).padStart(2, '0');
        if (hoursEl) hoursEl.textContent = String(h).padStart(2, '0');
        if (minsEl) minsEl.textContent = String(m).padStart(2, '0');
        if (secsEl) secsEl.textContent = String(s).padStart(2, '0');
    }, 1000);
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initCyberCountdown);
} else {
    initCyberCountdown();
}
