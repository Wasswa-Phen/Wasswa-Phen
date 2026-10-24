/**
 * ============================================================================
 * PHENY PORTFOLIO — CORE APPLICATION SCRIPT (site.js)
 * Creative Technologist · Wasswa Stephen · Kampala, Uganda
 *
 * Handles:
 * 1. Lucide icons initialization
 * 2. Mobile navigation drawer with body scroll unlock on browser Back (pageshow)
 * 3. Back to Top floating button
 * 4. Contact and Project Brief form handlers with honeypot, cooldown & length limits
 * 5. Subtle IntersectionObserver animations using CSS `translate` and `opacity`
 * ============================================================================
 */

(function () {
    "use strict";

    // Exact Google Apps Script Web App URL already configured in index.html
    const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyrB9bh0K9ZrwxAG4yKNEXuwapAk04Aa56mRMX_h6dCXZoP54LdEUwH1793dcue1Uw2/exec";
    const COOLDOWN_KEY = "pheny_form_cooldown";
    const COOLDOWN_SECONDS = 30;

    /* ------------------------------------------------------------------------
       1. LUCIDE ICONS INITIALIZATION
       ------------------------------------------------------------------------ */
    function initIcons() {
        if (typeof lucide !== "undefined" && lucide.createIcons) {
            lucide.createIcons();
        }
    }

    /* ------------------------------------------------------------------------
       2. MOBILE MENU CONTROLLER
       ------------------------------------------------------------------------ */
    function initMobileMenu() {
        const menuToggle = document.getElementById("menu-toggle");
        const mobileMenu = document.getElementById("mobile-menu");
        const menuClose = document.getElementById("menu-close");

        if (!menuToggle || !mobileMenu) return;

        function openMobileMenu() {
            mobileMenu.classList.add("is-open");
            menuToggle.setAttribute("aria-expanded", "true");
            menuToggle.setAttribute("aria-label", "Close navigation menu");
            document.body.style.overflow = "hidden";
        }

        function closeMobileMenu() {
            mobileMenu.classList.remove("is-open");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open navigation menu");
            document.body.style.overflow = "";
        }

        menuToggle.addEventListener("click", () => {
            const isOpen = mobileMenu.classList.contains("is-open");
            if (isOpen) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });

        if (menuClose) {
            menuClose.addEventListener("click", closeMobileMenu);
        }

        // Close when clicking any link inside the mobile menu
        mobileMenu.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                closeMobileMenu();
            });
        });

        // Close on Escape key press
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && mobileMenu.classList.contains("is-open")) {
                closeMobileMenu();
            }
        });

        // Close if resized to desktop viewport
        window.addEventListener("resize", () => {
            if (window.innerWidth >= 1024 && mobileMenu.classList.contains("is-open")) {
                closeMobileMenu();
            }
        });

        // Critical: Always release scroll lock on browser Back / forward (pageshow)
        window.addEventListener("pageshow", () => {
            closeMobileMenu();
        });
    }

    /* ------------------------------------------------------------------------
       3. FLOATING BACK TO TOP BUTTON
       ------------------------------------------------------------------------ */
    function initBackToTop() {
        const backToTopBtn = document.getElementById("back-to-top");
        if (!backToTopBtn) return;

        const toggleBackToTop = () => {
            if (window.scrollY > 350) {
                backToTopBtn.classList.add("is-visible");
            } else {
                backToTopBtn.classList.remove("is-visible");
            }
        };

        window.addEventListener("scroll", toggleBackToTop, { passive: true });
        toggleBackToTop();

        backToTopBtn.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    /* ------------------------------------------------------------------------
       4. FORMS HANDLER (CONTACT & START-PROJECT)
       ------------------------------------------------------------------------ */
    function initForms() {
        const forms = [
            { id: "inquiry-form", type: "inquiry", submitId: "submit-inquiry", statusId: "form-status" },
            { id: "project-form", type: "project", submitId: "submit-project", statusId: "form-status" }
        ];

        forms.forEach(({ id, type, submitId, statusId }) => {
            const form = document.getElementById(id);
            if (!form) return;

            const submitButton = document.getElementById(submitId) || form.querySelector('button[type="submit"]');
            const submitText = submitButton ? submitButton.querySelector("span") : null;
            const status = document.getElementById(statusId) || form.querySelector('[role="status"]');

            function setStatus(message, messageType) {
                if (!status) return;
                status.textContent = message;
                let colorClass = "text-slate-600";
                if (messageType === "success") colorClass = "text-emerald-700 font-semibold";
                if (messageType === "error") colorClass = "text-red-700 font-semibold";
                if (messageType === "info") colorClass = "text-blue-700";
                status.className = "mt-4 min-h-6 text-sm transition-all " + colorClass;
            }

            form.addEventListener("submit", async (event) => {
                event.preventDefault();

                if (!form.checkValidity()) {
                    form.reportValidity();
                    return;
                }

                // 1. Honeypot check (field named 'botcheck' or 'website')
                const honeypot = form.querySelector('[name="botcheck"]') || form.querySelector('[name="website"]');
                if (honeypot && honeypot.value.trim().length > 0) {
                    // Silently fake success for bots
                    setStatus("Message sent. If you don't hear back, message me on WhatsApp.", "success");
                    form.reset();
                    return;
                }

                // 2. Cooldown check (30 seconds)
                const lastSubmitTime = localStorage.getItem(COOLDOWN_KEY);
                if (lastSubmitTime) {
                    const elapsed = (Date.now() - parseInt(lastSubmitTime, 10)) / 1000;
                    if (elapsed < COOLDOWN_SECONDS) {
                        const remaining = Math.ceil(COOLDOWN_SECONDS - elapsed);
                        setStatus(`Please wait ${remaining} seconds before submitting again, or message Stephen directly on WhatsApp at +256 701 951404.`, "error");
                        return;
                    }
                }

                const formData = new FormData(form);
                const name = (formData.get("name") || "").trim();
                const email = (formData.get("email") || "").trim();
                const message = (formData.get("message") || "").trim();
                const phone = (formData.get("phone") || "").trim();
                const service = (formData.get("service") || "").trim();
                const budget = (formData.get("budget") || "").trim();
                const timeline = (formData.get("timeline") || "").trim();
                const details = (formData.get("details") || "").trim();

                // Length limits validation
                if (name.length > 100) {
                    setStatus("Name exceeds 100 characters limit.", "error");
                    return;
                }
                if (email.length > 254) {
                    setStatus("Email exceeds 254 characters limit.", "error");
                    return;
                }
                if (message.length > 2000 || details.length > 2000) {
                    setStatus("Message exceeds 2000 characters limit.", "error");
                    return;
                }

                // If Google Apps Script URL is empty, fallback to mailto
                if (!GOOGLE_SCRIPT_URL) {
                    const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
                    const body = encodeURIComponent(`Hello Stephen,\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nService: ${service}\nBudget: ${budget}\n\nMessage:\n${message || details}\n`);
                    const mailtoUrl = `mailto:wasswastephen24@gmail.com?subject=${subject}&body=${body}`;

                    setStatus("Opening your email client... You can also reach Stephen directly on WhatsApp at +256 701 951404.", "info");
                    window.location.href = mailtoUrl;
                    return;
                }

                // Loading state
                if (submitButton) submitButton.disabled = true;
                const originalText = submitText ? submitText.textContent : "Submit";
                if (submitText) submitText.textContent = "Sending...";
                setStatus("Sending your message directly to Stephen...", "info");

                const payload = {
                    type: type,
                    name: name,
                    email: email,
                    phone: phone,
                    service: service,
                    budget: budget,
                    timeline: timeline,
                    message: message || details,
                    details: details || message,
                    timestamp: new Date().toISOString()
                };

                try {
                    // Send payload using text/plain in no-cors mode to ensure Google Apps Script redirects without CORS block
                    await fetch(GOOGLE_SCRIPT_URL, {
                        method: "POST",
                        mode: "no-cors",
                        headers: {
                            "Content-Type": "text/plain;charset=utf-8"
                        },
                        body: JSON.stringify(payload)
                    });

                    // Record cooldown
                    localStorage.setItem(COOLDOWN_KEY, Date.now().toString());

                    // Required honest success text
                    setStatus("Message sent. If you don't hear back, message me on WhatsApp.", "success");
                    form.reset();

                } catch (err) {
                    setStatus("Unable to send message automatically. Please reach Stephen directly on WhatsApp at +256 701 951404 or wasswastephen24@gmail.com.", "error");
                } finally {
                    if (submitButton) submitButton.disabled = false;
                    if (submitText) submitText.textContent = originalText;
                }
            });
        });
    }

    /* ------------------------------------------------------------------------
       5. SUBTLE SCROLL ANIMATIONS (IntersectionObserver using `translate` & `opacity`)
       ------------------------------------------------------------------------ */
    function initAnimations() {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            return;
        }

        // Mark html that JS animations are active
        document.documentElement.classList.add("js-anim-ready");

        const animTargets = document.querySelectorAll(".anim-slide-left, .anim-slide-right, .anim-fade-up, .anim-stagger-parent");
        if (animTargets.length === 0) return;

        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    obs.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: "0px 0px -50px 0px"
        });

        animTargets.forEach((target) => observer.observe(target));

        // Typed headline on home hero if element exists
        const typedTarget = document.querySelector(".anim-typed-headline");
        if (typedTarget) {
            const text = typedTarget.getAttribute("data-text") || typedTarget.textContent;
            typedTarget.textContent = "";
            let idx = 0;
            const speed = 45; // ms per char

            function typeNext() {
                if (idx < text.length) {
                    typedTarget.textContent += text.charAt(idx);
                    idx++;
                    setTimeout(typeNext, speed);
                }
            }

            // Start typing after initial fade-in
            setTimeout(typeNext, 400);
        }
    }

    /* ------------------------------------------------------------------------
       6. DOM READY INITIALIZATION
       ------------------------------------------------------------------------ */
    function init() {
        initIcons();
        initMobileMenu();
        initBackToTop();
        initForms();
        initAnimations();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();
