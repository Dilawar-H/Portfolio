// form-engine.js
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("minimal-contact-form");
    const feedbackBox = document.getElementById("form-feedback");

    // Form inputs selective queries
    const nameInput = document.getElementById("user-name");
    const emailInput = document.getElementById("user-email");
    const messageInput = document.getElementById("user-message");

    // Regex match pattern for strict email checks
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function validateField(input, condition) {
        const group = input.parentElement;
        if (condition) {
            group.classList.remove("invalid-state");
            return true;
        } else {
            group.classList.add("invalid-state");
            return false;
        }
    }

    // Real-time input checking parameters (User experience enhancement)
    nameInput.addEventListener("input", () => validateField(nameInput, nameInput.value.trim().length > 0));
    emailInput.addEventListener("input", () => validateField(emailInput, emailRegex.test(emailInput.value.trim())));
    messageInput.addEventListener("input", () => validateField(messageInput, messageInput.value.trim().length >= 10));

    // Form submission processing interception
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        // Run validation batch checks
        const isNameValid = validateField(nameInput, nameInput.value.trim().length > 0);
        const isEmailValid = validateField(emailInput, emailRegex.test(emailInput.value.trim()));
        const isMessageValid = validateField(messageInput, messageInput.value.trim().length >= 10);

        if (!isNameValid || !isEmailValid || !isMessageValid) {
            return; // Halt logic chain if validation fails
        }

        // Trigger Button Loading State
        const submitBtn = form.querySelector(".btn-submit-form");
        const btnText = form.querySelector(".btn-text");
        const btnLoader = form.querySelector(".btn-loader");

        btnText.classList.add("hidden");
        btnLoader.classList.remove("hidden");
        submitBtn.disabled = true;
        feedbackBox.classList.add("hidden");

        try {
            // Simulated Server-Side Processing Architecture (e.g., Formspree, Web3Forms, or WordPress Admin AJAX)
            await new Promise((resolve) => setTimeout(resolve, 1500));

            // Success Execution
            feedbackBox.className = "feedback-msg success";
            feedbackBox.textContent = "Data payload transmitted securely! Thank you.";
            feedbackBox.classList.remove("hidden");
            form.reset();

        } catch (error) {
            // Failure Exception Trigger
            feedbackBox.className = "feedback-msg error";
            feedbackBox.textContent = "Transmission failed. Please check network protocols.";
            feedbackBox.classList.remove("hidden");
        } finally {
            // Revert state indicators completely
            btnText.classList.remove("hidden");
            btnLoader.classList.add("hidden");
            submitBtn.disabled = false;
        }
    });
});
