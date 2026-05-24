// app.js
function initCountdown() {
    // -------------------------------------------------------------
    // TIMELINE CONFIGURATION ZONE (Yahan apni marzi ki timeline set karein)
    // -------------------------------------------------------------

    // OPTION A: Kisi Exact Date aur Time tak ka timer lagana ho:
    // Format: "YYYY-MM-DDTHH:MM:SS" (T lagana zaroori hai browser compatibility ke liye)
    const targetDateString = "2026-06-15T18:00:00"; // June 15, 2026, Shaam 6 baje tak
    let targetDate = new Date(targetDateString).getTime();

    /*
     *   // OPTION B: Agar client kahe "Bas aaj se exact 10 din ka timer laga do":
     *   // Is line ko un-comment (shuru se // hata) dein agar exact dino ka lagana ho:
     *   const daysFromNow = 10;
     *   targetDate = new Date().getTime() + (daysFromNow * 24 * 60 * 60 * 1000);
     */

    // Fail-safe: Agar date invalid ho ya purani ho, to automatic 14 din add kar do
    if (isNaN(targetDate) || targetDate <= new Date().getTime()) {
        console.warn("Countdown Warning: Target date invalid ya past ki thi. Reverting to 14 days safety buffer.");
        targetDate = new Date().getTime() + (14 * 24 * 60 * 60 * 1000);
    }

    // Dom Elements standard catch pointers
    const daysEl = document.getElementById("days");
    const hoursEl = document.getElementById("hours");
    const minsEl = document.getElementById("minutes");
    const secsEl = document.getElementById("seconds");

    // Main interval loop execution
    const timerInterval = setInterval(() => {
        const now = new Date().getTime();
        const difference = targetDate - now;

        // Agar time khatam ho jaye
        if (difference <= 0) {
            clearInterval(timerInterval);
            const timerSection = document.querySelector(".timer-section");
            if (timerSection) {
                timerSection.innerHTML = "<h3 style='color: var(--accent-cyan); font-size: 1.5rem; letter-spacing:1px;'>We are officially Live!</h3>";
            }
            return;
        }

        // Exact math calculation units
        const d = Math.floor(difference / (1000 * 60 * 60 * 24));
        const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((difference % (1000 * 60)) / 1000);

        // UI updating layer with strict error boundaries
        if (daysEl) daysEl.textContent = String(d).padStart(2, '0');
        if (hoursEl) hoursEl.textContent = String(h).padStart(2, '0');
        if (minsEl) minsEl.textContent = String(m).padStart(2, '0');
        if (secsEl) secsEl.textContent = String(s).padStart(2, '0');

    }, 1000);
}

// Ensure execution safely after DOM loads fully
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initCountdown);
} else {
    initCountdown();
}
