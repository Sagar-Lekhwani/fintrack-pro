const Utils = {

    showToast(message, type = "success") {

        // Remove existing toast if present
        const existingToast = document.querySelector(".toast");

        if (existingToast) {

            existingToast.remove();

        }

        // Create Toast
        const toast = document.createElement("div");

        toast.className = `toast ${type}`;

        // Icon
        const icon = document.createElement("i");

        icon.className =
            type === "success"
                ? "fa-solid fa-circle-check"
                : "fa-solid fa-circle-xmark";

        // Message
        const text = document.createElement("span");

        text.textContent = message;

        toast.appendChild(icon);

        toast.appendChild(text);

        document.body.appendChild(toast);

        // Show Animation
        setTimeout(() => {

            toast.classList.add("show");

        }, 100);

        // Hide Animation
        setTimeout(() => {

            toast.classList.remove("show");

            setTimeout(() => {

                toast.remove();

            }, 300);

        }, 2500);

    }

};