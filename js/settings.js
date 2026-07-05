const Settings = {

    init(){

        this.loadProfile();

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

    loadProfile(){

        const profile=Storage.getProfile();

        const profileName=document.getElementById("profileName");

        if(profileName){

            profileName.textContent=profile.name;

        }

        const fullName=document.getElementById("fullName");

        if(fullName){

            fullName.value=profile.name;

        }

        const currency=document.getElementById("currency");

        if(currency){

            currency.value=profile.currency;

        }

    },

    saveProfile() {

    const name = document.getElementById("fullName").value.trim();

    const currency = document.getElementById("currency").value;

    Storage.saveProfile({
        name,
        currency
    });

    // Update navbar name
    this.loadProfile();

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

    if (!confirm("Reset all saved data?")) {

        return;

    }

    Storage.resetApplication();

    // Reload dashboard values
    Dashboard.refresh();

    // Reload table
    Transactions.refresh();

    // Reload chart
    if (typeof ChartManager !== "undefined") {

        ChartManager.update();

    }

    // Reset profile inputs
    document.getElementById("fullName").value = "Guest";

    document.getElementById("currency").value = "USD";

    // Remove dark mode
    document.body.classList.remove("dark");

    const toggle = document.getElementById("themeToggle");

    if (toggle) {

        toggle.checked = false;

    }

    Utils.showToast("All data reset successfully");

}



};