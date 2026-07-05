/* ==========================================================
   FinTrack Pro
   app.js
   Application Entry Point
==========================================================*/

document.addEventListener("DOMContentLoaded", () => {

    console.log("🚀 FinTrack Pro Started");

    // ==============================
    // Dashboard
    // ==============================

    if (typeof Dashboard !== "undefined") {

        Dashboard.init();

    }

    // ==============================
    // Transactions
    // ==============================

    if (typeof Transactions !== "undefined") {

        if (typeof Transactions.start === "function") {

            Transactions.start();

        } else {

            Transactions.init();

            Transactions.load();

        }

    }

    // ==============================
    // Chart
    // ==============================

    if (typeof ChartManager !== "undefined") {

        ChartManager.init();

    }

    // ==============================
    // Settings
    // ==============================

    if (typeof Settings !== "undefined") {

        Settings.init();

    }
    if (typeof Navigation !== "undefined") {

        Navigation.init();

    }

    console.log("✅ FinTrack Pro Loaded Successfully");

});