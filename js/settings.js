const Settings = {

    init(){

        this.loadProfile();

        this.bindEvents();

    },

    bindEvents(){

        const form=document.getElementById("profileForm");

        if(form){

            form.addEventListener("submit",(e)=>{

                e.preventDefault();

                this.saveProfile();

            });

        }

        const logout=document.getElementById("logoutBtn");

        if(logout){

            logout.addEventListener("click",()=>{

                localStorage.removeItem("loggedIn");

                window.location.href="index.html";

            });

        }

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

}

};