const Navigation={

    dashboardBtn:null,

    settingsBtn:null,

    dashboard:null,

    settings:null,

    init(){

        this.dashboardBtn=document.getElementById("dashboardNav");

        this.settingsBtn=document.getElementById("settingsNav");

        this.dashboard=document.getElementById("dashboardSection");

        this.settings=document.getElementById("settingsSection");

        this.events();

    },

    events(){

        this.dashboardBtn.addEventListener(

            "click",

            ()=>this.showDashboard()

        );

        this.settingsBtn.addEventListener(

            "click",

            ()=>this.showSettings()

        );

    },

    showDashboard(){

        this.dashboard.classList.remove("hidden");

        this.settings.classList.add("hidden");

        this.dashboardBtn.classList.add("active");

        this.settingsBtn.classList.remove("active");

    },

    showSettings(){

        this.settings.classList.remove("hidden");

        this.dashboard.classList.add("hidden");

        this.settingsBtn.classList.add("active");

        this.dashboardBtn.classList.remove("active");

    }

};