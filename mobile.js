

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => { });
}
// mobile.js — NullFrag Mobile Enhancements
(() => {
    const isMobile =
        /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ||
        window.innerWidth <= 768;

    if (!isMobile) return;

    /* ---------------- Viewport Stability ---------------- */
    function fixViewport() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }

    fixViewport();
    window.addEventListener("resize", fixViewport);

    /* ---------------- Reduce Motion ---------------- */
    const reduceMotion =
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    window.NF_MOBILE = {
        isMobile: true,
        reduceMotion
    };

    /* ---------------- Mobile Warning ---------------- */
    function showMobileWarning() {
        if (localStorage.getItem("nf_mobile_seen")) return;

        const warn = document.createElement("div");
        warn.textContent =
            "⚠️ Mobile detected — best experienced on desktop / laptop";

        Object.assign(warn.style, {
            position: "fixed",
            bottom: "70px",
            left: "50%",
            transform: "translateX(-50%)",
            background: "rgba(0,0,0,0.92)",
            color: "#ffcc00",
            padding: "10px 14px",
            border: "1px solid #333",
            borderRadius: "6px",
            fontFamily: "Consolas, monospace",
            fontSize: "12px",
            zIndex: "999999",
            opacity: "1",
            transition: "opacity 0.6s ease",
            pointerEvents: "none"
        });

        document.body.appendChild(warn);

        setTimeout(() => {
            warn.style.opacity = "0";
            setTimeout(() => warn.remove(), 700);
        }, 6000);

        localStorage.setItem("nf_mobile_seen", "1");
    }

    window.addEventListener("load", () => {
        setTimeout(showMobileWarning, 800);
    });

    function setVH() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }

    // run once
    setVH();

    // run again ONLY on rotation
    window.addEventListener('orientationchange', () => {
        setTimeout(setVH, 300);
    });


    /* ---------------- Tap Anywhere to Focus ---------------- */
    document.addEventListener("touchstart", e => {
        const terminal = document.getElementById("terminal");
        const cmd = document.getElementById("cmd");

        if (!terminal || !cmd) return;
        if (terminal.contains(e.target)) {
            cmd.focus();
        }
    });

})();
