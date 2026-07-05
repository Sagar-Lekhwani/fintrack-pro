const Settings = {

    init(){

        Utils.loadProfile();

        this.bindEvents();

        this.loadTheme();

    },

    bindEvents(){

    const form=document.getElementById("profileForm");

    if(form){

        form.addEventListener("submit",(e)=>{

            e.preventDefault();

            this.saveProfile();

        });

    }

    const theme=document.getElementById("themeToggle");

    if(theme){

        theme.addEventListener("change",()=>{

            this.toggleTheme();

        });

    }

    const reset=document.getElementById("resetBtn");

    if(reset){

        reset.addEventListener("click",()=>{

            this.resetData();

        });

    }

},

loadTheme(){

    const dark=localStorage.getItem("theme")==="dark";

    document.body.classList.toggle("dark",dark);

    const toggle=document.getElementById("themeToggle");

    if(toggle){

        toggle.checked=dark;

    }

},

toggleTheme(){

    document.body.classList.toggle("dark");

    const dark=document.body.classList.contains("dark");

    localStorage.setItem(

        "theme",

        dark?"dark":"light"

    );

    Utils.showToast(

        dark

        ? "Dark mode enabled"

        : "Light mode enabled"

    );

},

    saveProfile() {

    const name = document.getElementById("fullName").value.trim();

    const currency = document.getElementById("currency").value;

    Storage.saveProfile({
        name,
        currency
    });

    // Update navbar name
    Utils.loadProfile();

    // Refresh Dashboard Cards
    if (typeof Dashboard !== "undefined") {
        Dashboard.update();
    }

    // Refresh Transaction Table
    if (typeof Transactions !== "undefined") {
        Transactions.refresh();
    }

    // Refresh Chart
    if (typeof ChartManager !== "undefined") {
        ChartManager.update();
    }

    Utils.showToast("Profile updated successfully");

},

resetData() {

    if (!confirm("Reset all financial data?")) {

        return;

    }

    Storage.resetApplication();

    // Update settings form
    document.getElementById("currency").value = "USD";

    const themeToggle = document.getElementById("themeToggle");

    if (themeToggle) {

        themeToggle.checked = false;

    }

    document.body.classList.remove("dark");

    // Refresh UI
    Dashboard.refresh();

    Transactions.refresh();

    if (typeof ChartManager !== "undefined") {

        ChartManager.update();

    }

    Utils.loadProfileName();

    Utils.showToast("All financial data has been reset.");

}



};